import { Card } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList, postPay } from '../store/slices/authSlice';

const UserCard = ({ user }) => {
  const { priceList } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const pay = async (data) => {
    await dispatch(postPay(data));
    await dispatch(getUserList());
  }

  return (
    <Card
      title={`${user.email} ${user.firstName} ${user.lastName}`}
    >
      {user.wallet ? (
        <p>Status: {user.wallet.paid ? `Оплачено до ${new Date(user.wallet.expirationDate).toDateString()}` : 'Не оплачено'}</p>
      ) :
        (
          <p>Status: Не оплачено</p>
        )
      }
      <ul>
        {user.role === 'PARENT' &&
          user.children.map(child => (
            <li key={child.id}>{child.email} {child.firstName} {child.lastName} {child.role}</li>
          ))
        }
      </ul>
      {(user.role === 'PARENT' || user.role === 'USER') &&
        priceList.map(({ price, id, period }) => (
          <button
            key={id}
            onClick={() => pay({ userId: user.id, cash: price, priceId: id })}
          >
            Оплатить за {period} дней {price} сом
          </button>
        ))
      }
    </Card>
  );
};

export default UserCard;