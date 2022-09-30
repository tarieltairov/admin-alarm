import React from "react";
import { Button, Form, InputNumber } from "antd";

const CreateRateForm = ({ onFinish, handleAdd }) => {
  
  return (
    <Form name="normal-prices" className="price-form" onFinish={onFinish}>
      <h3>Добавить тариф</h3>
      <Form.Item
        name="price"
        label="Стоимость"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber type="number" min={1} />
      </Form.Item>
      <Form.Item
        name="period"
        label="Количество дней"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber max={365} min={1} />
      </Form.Item>
      <Form.Item>
        <Button
          onClick={handleAdd}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Выставить тариф
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateRateForm;
