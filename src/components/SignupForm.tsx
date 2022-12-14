import { useState } from 'react';

import PropTypes, { InferProps } from 'prop-types';

import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  notification,
} from 'antd';

import { UserData } from '../constants/Interfaces';

import { signupNewUser } from '../services/AuthenticationService';

import deepTrim from '../utils/ObjectUtils';
import openNotification from '../utils/Notifications';

function SignupForm({
  isSignupFormOpen,
  closeSignupDialog,
}: InferProps<typeof SignupForm.propTypes>) {
  const [signupForm] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [isUserAdding, setIsUserAdding] = useState<boolean>(false);

  /**
   * Function to cancel signup process.
   */
  const cancelSignup = () => {
    closeSignupDialog();
    signupForm.resetFields();
  };

  /**
   * Function to check if the age is within the valid range.
   *
   * @returns {Promise<any>}
   */
  const ValidateAge = (): Promise<any> => {
    const inputAge: number = signupForm.getFieldValue('age');

    if (inputAge >= 18 && inputAge <= 60) {
      return Promise.resolve();
    }

    return Promise.reject(new Error('Age must be between 18 and 60 inclusive'));
  };

  /**
   * Function to check if the password and re-entered passwords match.
   *
   * @returns {Promise<any>}
   */
  const validatePassword = (): Promise<any> => {
    if (
      signupForm.getFieldValue('password') ===
      signupForm.getFieldValue('reenterPassword')
    ) {
      return Promise.resolve();
    }

    return Promise.reject(new Error('The passwords must match'));
  };

  /**
   * Function to submit the signup form.
   */
  const submitSignup = () => {
    signupForm
      .validateFields()
      .then(async values => {
        setIsUserAdding(true);

        const { username, password, reenterPassword, ...rest } = values;
        const userData: UserData = {
          userDetails: deepTrim(rest),
          username: deepTrim(username),
          password,
        };

        try {
          await signupNewUser(userData);
        } catch (error: any) {
          openNotification(
            api,
            'error',
            'Sign up failed',
            error?.response?.data?.message || 'An error occurred',
            'bottomLeft',
          );

          return;
        } finally {
          setIsUserAdding(false);
        }

        openNotification(
          api,
          'success',
          'Sign up success',
          'User has been successfully signed up',
          'bottomLeft',
        );
        closeSignupDialog();
        signupForm.resetFields();
      })
      .catch(() => {
        openNotification(
          api,
          'error',
          'Sign up failed',
          'Please fill up all the required fields',
          'bottomLeft',
        );
      });
  };

  return (
    <>
      {contextHolder}
      <Modal
        className="signup-dialog"
        open={isSignupFormOpen}
        onCancel={cancelSignup}
        title="Signup"
        footer={[
          <Button key="back" onClick={cancelSignup}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={submitSignup}
            loading={isUserAdding}
          >
            Signup
          </Button>,
        ]}
        width={800}
      >
        <Form
          className="signup-form"
          name="signup"
          form={signupForm}
          autoComplete="off"
          labelCol={{ span: 5 }}
        >
          <Form.Item
            label="First name"
            name="firstName"
            rules={[
              { required: true, message: 'Please enter your first name' },
              { whitespace: true, message: 'Please enter your first name' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Middle name" name="middleName">
            <Input />
          </Form.Item>

          <Form.Item
            label="Last name"
            name="lastName"
            rules={[
              { required: true, message: 'Please enter your last name' },
              { whitespace: true, message: 'Please enter your last name' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[
              { required: true, message: 'Please enter your age' },
              { type: 'number', message: 'Please enter a valid number' },
              { validator: ValidateAge },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'Please enter your gender' }]}
          >
            <Select>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              { required: true, message: 'Please enter your address' },
              { whitespace: true, message: 'Please enter your address' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
              { whitespace: true, message: 'Please enter your email' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contact number"
            name="contactNumber"
            rules={[
              { required: true, message: 'Please enter your contact number' },
              { whitespace: true, message: 'Please enter your contact number' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Designation"
            name="designation"
            rules={[
              { required: true, message: 'Please enter your designation' },
              { whitespace: true, message: 'Please enter your designation' },
            ]}
          >
            <Input />
          </Form.Item>

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
              { whitespace: true, message: 'Please enter your password' },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Re-enter password"
            name="reenterPassword"
            rules={[
              { required: true, message: 'Please re-enter your password' },
              { whitespace: true, message: 'Please re-enter your password' },
              { validator: validatePassword },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

SignupForm.propTypes = {
  isSignupFormOpen: PropTypes.bool.isRequired,
  closeSignupDialog: PropTypes.func.isRequired,
};

export default SignupForm;
