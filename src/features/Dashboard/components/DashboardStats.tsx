import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

export const DashboardStats: React.FC = () => {
  return (
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
  );
};
