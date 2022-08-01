import React, {createContext, useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderCount, setOrderList } from '../store/slices/socketSlice';


const WebSocketContext = createContext(null)

export { WebSocketContext }

export default ({children}) => {
  const {order, orderCount, orderList} = useSelector(state => state.socket);
  const {isAuth} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  let socket = useRef(null);
  let ws = useRef(null);

  
  if(isAuth && !socket.current) {
    const token = localStorage.getItem('token');
    socket.current = new WebSocket('ws://discoverystudio.xyz:7321', token);
    socket.current.onmessage = (event) => {
      const { data, event: currentEvent } = JSON.parse(event.data);

      switch(currentEvent) {
        case 'getAll': {
          console.log('getAll', data);
          dispatch(setOrderList(data.data));
          dispatch(setOrderCount(data.count));
          break;
        }
        case 'sendSos': {
          console.log('sendSos', data);
          const newOrderList = [data, ...orderList];
          dispatch(setOrderList(newOrderList));
          dispatch(setOrderCount(orderCount + 1));
          break;
        }
        case 'acceptSos': {
          console.log('acceptSos', data);
          const newOrderList = orderList.map(order => {
            if (order.id === data.id) {
              return data;
            } else {
              return order;
            }
          });
          console.log(newOrderList)
          dispatch(setOrderList(newOrderList));
          break;
        }
      }
      ws.current = {
        socket: socket.current
      }
    }
  }


  return (
    <WebSocketContext.Provider value={ws.current}>
      {children}
    </WebSocketContext.Provider>
  );
}