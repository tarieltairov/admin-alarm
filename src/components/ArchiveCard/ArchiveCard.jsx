import React from "react";
import { Card, Rate } from "antd";
import { EditOutlined } from "@ant-design/icons";
import classes from "./ArchiveCard.module.css";

const signals = {
  0: "PENDING",
  1: "ACTIVE",
  2: "DELETED",
  3: "BANNED",
  5: "COMPLETED",
};

const ArchiveCard = ({ item, showModal }) => {
  const { status, user, alarm, createDate, id, guard
  } = item;
  return (
    <Card style={{ marginBottom: '50px' }}>
      <div className={classes.info}>
        <h3>
          {`Сигнал от ${user?.firstName} ${user?.lastName}. Статус `}
          <span
            style={{ color: signals[status] === "DELETED" ? "red" : "green" }}
          >
            {signals[status]}
          </span>
          <br /><br/>
          <span>{`Принял вызов -  ${guard.firstName} ${guard.lastName}`}</span>
        </h3>
        <div className={classes.comment}>
          <span>Комментарий</span>
          <div className={classes.commentValue}>
            <p style={{ color: !alarm.comment && 'lightgray' }}>{alarm.comment ? alarm.comment : "оставьте комментарий"}</p>
          </div>
        </div>
        <button className={classes.editBtn} onClick={() => showModal(alarm.id)}>
          <EditOutlined />
        </button>
      </div>

      <div>
        <p>{`Координаты - ${alarm.coordinates.latitude}, ${alarm.coordinates.longitude}`}</p>
        <p style={{ marginTop: '10px' }} >{`Дата и время -  ${new Date(createDate).toLocaleString()}`}</p>
        <Rate disabled={true} count={5} value={alarm.noteFromUser || 0} />
      </div>
    </Card>
  );
};

export default ArchiveCard;
