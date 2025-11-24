import type { UploadFile } from 'antd';

/**
 * UploadDemo 业务逻辑 Hook
 * 负责处理上传组件的回调逻辑
 */
export const useUploadDemo = () => {
  const handleImageChange = (fileList: UploadFile[]) => {
    console.log('图片上传:', fileList);
  };

  const handleDocumentChange = (fileList: UploadFile[]) => {
    console.log('文档上传:', fileList);
  };

  return {
    handleImageChange,
    handleDocumentChange,
  };
};
