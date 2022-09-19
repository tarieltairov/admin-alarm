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
  const { status, user, coordinates, noteFromUser, createDate
  } = item;
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
        <button className={classes.editBtn} onClick={() => showModal()}>
          <EditOutlined />
        </button>
      </div>

      <div>
        <p>{`Координаты - ${coordinates.latitude} ${coordinates.latitude}`}</p>
        <p style={{marginTop: '10px'}} >{`Дата и время -  ${new Date(createDate).toLocaleString()}`}</p>
        <Rate disabled={true} count={5} value={noteFromUser || 0} />
      </div>
    </Card>
  );
};

export default ArchiveCard;
