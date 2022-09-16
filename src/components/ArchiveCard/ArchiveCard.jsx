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
  const { status, user, coordinates, alarm, comment, id } = item;
  return (
    <Card>
      <div className={classes.info}>
        <h3>
          {`Сигнал от ${user.firstName} ${user.lastName}. Статус `}
          <span
            style={{ color: signals[status] === "DELETED" ? "red" : "green" }}
          >
            {signals[status]}
          </span>
        </h3>
        {comment.length > 0 && (
          <div className={classes.comment}>
            <span>Комментарий</span>
            <div className={classes.commentValue}>
              <p>{comment}</p>
            </div>
          </div>
        )}
        <button className={classes.editBtn} onClick={() => showModal(id)}>
          <EditOutlined />
        </button>
      </div>

      <div>
        <p>{`Координаты ${coordinates.latitude} ${coordinates.latitude}`}</p>
        <Rate disabled={true} count={5} value={alarm?.noteFromUser || 5} />
      </div>
    </Card>
  );
};

export default ArchiveCard;
