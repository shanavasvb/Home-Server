import React, { useState } from 'react';
import { Form, Input, Button, Card, Tabs, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      await login(values);
      message.success('Login successful!');
      navigate('/');
    } catch (error) {
      message.error('Login failed! Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (values) => {
    setLoading(true);
    try {
      // Implement signup API call here
      message.success('Signup successful! Please login.');
      setActiveTab('login');
    } catch (error) {
      message.error('Signup failed! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loginForm = (
    <Form name="login" onFinish={handleLogin}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input 
          prefix={<UserOutlined />} 
          placeholder="Username" 
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Password"
          size="large"
        />
      </Form.Item>
      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          style={{ width: '100%' }} 
          size="large"
          loading={loading}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );

  const signupForm = (
    <Form name="signup" onFinish={handleSignup}>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Please enter a valid email!' }
        ]}
      >
        <Input 
          prefix={<MailOutlined />} 
          placeholder="Email" 
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="username"
        rules={[
          { required: true, message: 'Please input your username!' },
          { min: 3, message: 'Username must be at least 3 characters!' }
        ]}
      >
        <Input 
          prefix={<UserOutlined />} 
          placeholder="Username" 
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'Please input your password!' },
          { min: 6, message: 'Password must be at least 6 characters!' }
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Password"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Passwords do not match!'));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Confirm Password"
          size="large"
        />
      </Form.Item>
      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          style={{ width: '100%' }} 
          size="large"
          loading={loading}
        >
          Sign up
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f0f2f5'
    }}>
      <Card style={{ width: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2>Home-Server</h2>
        </div>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          centered
          items={[
            {
              key: 'login',
              label: 'Login',
              children: loginForm,
            },
            {
              key: 'signup',
              label: 'Sign Up',
              children: signupForm,
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default Login;