import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArchiveCard from "../../components/ArchiveCard/ArchiveCard";
import PageLayout from "../../components/PageLayout";
import {
  addComment,
  fetchLogin,
  getArchive,
} from "../../store/slices/authSlice";
import Loader from "../../components/Loader/Loader";
import Pagination from "antd/es/pagination";
import { Modal } from "antd";
import { Input } from "antd";
import classes from "./ArchivePage.module.css";

const { TextArea } = Input;

const ArchivePage = () => {
  const { archiveList } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  let userId;
  const [comment, setComment] = useState("");
  useEffect(() => {
    dispatch(getArchive());
  }, []);

  const showModal = (id) => {
    setIsModalVisible(true);
    console.log(id);
  };
  const onOk = () => {
    setIsModalVisible(false);
    setComment("");
    userId = null;
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setComment("");
    userId = null;
  };

  const item = {
    id: 1,
    status: 5,
    user: {
      firstName: "fdsfds",
      lastName: "fddsfds",
    },
    coordinates: {
      latitude: 2,
      longitude: 2,
    },
    alarm: {
      noteFromUser: 2,
    },

    comment: "",
  };

  return (
    <PageLayout>
      {/*{archiveList*/}
      {/*  .slice()*/}
      {/*  .sort((a, b) => new Date(b?.createDate) - new Date(a?.createDate))*/}
      {/*  .map((item) => (*/}
      <ArchiveCard item={item} key={item.id} showModal={showModal} />
      {/*))}*/}
      <Pagination
        className="pagination"
        defaultCurrent={1}
        total={100}
        defaultPageSize={10}
      />
      <Modal
        className={classes.commentModal}
        title={"Комментарий"}
        visible={isModalVisible}
        onOk={onOk}
        onCancel={handleCancel}
      >
        <div style={{ margin: "0 auto" }}>
          <TextArea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            autoSize={{
              minRows: 3,
              maxRows: 10,
            }}
            placeholder={"Коменариий"}
          />
        </div>
      </Modal>
    </PageLayout>
  );
};

export default ArchivePage;
