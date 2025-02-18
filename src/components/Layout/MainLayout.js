import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';  
import { Layout, Menu, Button, Modal } from 'antd';
import {
  HomeOutlined,
  FileOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
const { Sider, Content } = Layout;

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const showLogoutConfirmation = () => {
    setShowLogoutModal(true);
  };

  const handleSignOut = () => {
    setShowLogoutModal(false);
    logout();
    navigate('/login');
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="logo" style={{ padding: 16, color: 'white' }}>
          Home-Server
        </div>
        <div style={{ flex: 1 }}>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<FileOutlined />}>
              <Link to="/files">Files</Link>
            </Menu.Item>
            <Menu.SubMenu key="library" title="Library" icon={<PictureOutlined />}>
              <Menu.Item key="3" icon={<PictureOutlined />}>
                <Link to="/photos">Photos</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<VideoCameraOutlined />}>
                <Link to="/videos">Videos</Link>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </div>
        <div style={{ padding: '16px' }}>
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={showLogoutConfirmation}
            style={{ width: '100%' }}
          >
            Sign Out
          </Button>
        </div>
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          {children}
        </Content>
      </Layout>

      {/* Logout Confirmation Modal */}
      <Modal
        title="Confirm Sign Out"
        open={showLogoutModal}
        onOk={handleSignOut}
        onCancel={handleCancelLogout}
        okText="Sign Out"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to sign out?</p>
      </Modal>
    </Layout>
  );
};

export default MainLayout;