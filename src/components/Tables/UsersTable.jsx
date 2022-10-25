import React, { useRef, useState } from "react";
import { Table, Tag, Space, Card, Dropdown, Menu, Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { formattingDate } from "../../utils/dateFormatter";
import { ColumnSearchProps } from "../columnSearchProps";
import { getUserList, paySubscription, postPay } from "../../redux/actions/authActions";

const { Column } = Table;

const UsersTable = ({ user, count }) => {
  const { priceList, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [page, setPage] = useState(null)
  // const pay = (data) => {
  //   dispatch(postPay(data)).then(()=>{
  //     dispatch(getUserList({}));
  //   });
  // };

  // const menu = priceList.map(({ price, id, period }) => {
  //   return {
  //     label: (
  //       <div onClick={() => pay({ userId: user.id, cash: price, priceId: id })}>
  //         Оплатить за {period} дней {price} сом
  //       </div>
  //     ),
  //     key: id,
  //   };
  // });

  const changePage = (arg) => {
    setPage(arg)
    dispatch(getUserList({ page }));
  };

  const buySubscription = (id) => {
    dispatch(paySubscription(id)).then(() => {
      dispatch(getUserList({ page }));
    });
  };

  return (
    <div>
      <Table
        loading={loading}
        expandable={
          user?.role === "USER"
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
          hideOnSinglePage: false,
          defaultPageSize: 10,
          total: count,
          position: ["bottomCenter"],
          onChange: (page) => changePage(page),
        }}
        scroll={{
          y: 240,
        }}
        rowKey={({ id }) => id}
      >
        <Column title="Секретное слово" dataIndex="secretWord" key="secretWord" />
        <Column
          title="Имя"
          dataIndex="firstName"
          key="firstName"
          {...ColumnSearchProps({
            dataIndex: "firstName",
            getUsers: getUserList,
          })}
        />
        <Column title="Фамилия" dataIndex="lastName" key="lastName" />
        {/*<Column*/}
        {/*  title="Статус оплаты"*/}
        {/*  key="wallet"*/}
        {/*  render={({ wallet }) =>*/}
        {/*    wallet ? (*/}
        {/*      <p>*/}
        {/*        {wallet.paid*/}
        {/*          ? `Оплачено до ${formattingDate(wallet.expirationDate)}`*/}
        {/*          : "Не оплачено"}*/}
        {/*      </p>*/}
        {/*    ) : (*/}
        {/*      <p>Не оплачено</p>*/}
        {/*    )*/}
        {/*  }*/}
        {/*/>*/}
        <Column
          title="Статус Оплаты"
          key="action"
          style={{ overflow: "auto" }}
          render={({ purchases, id }) => {
            const allSubscribes = purchases.find(
              (purchase) => purchase.type === "SUBSCRIPTION"
            );
            const lastSubIndex = purchases.lastIndexOf(allSubscribes);
            const lastSubscribe = purchases[lastSubIndex];
            return !lastSubscribe ? (
              <a onClick={() => buySubscription(id)}>Оплатить</a>
            ) : (
              <p>
                Оплачено до&nbsp;
                {formattingDate(lastSubscribe.subscription.expirationDate)}
              </p>
            );
          }}
        />
      </Table>
    </div>
  );
};

export default UsersTable;
