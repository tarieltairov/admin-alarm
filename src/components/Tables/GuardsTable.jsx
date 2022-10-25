import React  from "react";
import { Table, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ColumnSearchProps } from "../columnSearchProps";
import { deleteUser, getGuardList, restoreUser } from "../../redux/actions/authActions";

const { Column } = Table;

const GuardsTable = ({ user, count }) => {
  const {loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const changePage = (page) => {
    dispatch(getGuardList({ page }));
  };

  return (
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
      rowKey={(user) => user?.id}
      scroll={{
        y: 240,
      }}
    >
      <Column
        title="Имя"
        dataIndex="firstName"
        key="firstName"
        {...ColumnSearchProps({
          dataIndex: "firstName",
          getUsers: getGuardList,
        })}
      />
      <Column title="Фамилия" dataIndex="lastName" key="lastName" />
      <Column title="Номер телефона" dataIndex="phone" key="phoneNumber" />
      <Column
        title="Удаление"
        key="action"
        style={{ overflow: "auto" }}
        render={(user) => (
          <Space size={"middle"}>
            {user?.isDeleted ? (
              <a
                style={{ color: "green" }}
                onClick={() => {
                  dispatch(restoreUser(user?.id));
                }}
              >
                Восстановить
              </a>
            ) : (
              <a
                style={{ color: "red" }}
                onClick={() => {
                  dispatch(deleteUser(user?.id));
                }}
              >
                Удалить
              </a>
            )}
          </Space>
        )}
      />
    </Table>
  );
};

export default GuardsTable;
