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
  const [userId, setUserId] = useState(null);
  const [comment, setComment] = useState();
  useEffect(() => {
    dispatch(getArchive({}));
  }, []);

  const showModal = (id) => {
    const oldComment = archiveList.data.find((item) => item.id === id).comment;
    setComment(oldComment);
    setUserId(id);
    setIsModalVisible(true);
  };
  const onOk = () => {
    dispatch(addComment({ comment, userId }));
    setIsModalVisible(false);
    setComment("");
    setUserId(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setComment("");
    setUserId(null);
  };
  const changePage = (page) => {
    dispatch(getArchive({ page }));
  };

  return (
    <PageLayout>
      {archiveList?.data
        ?.slice()
        .sort((a, b) => new Date(b?.createDate) - new Date(a?.createDate))
        .map((item) => (
          <ArchiveCard item={item} key={item.id} showModal={showModal} />
        ))}

      {archiveList?.count && (
        <Pagination
          className="pagination"
          defaultCurrent={1}
          defaultPageSize={10}
          total={archiveList.count}
          onChange={(page) => changePage(page)}
        />
      )}
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
