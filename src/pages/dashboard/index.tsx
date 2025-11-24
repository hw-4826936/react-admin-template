import React from 'react';
import { Card, Col, Row, Statistic, Button, Flex } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import Permission from '@/components/Permission';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <Row gutter={16}>
        <Col span={12}>
          <Card variant="borderless">
            <Statistic
              title="Active"
              value={11.28}
              precision={2}
              className="[&_.ant-statistic-content-value]:text-green-600"
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card variant="borderless">
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              className="[&_.ant-statistic-content-value]:text-red-600"
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Card className="mt-6">
        <h2 className="text-xl font-bold mb-4">{t('dashboard.welcome')}</h2>
        <p>{t('dashboard.description')}</p>
      </Card>

      <Card className="mt-6" title={t('dashboard.permissionDemo')}>
        <Flex vertical gap="middle" className="w-full">
          <div>
            <h3 className="font-bold mb-2">{t('dashboard.currentPermissions')}</h3>
            <p className="text-gray-600 dark:text-gray-400">user:list, user:edit</p>
          </div>

          <Permission permission="user:edit">
            <Button type="primary">{t('dashboard.editUser')}</Button>
          </Permission>

          <Permission
            permission="user:delete"
            fallback={<Button disabled>{t('dashboard.deleteUserNoPermission')}</Button>}
          >
            <Button danger>{t('dashboard.deleteUser')}</Button>
          </Permission>

          <Permission permission={['admin:all', 'user:list']}>
            <Button>{t('dashboard.viewUserList')}</Button>
          </Permission>
        </Flex>
      </Card>
    </div>
  );
};

export default Dashboard;
