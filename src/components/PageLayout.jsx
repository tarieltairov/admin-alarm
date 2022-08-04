import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useLocation, useNavigate, } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
const { Header, Content } = Layout;

const PageLayout = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.split('/').join('');
  const { orderCount } = useSelector(state => state.socket);
  const dispatch = useDispatch();

  const menuItems = [
    {
      label: 'Home',
      key: 'home',
      icon: <HomeOutlined />,
      onClick: () => navigate('/')
    },
    {
      label: 'Users',
      key: 'users',
      icon: <UserOutlined />,
      onClick: () => navigate('/users')
    },
    {
      label: 'Guards',
      key: 'guards',
      icon: <UserOutlined />,
      onClick: () => navigate('/guards')
    },
    {
      label: `Signals ${orderCount || 0}`,
      key: 'signal',
      icon: <UserOutlined />,
      onClick: () => navigate('/signal')
    },
    {
      label: 'Archive',
      key: 'archive',
      onClick: () => navigate('/archive')
    },
    {
      label: 'Exit',
      key: 'exit',
      icon: <LogoutOutlined />,
      onClick: () => dispatch(logout())
    },
  ]

  return (
    <div className="container">
      <Layout>
        <Header>
          <Menu theme='light' mode="horizontal" activeKey={path || 'home'} items={menuItems} />
        </Header>
        <Content className='content'>
          {children}
        </Content>
      </Layout>
    </div>
  );
};

export default PageLayout;