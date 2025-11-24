import React from 'react';
import { Card, Space, Typography } from 'antd';
import UploadFile from '@/components/ui/UploadFile';
import { useUploadDemo } from './useUploadDemo';

const { Title, Paragraph } = Typography;

/**
 * UploadDemo Feature Component
 * 演示 UploadFile 组件的使用
 */
export const UploadDemo: React.FC = () => {
  const { handleImageChange, handleDocumentChange } = useUploadDemo();

  return (
    <div className="p-6">
      <Title level={2}>Upload 组件演示</Title>
      <Paragraph>这是一个通用的上传组件，支持文件类型校验、大小限制、图片预览等功能。</Paragraph>

      <Space orientation="vertical" size="large" className="w-full">
        <Card title="图片上传 (单张)">
          <UploadFile
            accept="image/*"
            maxSize={5}
            maxCount={1}
            listType="picture-card"
            onChange={handleImageChange}
          />
        </Card>

        <Card title="图片上传 (多张)">
          <UploadFile
            accept="image/*"
            maxSize={10}
            maxCount={5}
            listType="picture-card"
            onChange={handleImageChange}
          />
        </Card>

        <Card title="文档上传">
          <UploadFile
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            maxSize={20}
            maxCount={3}
            listType="text"
            onChange={handleDocumentChange}
          />
        </Card>
      </Space>
    </div>
  );
};
