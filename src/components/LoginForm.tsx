import '../styles/LoginForm.css';

import { Button, Checkbox, Form, Input } from 'antd';

function LoginForm() {
  return (
    <Form
      className="login-form"
      name="login"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: false }}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please enter your username' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your password' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 6, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
