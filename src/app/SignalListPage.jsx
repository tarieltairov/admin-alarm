import React, { useEffect, useState, useRef } from "react";
import { Card } from "antd";
import PageLayout from "../components/PageLayout";
import { useDispatch, useSelector } from "react-redux";
import { patchAlarm } from "../store/slices/authSlice";
import { setOrderList } from "../store/slices/socketSlice";
import SignalsTable from "../components/Tables/SignalsTable";

const signals = {
  0: "PENDING",
  1: "ACTIVE",
  2: "DELETED",
  3: "BANNED",
  5: "COMPLETED",
};

const cardStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const signalResp = {
  event: "getAll",
  data: {
    data: [
      {
        id: 7,
        status: 0,
        createDate: "2022-08-25T10:09:38.502Z",
        updateDate: "2022-08-25T10:09:38.502Z",
        user: {
          id: 2,
          status: 1,
          createDate: "2022-08-25T06:17:25.808Z",
          updateDate: "2022-08-25T10:11:20.182Z",
          email: "user@gmail.com",
          firstName: "Bernard",
          lastName: "Shaw",
          authType: null,
          phone: "+996700112233",
          pushToken: null,
          role: "USER",
          agreement: false,
        },
        coordinates: {
          id: 7,
          status: 1,
          createDate: "2022-08-25T10:09:38.485Z",
          updateDate: "2022-08-25T10:09:38.485Z",
          longitude: 123,
          latitude: 123,
        },
      },
    ],
    count: 1,
  },
};

const SignalListPage = () => {
  const dispatch = useDispatch();
  const { orderList, orderCount } = useSelector((state) => state.socket);

  const onDelete = (id) => {
    dispatch(patchAlarm({ id, status: 2 }));
    const newOrderList = orderList.filter((order) => order.id !== id);
    dispatch(setOrderList(newOrderList));
  };

  const onSubmit = (id) => {
    dispatch(patchAlarm({ id, status: 5 }));
    const newOrderList = orderList.filter((order) => order.id !== id);
    dispatch(setOrderList(newOrderList));
  };
  console.log(orderList);
  return (
    <PageLayout>
      {orderCount ? (
        <h3>Count: {orderCount}</h3>
      ) : (
        <h2>На данный момент заказов нет</h2>
      )}
      <div>
        {/*{orderList.map(order => (*/}
        {/*  <Card key={order.id} style={cardStyle}>*/}
        {/*    <p>{order.user.email} </p>*/}
        {/*    <p>Координаты: <b>{order.coordinates?.latitude}</b> <b>{order.coordinates?.longitude}</b></p>*/}
        {/*    <p>Status: <b>{signals[order.status]}</b></p>*/}
        {/*    <button className='delete' onClick={() => onDelete(order.id)}>Удалить заказ</button>*/}
        {/*    <button className='complete' onClick={() => onSubmit(order.id)}>Завершить заказ</button>*/}
        {/*  </Card>*/}
        {/*))}*/}

        <SignalsTable signals={orderList} />
      </div>
    </PageLayout>
  );
};

export default SignalListPage;
