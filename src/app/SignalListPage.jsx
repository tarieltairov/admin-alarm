import React from "react";
import PageLayout from "../components/PageLayout";
import { useDispatch, useSelector } from "react-redux";
import { patchAlarm } from "../store/slices/authSlice";
import { setOrderList } from "../store/slices/socketSlice";
import SignalsTable from "../components/Tables/SignalsTable";
import Loader from "../components/Loader/Loader";

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

  return (
    <PageLayout>
      {orderCount ? (
        <h3>Количество: {orderCount}</h3>
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
