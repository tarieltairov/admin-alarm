import React, { useContext, useState } from "react";
import { Table, Dropdown, Menu, Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DownOutlined, SendOutlined } from "@ant-design/icons";
import { WebSocketContext } from "../../WebSocket";
import Modal from "antd/es/modal";
import { setCompleteModal } from "../../store/slices/socketSlice";

const { Column, ColumnGroup } = Table;
const { TextArea } = Input;

const SignalsTable = ({ signals }) => {
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);
  const { loading } = useSelector((state) => state.auth);

  const { onlineGuards, isModalVisible } = useSelector((state) => state.socket);
  const [message, setMessage] = useState("");

  const showModal = (id) => {
    dispatch(setCompleteModal(true));
    ws.joinRoom(id);
  };

  const handleCancel = () => {
    setMessage("");
    dispatch(setCompleteModal(false));
  };

  const sendMessage = () => {
    ws.sendMessageToUser(message);
    setMessage("");
    handleCancel();
  };

  const check = (onlineGuards) => {
    if (onlineGuards?.length) {
      const menu = onlineGuards?.map((item) => {
        return {
          label: (
            <div key={item?.id}>
              {item?.firstName} {item?.lastName}
            </div>
          ),
          key: item?.id,
        };
      });
      return menu;
    } else {
      const newArray = ["нет агентов в сети"];
      const forMenu = newArray?.map((item, index) => {
        return {
          label: (
            <div key={index} style={{ color: "red" }}>
              {item}
            </div>
          ),
          key: index,
        };
      });
      return forMenu;
    }
  };

  return (
    <div>
      <Table
        loading={loading}
        expandIcon={false}
        dataSource={signals}
        pagination={{
          hideOnSinglePage: false,
          position: ["bottomCenter"],
        }}
        rowKey={({ user }) => user.id}
        scroll={{
          y: 240,
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
          title="Appointment"
          key="appointment"
          style={{ overflow: "auto" }}
          render={({ id }) => (
            <Dropdown
              overlay={
                <Menu
                  items={check(onlineGuards)}
                  onClick={(e) =>
                    onlineGuards.length &&
                    ws.sendToGuard({ alarmId: id, guardId: e.key })
                  }
                />
              }
            >
              <a key={id}>
                Назначить <DownOutlined />
              </a>
            </Dropdown>
          )}
        />
        <Column
          title="Message"
          key="message"
          style={{ overflow: "auto" }}
          align="center"
          render={({ user, id }) => (
            <>
              <SendOutlined onClick={() => showModal(id)} />

              <Modal
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
              >
                <p>
                  Отправка сообщения {user.firstName}
                  {user.lastName}-(у){" "}
                </p>
                <TextArea
                  rows={4}
                  placeholder="Введите сообщение"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ margin: "15px 0" }}
                />
                <Button
                  type="danger"
                  onClick={handleCancel}
                  style={{ marginRight: "15px" }}
                >
                  Отклонить
                </Button>
                <Button type="primary" onClick={sendMessage}>
                  Отправить
                </Button>
              </Modal>
            </>
          )}
        />
      </Table>
    </div>
  );
};

export default SignalsTable;
