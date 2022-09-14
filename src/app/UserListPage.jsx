import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageLayout from "../components/PageLayout";
import UsersTable from "../components/Tables/UsersTable";
import { getPrice, getUserList } from "../store/slices/authSlice";
import Loader from "../components/Loader/Loader";
import GuardsTable from "../components/Tables/GuardsTable";

const UserListPage = () => {
  const { userList, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserList());
    // dispatch(getPrice());
  }, [dispatch]);
  console.log(userList);
  return (
    <PageLayout>
      <UsersTable user={userList.data} count={userList.count} />
    </PageLayout>
  );
};

export default UserListPage;
