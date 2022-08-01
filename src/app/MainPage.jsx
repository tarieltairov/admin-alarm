import React, { useEffect } from 'react';
import { Form, Button, InputNumber, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PageLayout from '../components/PageLayout';
import { getPrice, postPrice } from '../store/slices/authSlice';


const MainPage = () => {
  const { priceList } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPrice());
  }, [dispatch]);

  const onFinish = (values) => {
    dispatch(postPrice(values));
  };

  return (
    <PageLayout>
      <div className='price'>
        <h3>Добавить или обновить тариф</h3>
        <Form
          name="normal-prices"
          className="price-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="price"
            label="Стоимость"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              type="number"
              min={1}
            />
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
            <InputNumber
              max={365}
              min={1}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Выставить тариф
            </Button>
          </Form.Item>
        </Form>
        <h3>Текущие тарифы</h3>
        {priceList.map(price => <Card key={price.id}>{`Тариф за ${price.period} дней - ${price.price} сом`}</Card>)}
      </div>
    </PageLayout>
  );
};

export default MainPage;