import React from 'react';
import { Card, Space, Typography } from 'antd';
import UploadFile from '@/components/UploadFile';
import type { UploadFile as UploadFileType } from 'antd';

const { Title, Paragraph } = Typography;

const UploadDemo: React.FC = () => {
  const handleImageChange = (fileList: UploadFileType[]) => {
    console.log('图片上传:', fileList);
  };

  const handleDocumentChange = (fileList: UploadFileType[]) => {
    console.log('文档上传:', fileList);
  };

  return (
    <div className="p-6">
      <Title level={2}>Upload 组件演示</Title>
      <Paragraph>这是一个通用的上传组件，支持文件类型校验、大小限制、图片预览等功能。</Paragraph>

      <Space direction="vertical" size="large" className="w-full">
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

export default UploadDemo;
