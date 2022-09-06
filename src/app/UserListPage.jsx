import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageLayout from "../components/PageLayout";
import UserCard from "../components/UserCard";
import UsersTable from "../components/Tables/UsersTable";
import { getPrice, getUserList } from "../store/slices/authSlice";

const UserListPage = () => {
  const { userList } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserList());
    dispatch(getPrice());
  }, [dispatch]);

  console.log(userList);

  return (
    <PageLayout>
      {/*{!!userList.length &&*/}
      {/*  userList.map((user) => <UserCard user={user} key={user.id} />)}*/}
      <UsersTable user={userList} />
    </PageLayout>
  );
};

export default UserListPage;
