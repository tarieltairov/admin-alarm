import React, { useState } from "react";
import { Table, Tag, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getGuardList,
  getUserList,
  postPay,
  restoreUser,
} from "../../store/slices/authSlice";

const { Column, ColumnGroup } = Table;

const GuardsTable = ({ user, count }) => {
  const { priceList, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const changePage = (page) => {
    dispatch(getGuardList(page));
  };

  return (
    <div>
      <Table
        loading={loading}
        expandIcon={() => null}
        dataSource={user}
        pagination={{
          hideOnSinglePage: false,
          defaultPageSize: 10,
          total: count,
          position: ["bottomCenter"],
          onChange: (page) => changePage(page),
        }}
        rowKey={({ id }) => id}
        scroll={{
          y: 240,
        }}
      >
        <Column title="Имя" dataIndex="firstName" key="firstName" />
        <Column title="Фамилия" dataIndex="lastName" key="lastName" />
        <Column title="Номер телефона" dataIndex="phone" key="phoneNumber" />
        <Column
          title="Delete"
          key="action"
          style={{ overflow: "auto" }}
          render={({ id, isDeleted }) => (
            <Space size={"middle"}>
              {isDeleted ? (
                <a
                  style={{ color: "green" }}
                  onClick={() => {
                    dispatch(restoreUser(id));
                  }}
                >
                  Восстановить
                </a>
              ) : (
                <a
                  style={{ color: "red" }}
                  onClick={() => {
                    dispatch(deleteUser(id));
                  }}
                >
                  Удалить
                </a>
              )}
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default GuardsTable;
