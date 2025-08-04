import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Typography, Row, Col, Image } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { history } from 'umi';

const { Title } = Typography;

const RegisterPage: React.FC = () => {
  const [captchaSrc, setCaptchaSrc] = useState<string>('/path/to/captcha.png');

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
    // Handle registration logic here
  };

  const onCheckboxChange = (e: any) => {
    if (!e.target.checked) {
      alert('Please agree to the privacy policy.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row justify="center">
        <Col span={12}>
          <Title level={3}>Register</Title>
          <Form
            name="register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="E-mail" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Confirm password" />
            </Form.Item>

            <Form.Item name="captcha" rules={[{ required: true, message: 'Please enter captcha!' }]}>
              <Row gutter={8}>
                <Col span={16}>
                  <Input placeholder="Captcha" />
                </Col>
                <Col span={8}>
                  <Image src={captchaSrc} width="100%" onClick={() => setCaptchaSrc('/path/to/new-captcha.png')} />
                </Col>
              </Row>
            </Form.Item>

            <Form.Item>
              <Checkbox onChange={onCheckboxChange}>
                I agree to Fecmall{' '}
                <a href="/privacy-policy">Privacy Policy</a>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>
            </Form.Item>
          </Form>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            Or Join With
            <Row gutter={16} style={{ marginTop: '10px' }}>
              <Col>
                <Button icon={<img src="/path/to/facebook-icon.png" alt="Facebook" />} block>
                  Facebook
                </Button>
              </Col>
              <Col>
                <Button icon={<img src="/path/to/line-icon.png" alt="Line" />} block>
                  Line
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterPage;