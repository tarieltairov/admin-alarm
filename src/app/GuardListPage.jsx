import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import PageLayout from "../components/PageLayout";
import { getGuardList, postPrice } from "../store/slices/authSlice";
import CreateGuardForm from "../components/Forms/CreateGuardForm";
import UsersTable from "../components/Tables/UsersTable";
import GuardsTable from "../components/Tables/GuardsTable";
import CreateRateForm from "../components/Forms/CreateRateForm";

const GuardListPage = () => {
  const { guardList } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  console.log(guardList);

  const onFinish = (values) => {
    dispatch(postPrice(values));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    dispatch(getGuardList());
  }, [dispatch]);

  return (
    <PageLayout>
      <div className={"btnCreateGuard"}>
        <Button type="primary" onClick={showModal}>
          Добавить Агента
        </Button>
      </div>

      <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <CreateGuardForm />
      </Modal>
      <GuardsTable user={guardList} />
    </PageLayout>
  );
};

export default GuardListPage;
