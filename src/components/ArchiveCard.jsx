import { Card, Rate } from 'antd';
import React from 'react';

const signals = {
  0: 'PENDING',
  1: 'ACTIVE',
  2: 'DELETED',
  3: 'BANNED',
  5: 'COMPLETED'
};

const ArchiveCard = ({ item }) => {
  const { status, user, coordinates, noteFromUser } = item;
  return (
    <Card>
      <h3>
        {`Сигнал от ${user.firstName} ${user.lastName}. Статус `}
        <span
          style={{ color: signals[status] === 'DELETED' ? 'red' : 'green' }}
        >{signals[status]}</span>
      </h3>
      <div>
        <p>{`Координаты ${coordinates.latitude} ${coordinates.latitude}`}</p>
        <Rate disabled={true} count={5} value={noteFromUser || 5}/>
      </div>
    </Card>
  );
};

export default ArchiveCard;