import '../styles/LoginForm.css';

import PropTypes, { InferProps } from 'prop-types';

import { Button, Checkbox, Form, Input } from 'antd';

function LoginForm({
  openSignupDialog,
}: InferProps<typeof LoginForm.propTypes>) {
  return (
    <Form
      className="login-form"
      name="login"
      labelCol={{ span: 8 }}
      initialValues={{ remember: false }}
      autoComplete="off"
    >
      <h1 className="form-title">Login</h1>

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
        wrapperCol={{ offset: 8 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8 }}>
        <Button className="submit-button" type="primary" htmlType="submit">
          Login
        </Button>

        <Button type="default" onClick={openSignupDialog}>
          Signup
        </Button>
      </Form.Item>
    </Form>
  );
}

LoginForm.propTypes = {
  openSignupDialog: PropTypes.func.isRequired,
};

export default LoginForm;
