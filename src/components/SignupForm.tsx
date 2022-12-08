import PropTypes, { InferProps } from 'prop-types';

import hash from 'object-hash';

import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  notification,
} from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';

import { UserData } from '../constants/Interfaces';

import { NotificationType } from '../constants/Types';

import signupNewUser from '../services/SignupService';

function SignupForm({
  isSignupFormOpen,
  closeSignupDialog,
}: InferProps<typeof SignupForm.propTypes>) {
  const [signupForm] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const cancelSignup = () => {
    signupForm.resetFields();
    closeSignupDialog();
  };

  const openNotification = (
    type: NotificationType,
    message: string,
    description: string,
    placement: NotificationPlacement,
  ) => {
    api[type]({ message, description, placement });
  };

  const submitSignup = () => {
    signupForm
      .validateFields()
      .then(async values => {
        const { username, password, reenterPassword, ...rest } = values;
        const userData: UserData = {
          userDetails: rest,
          username,
          passwordHash: hash(password),
        };
        await signupNewUser(userData);
        openNotification(
          'success',
          'Sign up success',
          'User has been successfully signed up',
          'bottomLeft',
        );
        closeSignupDialog();
      })
      .catch(() => {
        openNotification(
          'error',
          'Sign up failed',
          'An error occured',
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
          <Button key="submit" type="primary" onClick={submitSignup}>
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
            rules={[{ required: true, message: 'Please enter your last name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: 'Please enter your age' }]}
          >
            <InputNumber min={18} max={100} />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'Please enter your gender' }]}
          >
            <Select>
              <Select.Option value="male">male</Select.Option>
              <Select.Option value="female">female</Select.Option>
              <Select.Option value="other">other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please enter your address' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contact number"
            name="contactNumber"
            rules={[
              { required: true, message: 'Please enter your contact number' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Designation"
            name="designation"
            rules={[
              { required: true, message: 'Please enter your designation' },
            ]}
          >
            <Input />
          </Form.Item>

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
            label="Re-enter password"
            name="reenterPassword"
            rules={[
              { required: true, message: 'Please re-enter your password' },
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
