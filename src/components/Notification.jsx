import React from "react";
import {
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from "@ant-design/icons";
import { Button, Divider, notification, Space } from "antd";

const Context = React.createContext({
  name: "Default",
});

const Notification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    api.info({
      message: `Notification ${placement}`,
      description: (
        <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>
      ),
      placement,
    });
  };

  return (
    <div>
      {contextHolder}
      {/*<Button type="primary" onClick={() => openNotification("topRight")}>*/}
      {/*  <RadiusUpleftOutlined />*/}
      {/*</Button>*/}
    </div>
  );
};

export default Notification;
