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
  const { guardList } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [signalObj, setSignalObj] = useState(null);

  const ws = useContext(WebSocketContext);

  useEffect(() => {
    dispatch(getGuardList());
  }, []);

  const menu = guardList.map(({ firstName, lastName, id }) => {
    return {
      label: (
        <div key={id + Date.now()}>
          {firstName} {lastName}
        </div>
      ),
      key: id,
    };
  });

  console.log(signalObj);

  return (
    <div>
      <Table
        expandIcon={false}
        dataSource={signals}
        pagination={{
          hideOnSinglePage: true,
        }}
        rowKey={({ user }) => user.id}
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
              <a key={id + Date.now()}>
                Назначить <DownOutlined />
              </a>
            </Dropdown>
          )}
        />
        />
      </Table>
    </div>
  );
};

export default SignalsTable;
