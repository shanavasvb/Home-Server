import React, { useState, useEffect } from 'react';
import { Space, message, Row, Col, Card, Typography, Empty } from 'antd';
import FileList from '../components/FileManager/FileList';
import FileUpload from '../components/FileManager/FileUpload';
import { apiService } from '../api/apiService';

const { Title } = Typography;

const FilesPage = ({ type }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await apiService.getFiles();
      
      // Filter files based on the page type
      if (type === 'photos') {
        const photoFiles = response.data.filter(file => 
          file.type === 'image' || 
          file.type === 'jpg' || 
          file.type === 'jpeg' || 
          file.type === 'png' || 
          file.type === 'gif'
        );
        setFiles(photoFiles);
      } else if (type === 'videos') {
        const videoFiles = response.data.filter(file => 
          file.type === 'video' || 
          file.type === 'mp4' || 
          file.type === 'avi' || 
          file.type === 'mov' || 
          file.type === 'mkv'
        );
        setFiles(videoFiles);
      } else {
        // For the regular files page, show all files
        setFiles(response.data);
      }
    } catch (error) {
      message.error('Failed to fetch files');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [type]); // Re-fetch when the type changes

  const handleDelete = async (fileId) => {
    try {
      // Implement delete API call
      message.success('File deleted successfully');
      fetchFiles();
    } catch (error) {
      message.error('Failed to delete file');
    }
  };

  // Render different content based on the page type
  const renderPageContent = () => {
    if (type === 'photos') {
      return (
        <>
          <Title level={2}>Photos</Title>
          {files.length === 0 ? (
            <Empty description="No photos found" />
          ) : (
            <Row gutter={[16, 16]}>
              {files.map(file => (
                <Col xs={24} sm={12} md={8} lg={6} key={file.id}>
                  <Card
                    hoverable
                    cover={
                      <div style={{ 
                        height: 200, 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        overflow: 'hidden',
                        backgroundColor: '#f0f0f0'
                      }}>
                        <img 
                          alt={file.name} 
                          src={file.url || `/api/file/${file.id}`} 
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        />
                      </div>
                    }
                  >
                    <Card.Meta 
                      title={file.name} 
                      description={`Size: ${file.size}`} 
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </>
      );
    } else if (type === 'videos') {
      return (
        <>
          <Title level={2}>Videos</Title>
          {files.length === 0 ? (
            <Empty description="No videos found" />
          ) : (
            <Row gutter={[16, 16]}>
              {files.map(file => (
                <Col xs={24} sm={12} md={8} lg={6} key={file.id}>
                  <Card
                    hoverable
                    cover={
                      <div style={{ 
                        height: 200, 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        overflow: 'hidden',
                        backgroundColor: '#f0f0f0',
                        position: 'relative'
                      }}>
                        <video 
                          controls
                          style={{ maxWidth: '100%', maxHeight: '100%' }}
                        >
                          <source src={file.url || `/api/file/${file.id}`} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    }
                  >
                    <Card.Meta 
                      title={file.name} 
                      description={`Size: ${file.size}`} 
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </>
      );
    } else {
      // Default files view
      return (
        <>
          <Title level={2}>Files</Title>
          <FileUpload />
          <FileList files={files} onDelete={handleDelete} />
        </>
      );
    }
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {renderPageContent()}
    </Space>
  );
};

export default FilesPage;