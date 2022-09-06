import React from "react";
import { Table, Tag, Space} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUserList, postPay } from "../../store/slices/authSlice";

const { Column, ColumnGroup } = Table;

const GuardsTable = ({ user }) => {
  const { priceList } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const pay = async (data) => {
    await dispatch(postPay(data));
    await dispatch(getUserList());
  };

  const menu = priceList.map(({ price, id, period }) => {
    return {
      label: (
        <div onClick={() => pay({ userId: user.id, cash: price, priceId: id })}>
          Оплатить за {period} дней {price} сом
        </div>
      ),
      key: id,
    };
  });

  return (
    <div>
      <Table
        expandIcon={false}
        expandable={
          user.role === "PARENT"
            ? {
                expandedRowRender: ({ children }) => (
                  <>
                    {children.map((tag) => (
                      <Tag color="blue" key={tag}>
                        {tag}
                      </Tag>
                    ))}
                  </>
                ),
              }
            : {
                expandIcon: () => null,
                expandRowByClick: true,
              }
        }
        dataSource={user}
        pagination={{
          hideOnSinglePage: true,
        }}
        rowKey={({ id }) => id}
      >
        <Column title="Имя" dataIndex="firstName" key="firstName" />
        <Column title="Фамилия" dataIndex="lastName" key="lastName" />
        <Column title="Номер телефона" dataIndex="phone" key="phoneNumber" />
        <Column
          title="Action"
          key="action"
          style={{ overflow: "auto" }}
          render={() => (
            <Space size={"middle"}>
              <a>Удалить</a>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default GuardsTable;
