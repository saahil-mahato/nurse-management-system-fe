import { useState } from 'react';

import PropTypes, { InferProps } from 'prop-types';

import { Button, Form, Input, notification } from 'antd';

import { useNavigate } from 'react-router-dom';

import '../styles/SigninForm.css';

import { signinUser } from '../services/AuthenticationService';

import openNotification from '../utils/Notifications';

function SigninForm({
  openSignupDialog,
}: InferProps<typeof SigninForm.propTypes>) {
  const [signinForm] = Form.useForm();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [isUserVerifying, setIsUserVerifying] = useState<boolean>(false);

  /**
   * Function to signin a user.
   */
  const submitSignin = () => {
    setIsUserVerifying(true);
    signinForm
      .validateFields()
      .then(async values => {
        try {
          await signinUser(values);
          navigate('/home/nurses');
        } catch (error: any) {
          openNotification(
            api,
            'error',
            'Sign in failed',
            error?.response?.data?.message || 'An error occurred',
            'bottomLeft',
          );
        }
      })
      .catch(() => {
        openNotification(
          api,
          'error',
          'Sign in failed',
          'Please fill up all required fields',
          'bottomLeft',
        );
      })
      .finally(() => {
        setIsUserVerifying(false);
      });
  };

  return (
    <>
      {contextHolder}
      <Form
        className="signin-form"
        name="signin"
        form={signinForm}
        labelCol={{ span: 8 }}
        autoComplete="off"
      >
        <h1 className="form-title">Signin</h1>

        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: 'Please enter your username' },
            { whitespace: true, message: 'Please enter your username' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please enter your password' },
            { whitespace: true, message: 'Please enter your username' },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button
            className="submit-button"
            type="primary"
            htmlType="submit"
            onClick={submitSignin}
            loading={isUserVerifying}
          >
            Signin
          </Button>

          <Button type="default" onClick={openSignupDialog}>
            Signup
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

SigninForm.propTypes = {
  openSignupDialog: PropTypes.func.isRequired,
};

export default SigninForm;
