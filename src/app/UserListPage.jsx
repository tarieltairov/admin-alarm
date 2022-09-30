import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageLayout from "../components/PageLayout";
import UsersTable from "../components/Tables/UsersTable";
import { getUserList } from "../redux/actions/authActions";

const UserListPage = () => {
  const { userList } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserList({}));
  }, [dispatch]);

  return (
    <PageLayout>
      <UsersTable user={userList.data} count={userList.count} />
    </PageLayout>
  );
};

export default UserListPage;
