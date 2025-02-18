import React from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { apiService } from '../../api/apiService';

const { Dragger } = Upload;

const FileUpload = () => {
  const uploadProps = {
    name: 'file',
    multiple: true,
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        await apiService.uploadFile(file);
        message.success(`${file.name} uploaded successfully`);
        onSuccess();
      } catch (error) {
        message.error(`${file.name} upload failed`);
        onError();
      }
    },
  };

  return (
    <Dragger {...uploadProps}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag files to upload</p>
    </Dragger>
  );
};

export default FileUpload;  