import React, { useState } from 'react';
import { Layout, Menu, Button, theme, Dropdown, Avatar } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
  SunOutlined,
  MoonOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@/store/userStore';
import { useThemeStore } from '@/store/themeStore';

const { Header, Sider, Content } = Layout;

const BasicLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { userInfo, logout } = useUserStore();
  const { isDarkMode, toggleTheme } = useThemeStore();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenu = {
    items: [
      {
        key: '1',
        label: t('user.profile'),
        icon: <UserOutlined />,
      },
      {
        key: '2',
        label: t('user.logout'),
        icon: <LogoutOutlined />,
        onClick: handleLogout,
      },
    ],
  };

  const languageMenu = {
    items: [
      {
        key: 'zh-CN',
        label: '简体中文',
        onClick: () => changeLanguage('zh-CN'),
      },
      {
        key: 'en-US',
        label: 'English',
        onClick: () => changeLanguage('en-US'),
      },
    ],
  };

  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed} className="shadow-lg z-10">
        <div className="h-16 flex items-center justify-center text-white text-xl font-bold truncate px-4">
          {collapsed ? 'RA' : 'React Admin'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: t('menu.dashboard'),
              onClick: () => navigate('/dashboard'),
            },
            {
              key: '2',
              icon: <UploadOutlined />,
              label: t('menu.uploadDemo'),
              onClick: () => navigate('/upload-demo'),
            },
            {
              key: '3',
              icon: <VideoCameraOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="flex justify-between items-center px-4 shadow-sm"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className="mr-4 flex items-center gap-4">
            <Button
              type="text"
              icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
              onClick={toggleTheme}
              className="flex items-center justify-center"
            />
            <Dropdown menu={languageMenu}>
              <Button
                type="text"
                icon={<GlobalOutlined />}
                className="flex items-center justify-center"
              />
            </Dropdown>
            <Dropdown menu={userMenu}>
              <div
                className="flex items-center cursor-pointer px-3 py-1 rounded transition-colors text-gray-900 dark:text-gray-100"
                style={{
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    document.documentElement.classList.contains('dark')
                      ? 'rgba(55, 65, 81, 0.5)'
                      : 'rgba(243, 244, 246, 1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Avatar icon={<UserOutlined />} src={userInfo?.avatar} className="mr-2" />
                <span>{userInfo?.username || 'Admin'}</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflowY: 'auto',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
