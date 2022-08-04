import React, { useEffect, useState, useRef } from 'react';
import { Card } from 'antd';
import PageLayout from '../components/PageLayout';
import { useDispatch, useSelector } from 'react-redux';
import { patchAlarm } from '../store/slices/authSlice';
import { setOrderList } from '../store/slices/socketSlice';


const signals = {
  0: 'PENDING',
  1: 'ACTIVE',
  2: 'DELETED',
  3: 'BANNED',
  5: 'COMPLETED'
};

const cardStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const SignalListPage = () => {
  const dispatch = useDispatch();
  const { orderList, orderCount } = useSelector(state => state.socket);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (!ws.current && token) {
  //     ws.current = new WebSocket('ws://discoverystudio.xyz:7321', token);
  //   }

  //   if (ws.current) {
  //     ws.current.onopen = event => {
  //       console.log('opened');
  //     };
  //     ws.current.onmessage = (event) => {
  //       const { data, event: currentEvent } = JSON.parse(event.data);

  //       if (currentEvent === 'getAll') {
  //         setOrderList(data.data);
  //         setCount(data.count);
  //         console.log(data);
  //       }
  //       if (currentEvent === 'sendSos') {
  //         setOrderList([data, ...orderList]);
  //       }
  //       if (currentEvent === 'acceptSos') {
  //         const newOrderList = orderList.map(order => {
  //           if (order.id === data.id) {
  //             const newOrder = { ...order };
  //             newOrder.status = 1;
  //             return newOrder;
  //           } else {
  //             return order;
  //           }
  //         })
  //         setOrderList(newOrderList);
  //       }
  //     };
  //     return () => {
  //       ws.current.close();
  //     }
  //   }
  // }, []);

  const onDelete = (id) => {
    dispatch(patchAlarm({ id, status: 2 }));
    const newOrderList = orderList.filter(order => order.id !== id);
    dispatch(setOrderList(newOrderList))
  }

  const onSubmit = (id) => {
    dispatch(patchAlarm({ id, status: 5 }));
    const newOrderList = orderList.filter(order => order.id !== id);
    dispatch(setOrderList(newOrderList));
  }

  return (
    <PageLayout>
      {orderCount ?
        <h3>Count: {orderCount}</h3>
        :
        <h2>На данный момент заказов нет</h2>
      }
      <div>
        {orderList.map(order => (
          <Card key={order.id} style={cardStyle}>
            <p>{order.user.email} </p>
            <p>Координаты: <b>{order.coordinates?.latitude}</b> <b>{order.coordinates?.longitude}</b></p>
            <p>Status: <b>{signals[order.status]}</b></p>
            <button className='delete' onClick={() => onDelete(order.id)}>Удалить заказ</button>
            <button className='complete' onClick={() => onSubmit(order.id)}>Завершить заказ</button>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
};

export default SignalListPage;