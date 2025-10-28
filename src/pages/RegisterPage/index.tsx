import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Typography, Row, Col, message } from 'antd';
// import { Link } from '@umijs/max';

const { Title } = Typography;

const RegisterPage: React.FC = () => {
  const [form] = Form.useForm();
  const [captcha, setCaptcha] = useState<string>('');

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
    // Handle registration logic here
    message.success('Registration successful!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row justify="center">
        <Col span={12}>
          <Title level={4}>Register</Title>
          <Form
            form={form}
            name="register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input placeholder="E-mail" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Password" />
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
              <Input.Password placeholder="Confirm password" />
            </Form.Item>

            <Form.Item
              name="captcha"
              rules={[{ required: true, message: 'Please input the captcha!' }]}
            >
              <Row gutter={8}>
                <Col span={16}>
                  <Input placeholder="Captcha" />
                </Col>
                <Col span={8}>
                  <img src={`https://placehold.co/${captcha}`} alt="captcha" onClick={() => setCaptcha(Math.random().toString(36).substring(7))} style={{ cursor: 'pointer', width: '100%' }} />
                </Col>
              </Row>
            </Form.Item>

            <Form.Item>
              <Checkbox> I agree to Fecmall Privacy Policy</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>
            </Form.Item>
          </Form>
          {/*<div style={{ textAlign: 'center', marginTop: '20px' }}>*/}
          {/*  Or Join With*/}
          {/*  <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>*/}
          {/*    <Link href="#">*/}
          {/*      <img src="https://placehold.co/40x40?text=fb" alt="Facebook" style={{ width: '40px', height: '40px' }} />*/}
          {/*    </Link>*/}
          {/*    <Link href="#">*/}
          {/*      <img src="https://placehold.co/40x40?text=wechat" alt="WeChat" style={{ width: '40px', height: '40px' }} />*/}
          {/*    </Link>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </Col>
      </Row>
    </div>
  );
};

export default RegisterPage;
