import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArchiveCard from "../../components/ArchiveCard/ArchiveCard";
import PageLayout from "../../components/PageLayout";
import {
  addComment,
  getArchive,
} from "../../store/slices/authSlice";
import Pagination from "antd/es/pagination";
import { Modal, Select, Input } from "antd";
import classes from "./ArchivePage.module.css";

const { TextArea } = Input;
const { Option } = Select;

const ArchivePage = () => {
  const { archiveList } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [alarmId, setAlarmId] = useState(null);
  const [comment, setComment] = useState();
  const [params, setParams] = useState({
    page: 1,
    take: 10
  });

  useEffect(() => {
    dispatch(getArchive(params));
  }, [params]);

  const showModal = (id) => {
    const oldComment = archiveList.data.find(({alarm}) => alarm.id === id).alarm.comment;
    setComment(oldComment);
    setAlarmId(id);
    setIsModalVisible(true);
  };
  const onOk = () => {
    dispatch(addComment({ comment, alarmId }));
    setIsModalVisible(false);
    setComment("");
    setAlarmId(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setComment("");
    setAlarmId(null);
  };
  const getParams = (value) => {
    setParams(value)
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
          <Pagination
            className="pagination"
            defaultCurrent={1}
            defaultPageSize={params.take}
            total={archiveList.count}
            pageSizeOptions={[10,15,20,50]}
            showSizeChanger={true}
            onChange={(page,size) => getParams({page, total: size})}
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
