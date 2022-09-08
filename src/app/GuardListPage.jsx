import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import PageLayout from "../components/PageLayout";
import { getGuardList, postPrice } from "../store/slices/authSlice";
import CreateGuardForm from "../components/Forms/CreateGuardForm";
import GuardsTable from "../components/Tables/GuardsTable";

const GuardListPage = () => {
  const { guardList } = useSelector((state) => state.auth);
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
