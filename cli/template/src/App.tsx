import React, { useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import router from '@/router';
import { useThemeStore } from '@/store/themeStore';

const App: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const { i18n } = useTranslation();

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#141414'; // AntD Dark default
    } else {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#f0f2f5';
    }
  }, [isDarkMode]);

  // 根据 i18n 语言切换 Ant Design locale
  const antdLocale = i18n.language === 'en-US' ? enUS : zhCN;

  return (
    <ConfigProvider
      locale={antdLocale}
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1677ff',
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
