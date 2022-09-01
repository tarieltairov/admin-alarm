import React, { useEffect, useState, useContext } from "react";
import { Table, Tag, Space, Card, Dropdown, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import {
  getGuardList,
  getUserList,
  postPay,
} from "../../store/slices/authSlice";
import { formattingDate } from "../../utils/dateFormatter";
import { WebSocketContext } from "../../WebSocket";

const { Column, ColumnGroup } = Table;

const SignalsTable = ({ signals }) => {
  const { onlineGuards } = useSelector((state) => state.socket);

  const ws = useContext(WebSocketContext);

  const menu = onlineGuards?.map((item) => {
    return {
      label: (
        <div key={item.user.id}>
          {item.user.firstName} {item.user.lastName}
        </div>
      ),
      key: item.user.id,
    };
  });


  return (
    <div>
      <Table
        expandIcon={false}
        dataSource={signals}
        pagination={{
          hideOnSinglePage: true,
        }}
      >
        <Column
          title="Имя"
          key="firstName"
          render={({ user }) => <>{user.firstName}</>}
        />
        <Column
          title="Фамилия"
          key="lastName"
          render={({ user }) => <>{user.lastName}</>}
        />
        <Column
          title="Номер телефона"
          key="phone"
          render={({ user }) => <>{user.phone}</>}
        />
        <Column
          title="E-mail"
          key="e-mail"
          render={({ user }) => <>{user.email}</>}
        />
        <Column
          title="Action"
          key="action"
          style={{ overflow: "auto" }}
          render={({ id }) => (
            <Dropdown
              overlay={
                <Menu
                  items={menu}
                  onClick={(e) =>
                    ws.sendToGuard({ alarmId: id, guardId: +e.key })
                  }
                />
              }
            >
              <a>
                Назначить <DownOutlined />
              </a>
            </Dropdown>
          )}
        />
      </Table>
    </div>
  );
};

export default SignalsTable;
