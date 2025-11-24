import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { useLogin } from './useLogin';
import styles from './Login.module.scss';

export const Login: React.FC = () => {
  const { form, handleLogin } = useLogin();

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
          onFinish={handleLogin}
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

            <Button
              type="link"
              className="float-right text-blue-500 hover:text-blue-700 p-0 h-auto"
              onClick={() => {
                /* TODO: handle forgot password */
              }}
            >
              忘记密码
            </Button>
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
