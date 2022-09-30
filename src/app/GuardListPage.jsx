import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import PageLayout from "../components/PageLayout";
import CreateGuardForm from "../components/Forms/CreateGuardForm";
import GuardsTable from "../components/Tables/GuardsTable";
import { getGuardList } from "../redux/actions/authActions";

const GuardListPage = () => {
  const { guardList } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // const onFinish = (values) => {
  //   dispatch(postPrice(values));
  // };
  
  useEffect(() => {
    dispatch(getGuardList({}));
  }, [dispatch]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <PageLayout>
      <div className={"btnCreateGuard"}>
        <Button type="primary" onClick={showModal}>
          Добавить Агента
        </Button>
      </div>

      <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <CreateGuardForm handleCancel={handleCancel} />
      </Modal>
      <GuardsTable user={guardList.data || []} count={guardList.count} />
    </PageLayout>
  );
};

export default GuardListPage;
