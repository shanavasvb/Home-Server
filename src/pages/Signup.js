// import React, { useState } from 'react';
// import { Form, Input, Button, Card, Typography, message } from 'antd';
// import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import axios from 'axios';

// const { Title } = Typography;
// const API_BASE_URL = 'http://13.202.211.89';

// const Signup = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       // Since we don't have a clear signup endpoint in the API docs,
//       // this is a placeholder that you'll need to adjust based on your API
//       await axios.post(`${API_BASE_URL}/api/v1/auth/register/`, {
//         username: values.username,
//         email: values.email,
//         password: values.password
//       });
      
//       message.success('Registration successful! Redirecting to login...');
      
//       // Redirect to login after successful signup
//       setTimeout(() => {
//         navigate('/login');
//       }, 1500);
//     } catch (error) {
//       console.error('Signup error:', error);
//       message.error(error.response?.data?.detail || 'Registration failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ 
//       display: 'flex', 
//       justifyContent: 'center', 
//       alignItems: 'center', 
//       height: '100vh',
//       background: '#f0f2f5'
//     }}>
//       <Card style={{ width: 400, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
//         <div style={{ textAlign: 'center', marginBottom: 24 }}>
//           <Title level={2}>Create Account</Title>
//         </div>
        
//         <Form
//           name="signup"
//           initialValues={{ remember: true }}
//           onFinish={onFinish}
//           layout="vertical"
//         >
//           <Form.Item
//             name="username"
//             rules={[{ required: true, message: 'Please input your username!' }]}
//           >
//             <Input prefix={<UserOutlined />} placeholder="Username" size="large" />
//           </Form.Item>
          
//           <Form.Item
//             name="email"
//             rules={[
//               { required: true, message: 'Please input your email!' },
//               { type: 'email', message: 'Please enter a valid email!' }
//             ]}
//           >
//             <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
//           </Form.Item>

//           <Form.Item
//             name="password"
//             rules={[
//               { required: true, message: 'Please input your password!' },
//               { min: 6, message: 'Password must be at least 6 characters!' }
//             ]}
//           >
//             <Input.Password 
//               prefix={<LockOutlined />} 
//               placeholder="Password" 
//               size="large" 
//             />
//           </Form.Item>

//           <Form.Item
//             name="confirmPassword"
//             dependencies={['password']}
//             rules={[
//               { required: true, message: 'Please confirm your password!' },
//               ({ getFieldValue }) => ({
//                 validator(_, value) {
//                   if (!value || getFieldValue('password') === value) {
//                     return Promise.resolve();
//                   }
//                   return Promise.reject(new Error('The two passwords do not match!'));
//                 },
//               }),
//             ]}
//           >
//             <Input.Password 
//               prefix={<LockOutlined />} 
//               placeholder="Confirm Password" 
//               size="large" 
//             />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" size="large" block loading={loading}>
//               Sign Up
//             </Button>
//           </Form.Item>
          
//           <div style={{ textAlign: 'center' }}>
//             Already have an account? <Link to="/login">Log in</Link>
//           </div>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default Signup;