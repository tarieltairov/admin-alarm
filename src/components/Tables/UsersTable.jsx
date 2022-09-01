import React, { useState } from "react";
import { Table, Tag, Space, Card, Dropdown, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { getUserList, postPay } from "../../store/slices/authSlice";
import { formattingDate } from "../../utils/dateFormatter";

const { Column, ColumnGroup } = Table;

const UsersTable = ({ user }) => {
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
          user.role === "USER"
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
      >
        <Column title="Имя" dataIndex="firstName" key="firstName" />
        <Column title="Фамилия" dataIndex="lastName" key="lastName" />
        <Column
          title="Статус оплаты"
          key="wallet"
          render={({ wallet }) =>
            wallet ? (
              <p>
                {wallet.paid
                  ? `Оплачено до ${formattingDate(wallet.expirationDate)}`
                  : "Не оплачено"}
              </p>
            ) : (
              <p>Не оплачено</p>
            )
          }
        />
        <Column
          title="Action"
          key="action"
          style={{ overflow: "auto" }}
          render={({ wallet }) =>
            !wallet ? (
              <Dropdown overlay={<Menu items={menu} />}>
                <a>
                  Оплатить <DownOutlined />
                </a>
              </Dropdown>
            ) : (
              wallet.paid && <p>Оплачено.</p>
            )
          }
        />
        />
      </Table>
    </div>
  );
};

export default UsersTable;
