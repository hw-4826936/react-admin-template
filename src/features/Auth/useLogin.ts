import { useEffect } from 'react';
import { Form, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
import { login } from './api';
import type { LoginValues } from './types';

const REMEMBERED_USERNAME_KEY = 'remembered_username';

export const useLogin = () => {
  const navigate = useNavigate();
  const { setToken, setUserInfo, setPermissions } = useUserStore();
  const [form] = Form.useForm();

  // 组件加载时，读取保存的用户名
  useEffect(() => {
    const rememberedUsername = localStorage.getItem(REMEMBERED_USERNAME_KEY);
    if (rememberedUsername) {
      form.setFieldsValue({
        username: rememberedUsername,
        remember: true,
      });
    }
  }, [form]);

  const handleLogin = async (values: LoginValues) => {
    console.log('Received values of form: ', values);

    // 处理"记住我"逻辑
    if (values.remember) {
      localStorage.setItem(REMEMBERED_USERNAME_KEY, values.username);
    } else {
      localStorage.removeItem(REMEMBERED_USERNAME_KEY);
    }

    try {
      const data = await login(values);
      setToken(data.token, data.refreshToken);
      setUserInfo(data.user);
      setPermissions(data.permissions);
      message.success('登录成功');
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      // message.error('登录失败'); // api.ts or interceptor might handle this
    }
  };

  return {
    form,
    handleLogin,
  };
};
