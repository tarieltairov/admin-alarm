import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArchiveCard from "../components/ArchiveCard/ArchiveCard";
import PageLayout from "../components/PageLayout";
import { getArchive } from "../store/slices/authSlice";
import Loader from "../components/Loader/Loader";
import Pagination from "antd/es/pagination";
import { Modal } from "antd";
import { Input } from "antd";

const { TextArea } = Input;

const ArchivePage = () => {
  const { archiveList } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    dispatch(getArchive());
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const onOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <PageLayout>
      {archiveList
        .slice()
        .sort((a, b) => new Date(b?.createDate) - new Date(a?.createDate))
        .map((item) => (
          <ArchiveCard item={item} key={item.id} showModal={showModal} />
        ))}
      <Pagination
        className="pagination"
        defaultCurrent={1}
        total={100}
        defaultPageSize={10}
      />
      <Modal
        title={"Коментарий"}
        visible={isModalVisible}
        onOk={onOk}
        onCancel={handleCancel}
      >
        <div className="gg" style={{ maxWidth: 200, margin: "0 auto" }}>
          <TextArea
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
            placeholder={"Коменариий"}
          />
        </div>
      </Modal>
    </PageLayout>
  );
};

export default ArchivePage;
