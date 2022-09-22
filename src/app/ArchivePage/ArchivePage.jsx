import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArchiveCard from "../../components/ArchiveCard/ArchiveCard";
import PageLayout from "../../components/PageLayout";
import {
  addComment,
  getArchive,
} from "../../store/slices/authSlice";
import Loader from "../../components/Loader/Loader";
import Pagination from "antd/es/pagination";
import { Modal, Select, Input } from "antd";
import classes from "./ArchivePage.module.css";

const { TextArea } = Input;
const { Option } = Select;

const ArchivePage = () => {
  const { archiveList } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [comment, setComment] = useState();
  const [params, setParams] = useState({
    page: 1,
    take: 10
  });

  useEffect(() => {
    dispatch(getArchive(params));
  }, [params]);

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
  const getParams = (value, type) => {
    const newParams = {
      ...params,
      [type]: value
    }
    setParams(newParams)
  };

  return (
    <PageLayout>

      <div className={classes.cardContainer}>
        {archiveList?.data?.map((item) => (
            <ArchiveCard item={item} key={item.id} showModal={showModal} />
          ))}
      </div>


      {archiveList?.count && (
        <div className={classes.paramsContainer}>
          <Select placeholder="Лимит"  style={{ width: 120 }} onChange={(e) => getParams(e, 'take')}>
            <Option value="disabled" disabled> Лимит</Option>
            <Option value={10}>10</Option>
            <Option value={15}>15</Option>
            <Option value={20}>20</Option>
          </Select>

          <Pagination
            className="pagination"
            defaultCurrent={1}
            defaultPageSize={params.take}
            pageSize={params.take}
            total={archiveList.count}
            onChange={(page) => getParams(page, 'page')}
          />
        </div>
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
