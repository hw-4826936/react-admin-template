import axios, { AxiosError } from 'axios';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { message } from 'antd';

// 定义返回数据的接口 (根据后端实际情况调整)
interface Result<T = unknown> {
  code: number;
  message: string;
  data: T;
}

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

class Request {
  private instance: AxiosInstance;
  private isRefreshing = false;
  private requestsQueue: ((token: string) => void)[] = [];

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);

    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<Result>) => {
        const { code, message: msg } = response.data;
        // 假设 200 为成功，根据实际后端约定修改
        if (code === 200) {
          return response;
        } else {
          message.error(msg || '请求失败');
          return Promise.reject(new Error(msg || '请求失败'));
        }
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // 处理 401 未授权 (Token 过期)
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // 如果正在刷新，将请求加入队列
            return new Promise((resolve) => {
              this.requestsQueue.push((token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(this.instance(originalRequest));
              });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            // 发起刷新 Token 的请求
            const refreshToken = localStorage.getItem('refreshToken');
            // 这里假设刷新接口是 /auth/refresh
            const { data } = await axios.post<{ data: { token: string } }>(
              `${BASE_URL}/auth/refresh`,
              { refreshToken },
            );

            const newToken = data.data.token;
            localStorage.setItem('token', newToken);

            // 执行队列中的请求
            this.requestsQueue.forEach((cb) => cb(newToken));
            this.requestsQueue = [];

            // 重试当前请求
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return this.instance(originalRequest);
          } catch (refreshError) {
            // 刷新失败，登出
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            message.error('登录已过期，请重新登录');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        message.error(error.message || '网络异常');
        return Promise.reject(error);
      },
    );
  }

  // 常用方法封装
  async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<Result<T>>(url, config);
    return response.data.data;
  }

  async post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<Result<T>>(url, data, config);
    return response.data.data;
  }

  async put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.put<Result<T>>(url, data, config);
    return response.data.data;
  }

  async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<Result<T>>(url, config);
    return response.data.data;
  }
}

export default new Request({
  baseURL: BASE_URL,
  timeout: 10000,
});
