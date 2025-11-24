import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';

const { Dragger } = Upload;

interface UploadFileProps {
  maxSize?: number; // MB
  accept?: string;
  maxCount?: number;
  listType?: 'text' | 'picture' | 'picture-card' | 'picture-circle';
  onChange?: (fileList: UploadFile[]) => void;
}

const UploadFileComponent: React.FC<UploadFileProps> = ({
  maxSize = 5,
  accept = 'image/*',
  maxCount = 1,
  listType = 'picture-card',
  onChange,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isLtMaxSize = file.size / 1024 / 1024 < maxSize;
    if (!isLtMaxSize) {
      message.error(`文件大小不能超过 ${maxSize}MB!`);
      return Upload.LIST_IGNORE;
    }
    return false; // 阻止自动上传
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    onChange?.(newFileList);
  };

  const customRequest: UploadProps['customRequest'] = ({ onSuccess }) => {
    // 模拟上传过程
    setTimeout(() => {
      onSuccess?.('ok');
      message.success('上传成功');
    }, 1000);
  };

  return (
    <Dragger
      name="file"
      multiple={maxCount > 1}
      fileList={fileList}
      onChange={handleChange}
      beforeUpload={beforeUpload}
      customRequest={customRequest}
      accept={accept}
      maxCount={maxCount}
      listType={listType}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
      <p className="ant-upload-hint">支持单个或批量上传。文件大小不超过 {maxSize}MB</p>
    </Dragger>
  );
};

export default UploadFileComponent;
