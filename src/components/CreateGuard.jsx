import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { createGuard } from '../store/slices/authSlice';

const CreateGuard = () => {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(createGuard(values));
  }

  return (
    <Form
      name="create-guard-form"
      className="create-guard-form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      size="small"
      autoComplete="off"
      onFinish={onFinish}
    >
      <h2>Guards</h2>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: 'Please input your email correctly!',
            pattern: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
          },
        ]}
      >
        <Input className="input" type="email" autoComplete='off' />
      </Form.Item>
      <Form.Item
        name="firstName"
        label="Name"
        rules={[
          {
            required: true,
            min: 2,
            message: 'Name must be more than 2 characters!',
          },
        ]}
      >
        <Input className="input" type="text" autoComplete='off' />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Lastname"
        rules={[
          {
            required: true,
            min: 2,
            message: 'Lastname must be more than 2 characters!',
          },
        ]}
      >
        <Input className="input" type="text" autoComplete='off' />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input className="input" type="tel" autoComplete='off' />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            min: 6,
            message: 'Password must be more than 6 characters!',
          },
        ]}
      >
        <Input className="input" type="password" autoComplete='off' />
      </Form.Item>
      <Button type="primary" htmlType="submit" className="login-form-button">
        Create guard
      </Button>
    </Form>
  );
};

export default CreateGuard;