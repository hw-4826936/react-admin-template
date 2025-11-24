import type { LoginValues, LoginResponse } from './types';

// 模拟登录请求
export const login = async (values: LoginValues): Promise<LoginResponse> => {
  console.log('Login API called with:', values);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        user: { id: '1', username: values.username, role: 'admin' },
        permissions: ['user:list', 'user:edit'],
      });
    }, 1000);
  });
};
