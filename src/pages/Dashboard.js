import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { FileOutlined, PictureOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { apiService } from '../api/apiService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalFiles: 0,
    totalPhotos: 0,
    totalVideos: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const files = await apiService.getFiles();
        setStats({
          totalFiles: files.length,
          totalPhotos: files.filter(f => f.type.includes('image')).length,
          totalVideos: files.filter(f => f.type.includes('video')).length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Files"
              value={stats.totalFiles}
              prefix={<FileOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Photos"
              value={stats.totalPhotos}
              prefix={<PictureOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Videos"
              value={stats.totalVideos}
              prefix={<VideoCameraOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;  