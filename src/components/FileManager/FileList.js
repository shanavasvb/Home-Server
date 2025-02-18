import React from 'react';
import { Table, Space, Button, message } from 'antd';
import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons';

const FileList = ({ files, onDelete }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<DownloadOutlined />}>Download</Button>
          <Button 
            icon={<DeleteOutlined />} 
            danger
            onClick={() => onDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={files} />;
};

export default FileList;  