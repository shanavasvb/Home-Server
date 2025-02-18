import React, { useState, useEffect } from 'react';
import { Space, message } from 'antd';
import FileList from '../components/FileManager/FileList';
import FileUpload from '../components/FileManager/FileUpload';
import { apiService } from '../api/apiService';

const FilesPage = () => {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const response = await apiService.getFiles();
      setFiles(response.data);
    } catch (error) {
      message.error('Failed to fetch files');
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleDelete = async (fileId) => {
    try {
      // Implement delete API call
      message.success('File deleted successfully');
      fetchFiles();
    } catch (error) {
      message.error('Failed to delete file');
    }
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <h1>Files</h1>
      <FileUpload />
      <FileList files={files} onDelete={handleDelete} />
    </Space>
  );
};

export default FilesPage;  