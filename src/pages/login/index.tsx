import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
import styles from './index.module.scss';
import clsx from 'clsx';

const REMEMBERED_USERNAME_KEY = 'remembered_username';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setToken, setUserInfo, setPermissions } = useUserStore();
  const [form] = Form.useForm();

  interface LoginValues {
    username: string;
    password?: string;
    remember?: boolean;
  }

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

  const onFinish = async (values: LoginValues) => {
    console.log('Received values of form: ', values);

    // 处理"记住我"逻辑
    if (values.remember) {
      localStorage.setItem(REMEMBERED_USERNAME_KEY, values.username);
    } else {
      localStorage.removeItem(REMEMBERED_USERNAME_KEY);
    }

    // 模拟登录请求
    setTimeout(() => {
      setToken('mock-access-token', 'mock-refresh-token');
      setUserInfo({ id: '1', username: values.username, role: 'admin' });
      setPermissions(['user:list', 'user:edit']);
      message.success('登录成功');
      navigate('/');
    }, 1000);
  };

  return (
    <div
      className={clsx(
        'flex items-center justify-center min-h-screen bg-gray-100',
        styles.loginContainer,
      )}
    >
      <div className={clsx('w-full max-w-md p-8 rounded-xl', styles.glassCard)}>
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">React Admin</h1>
          <p className="text-gray-500 mt-2">企业级后台管理系统模板</p>
        </div>

        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名: admin"
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码: 123456"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <a className="float-right text-blue-500 hover:text-blue-700" href="">
              忘记密码
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 hover:bg-blue-500"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
