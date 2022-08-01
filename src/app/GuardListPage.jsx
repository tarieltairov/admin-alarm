import React, { useEffect } from 'react';
import { Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PageLayout from '../components/PageLayout';
import { getGuardList } from '../store/slices/authSlice';
import CreateGuard from '../components/CreateGuard';

const GuardListPage = () => {
  const { guardList } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGuardList());
  }, [dispatch]);

  return (
    <PageLayout>
      <CreateGuard />
      {!!guardList.length &&
        guardList.map(user => (
          <Card key={user.id}>{user.firstName} {user.role}</Card>
        ))
      }
    </PageLayout>
  );
};

export default GuardListPage;