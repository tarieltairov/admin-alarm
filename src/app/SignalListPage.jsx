import React from "react";
import PageLayout from "../components/PageLayout";
import { useSelector } from "react-redux";
// import { setOrderList } from "../redux/slices/socketSlice";
import SignalsTable from "../components/Tables/SignalsTable";
// import { patchAlarm } from "../redux/actions/authActions";

const SignalListPage = () => {
  // const dispatch = useDispatch();
  const { orderList, orderCount } = useSelector((state) => state.socket);

  // const onDelete = (id) => {
  //   dispatch(patchAlarm({ id, status: 2 }));
  //   const newOrderList = orderList.filter((order) => order.id !== id);
  //   dispatch(setOrderList(newOrderList));
  // };

  // const onSubmit = (id) => {
  //   dispatch(patchAlarm({ id, status: 5 }));
  //   const newOrderList = orderList.filter((order) => order.id !== id);
  //   dispatch(setOrderList(newOrderList));
  // };

  return (
    <PageLayout>
      {orderCount ? (
        <h3>Количество: {orderCount}</h3>
      ) : (
        <h2>На данный момент заказов нет</h2>
      )}
      <div>
        <SignalsTable signals={orderList} />
      </div>
    </PageLayout>
  );
};

export default SignalListPage;
