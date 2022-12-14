import { useState } from 'react';

import PropTypes, { InferProps } from 'prop-types';

import {
  Button,
  Form,
  Input,
  InputNumber,
  TimePicker,
  Modal,
  Select,
  Checkbox,
  notification,
} from 'antd';

import type { SelectProps } from 'antd';

import { addNewNurse } from '../services/NurseService';

import deepTrim from '../utils/ObjectUtils';
import { dateToTimestamp } from '../utils/DateTime';
import openNotification from '../utils/Notifications';

function NurseForm({
  isNurseFormOpen,
  closeNurseDialog,
  isEditMode,
}: InferProps<typeof NurseForm.propTypes>) {
  const [nurseForm] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [isNurseAdding, setIsNurseAdding] = useState<boolean>(false);

  const timeFormat = 'HH:mm';
  const days: SelectProps['options'] = [
    { label: 'Sunday', value: 'Sunday' },
    { label: 'Monday', value: 'Monday' },
    { label: 'Tuesday', value: 'Tuesday' },
    { label: 'Wednesday', value: 'Wednesday' },
    { label: 'Thursday', value: 'Thursday' },
    { label: 'Friday', value: 'Friday' },
    { label: 'Saturday', value: 'Saturday' },
  ];

  /**
   * Function to check if the age is within the valid range.
   *
   * @returns {Promise<any>}
   */
  const ValidateAge = (): Promise<any> => {
    const inputAge: number = nurseForm.getFieldValue('age');

    if (inputAge >= 18 && inputAge <= 60) {
      return Promise.resolve();
    }

    return Promise.reject(new Error('Age must be between 18 and 60 inclusive'));
  };

  /**
   * Function to cancel nurse form.
   */
  const cancelNurseForm = () => {
    closeNurseDialog();
    nurseForm.resetFields();
  };

  /**
   * Function to submit nurse form.
   */
  const submitNurseForm = () => {
    nurseForm
      .validateFields()
      .then(async values => {
        setIsNurseAdding(true);
        const nurseData = deepTrim({
          ...values,
          dutyStartTime: dateToTimestamp(values.dutyStartTime.toString()),
          dutyEndTime: dateToTimestamp(values.dutyEndTime.toString()),
        });

        try {
          await addNewNurse(nurseData);
        } catch (error: any) {
          openNotification(
            api,
            'error',
            'Error',
            error?.response?.data?.message || 'An error occurred',
            'bottomLeft',
          );

          return;
        } finally {
          setIsNurseAdding(false);
        }

        openNotification(
          api,
          'success',
          'Success',
          'Nurse has been successfully added',
          'bottomLeft',
        );
        closeNurseDialog();
        nurseForm.resetFields();
      })
      .catch(() => {
        openNotification(
          api,
          'error',
          'Error',
          'Please fill up all the required fields',
          'bottomLeft',
        );
      });
  };

  return (
    <>
      {contextHolder}
      <Modal
        className="nurseform-dialog"
        open={isNurseFormOpen}
        onCancel={cancelNurseForm}
        title={`${isEditMode ? 'Edit' : 'Add'} Nurse`}
        footer={[
          <Button key="back" onClick={cancelNurseForm}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={submitNurseForm}
            loading={isNurseAdding}
          >
            {isEditMode ? 'Edit' : 'Add'}
          </Button>,
        ]}
        width={800}
        style={{ top: 20 }}
      >
        <Form
          className="nurse-form"
          name="nurse"
          form={nurseForm}
          autoComplete="off"
          labelCol={{ span: 5 }}
          initialValues={{ isRoundingManager: false }}
        >
          <Form.Item
            label="First name"
            name="firstName"
            rules={[
              { required: true, message: 'Please enter the first name' },
              { whitespace: true, message: 'Please enter the first name' },
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
              { required: true, message: 'Please enter the last name' },
              { whitespace: true, message: 'Please enter the last name' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[
              { required: true, message: 'Please enter the age' },
              { type: 'number', message: 'Please enter a valid number' },
              { validator: ValidateAge },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'Please enter the gender' }]}
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
              { required: true, message: 'Please enter the address' },
              { whitespace: true, message: 'Please enter the address' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter the email' },
              { type: 'email', message: 'Please enter a valid email' },
              { whitespace: true, message: 'Please enter the email' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contact number"
            name="contactNumber"
            rules={[
              { required: true, message: 'Please enter the contact number' },
              { whitespace: true, message: 'Please enter the contact number' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Designation"
            name="designation"
            rules={[
              { required: true, message: 'Please enter the designation' },
              { whitespace: true, message: 'Please enter the designation' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Department"
            name="department"
            rules={[
              { required: true, message: 'Please enter the department' },
              { whitespace: true, message: 'Please enter the department' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Duty Start Time"
            name="dutyStartTime"
            rules={[
              { required: true, message: 'Please enter the duty start time' },
            ]}
          >
            <TimePicker style={{ width: '100%' }} format={timeFormat} />
          </Form.Item>

          <Form.Item
            label="Duty End Time"
            name="dutyEndTime"
            rules={[
              { required: true, message: 'Please enter the duty end time' },
            ]}
          >
            <TimePicker style={{ width: '100%' }} format={timeFormat} />
          </Form.Item>

          <Form.Item
            label="Working days"
            name="workingDays"
            rules={[
              { required: true, message: 'Please enter the working days' },
            ]}
          >
            <Select mode="multiple" style={{ width: '100%' }} options={days} />
          </Form.Item>

          <Form.Item
            name="isRoundingManager"
            valuePropName="checked"
            wrapperCol={{ offset: 5 }}
          >
            <Checkbox>Rounding Manager</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

NurseForm.propTypes = {
  isNurseFormOpen: PropTypes.bool.isRequired,
  closeNurseDialog: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
};

export default NurseForm;
