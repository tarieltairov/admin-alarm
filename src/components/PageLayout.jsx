import React from "react";
import { Layout, Menu } from "antd";
import { HomeOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
const { Header, Content } = Layout;

const PageLayout = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.split("/").join("");
  const { orderCount, requestCount } = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  const menuItems = [
    {
      label: "Главная",
      key: "home",
      icon: <HomeOutlined />,
      onClick: () => navigate("/"),
    },
    {
      label: "Пользователи",
      key: "users",
      icon: <UserOutlined />,
      onClick: () => navigate("/users"),
    },
    {
      label: "Агенты",
      key: "guards",
      icon: <UserOutlined />,
      onClick: () => navigate("/guards"),
    },
    {
      label: `SOS ${orderCount || 0}`,
      key: "signal",
      icon: <UserOutlined />,
      onClick: () => navigate("/signal"),
    },
    {
      label: "Карта",
      key: "map",
      onClick: () => navigate("/map"),
    },
    {
      label: `Завершение ${requestCount || 0}`,
      key: "requests",
      icon: <UserOutlined />,
      onClick: () => navigate("/requests"),
    },
    {
      label: "Архив",
      key: "archive",
      onClick: () => navigate("/archive"),
    },
    
    {
      label: "Выход",
      key: "exit",
      icon: <LogoutOutlined />,
      onClick: () => dispatch(logout()),
    },
  ];

  return (
    <div className="wrapper">
      <Header style={{ marginBottom: "20px" }}>
        <Menu
          theme="light"
          mode="horizontal"
          activeKey={path || "home"}
          items={menuItems}
        />
      </Header>
      <div className="container">
        <Layout>
          <Content className="content">{children}</Content>
        </Layout>
      </div>
    </div>
  );
};

export default PageLayout;
