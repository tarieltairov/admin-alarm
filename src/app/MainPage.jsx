import React, { useState } from "react";
import { Button, Card, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import PageLayout from "../components/PageLayout";
import { formattingDate } from "../utils/dateFormatter";
import Modal from "antd/es/modal";
import CreateRateForm from "../components/Forms/CreateRateForm";
import Loader from "../components/Loader/Loader";
import Notification from "../components/Notification";
import { postPrice } from "../redux/actions/authActions";

const MainPage = () => {
  const { priceList, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = (values) => {
    dispatch(postPrice(values));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <PageLayout>
      <div className="price">
        <h3>Добавить тариф</h3>
        <div className="addRateBlock">
          <Button type="primary" onClick={showModal}>
            Добавить тариф
          </Button>
          {!loading ? (
            <Modal
              visible={isModalVisible}
              onCancel={handleCancel}
              footer={null}
            >
              <CreateRateForm onFinish={onFinish} handleAdd={handleCancel} />
            </Modal>
          ) : (
            <Loader />
          )}
          <Notification />
        </div>
        <h3>Текущие тарифы</h3>
        <Space
          direction="vertical"
          size="middle"
          style={{
            width: "60%",
          }}
        >
          {priceList.map((price) => (
            <Card
              style={{ width: "100%" }}
              title={`Тариф на ${price.period} дней`}
              key={price.id}
            >
              <p>
                Стоимость: <strong>{price.price} сом</strong>
              </p>
              <p>Дата создания: {formattingDate(price.createDate)}</p>
            </Card>
          ))}
        </Space>
      </div>
    </PageLayout>
  );
};

export default MainPage;
