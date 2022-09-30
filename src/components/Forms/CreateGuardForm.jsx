import React from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";
import { createGuard } from "../../redux/actions/authActions";

const CreateGuardForm = ({handleCancel}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    dispatch(createGuard(values)).then(()=>{
      handleCancel();
    });
  };

  return (
    <Form
      name="create-guard-form"
      className="create-guard-form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      size="small"
      form={form}
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
            message: "Please input your email correctly!",
            pattern:
              /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
          },
        ]}
      >
        <Input className="input" type="email" autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="firstName"
        label="Name"
        rules={[
          {
            required: true,
            min: 2,
            message: "Name must be more than 2 characters!",
          },
        ]}
      >
        <Input className="input" type="text" autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Lastname"
        rules={[
          {
            required: true,
            min: 2,
            message: "Lastname must be more than 2 characters!",
          },
        ]}
      >
        <Input className="input" type="text" autoComplete="off" />
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
        <Input className="input" type="tel" autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            min: 6,
            message: "Password must be more than 6 characters!",
          },
        ]}
      >
        <Input className="input" type="password" autoComplete="off" />
      </Form.Item>
      <div className="btnCreateGuard">
        <Form.Item shouldUpdate>
          {() => (
            <Button
              size="middle"
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Create Guard
            </Button>
          )}
        </Form.Item>
      </div>
    </Form>
  );
};

export default CreateGuardForm;
