import React, { createContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  setOnlineGuards,
  setOrderCount,
  setOrderList,
  setRequestCount,
  setRequestList,
} from "../store/slices/socketSlice";


const WebSocketContext = createContext(null);

export { WebSocketContext };

export default ({ children }) => {
  const { order, orderCount, orderList, requestCount } = useSelector(
    (state) => state.socket
  );
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let socket = useRef(null);
  let ws = useRef(null);

  const sendToGuard = ({ alarmId, guardId }) => {
    const message = JSON.stringify({
      event: "sendToGuard",
      data: {
        alarmId,
        guardId,
      },
    });
    socket.current.send(message);
  };

  const sendMessageToUser = (messageToUser) => {
    const message = JSON.stringify({
      event: "messageToRoom",
      data: {
        message: messageToUser,
        admin: true
      },
    });
    socket.current.send(message);
  };

  const joinRoom = (id) => {
    const message = JSON.stringify({
      event: "joinRoom",
      data: {
        roomId: id,
      },
    });
    socket.current.send(message);
  };

  const confirm = (id) => {
    const message = JSON.stringify({
      event: "complete",
      data: {
        alarmId: id,
      },
    });
    socket.current.send(message);
  };

  if (isAuth && !socket.current) {
    const token = localStorage.getItem("token");
    socket.current = new WebSocket("ws://discoverystudio.xyz:6969", token);
    socket.current.onmessage = (event) => {
      const { data, event: currentEvent } = JSON.parse(event.data);

      switch (currentEvent) {
        case "getAllGuards": {
          dispatch(setOnlineGuards(data));
          break;
        }
        case "getAll": {
          dispatch(setOrderList(data.data));
          dispatch(setOrderCount(data.count));
          if (orderCount !== data.count && data.count !== 0) {
            toast.warning(`Внимание! Новый запрос SOS от пользователя ${data?.data[0].user?.firstName} ${data?.data[0].user?.lastName}`);
          }
          break;
        }
        case "sendSos": {
          const newOrderList = [data, ...orderList];
          dispatch(setOrderList(newOrderList));
          dispatch(setOrderCount(data.count));
          
          break;
        }
        case "sendSosToGuard": {
          const newOrderList = [data, ...orderList];
          dispatch(setOrderList(newOrderList));
          dispatch(setOrderCount(data.count));
          break;
        }
        case "acceptSos": {
          const newOrderList = orderList.map((order) => {
            if (order.id === data.id) {
              return data;
            } else {
              return order;
            }
          });
          dispatch(setOrderList(newOrderList));
          break;
        }
        case "confirms": {
          dispatch(setRequestList(data.data));
          dispatch(setRequestCount(data.count));
          if (requestCount !== data.count && data.count !== 0) {
            toast.success(`Новый запрос на завершение от агента ${data?.data[0]?.guard?.firstName} ${data?.data[0]?.guard?.lastName}`);
          }
          break;
        }
      }
      ws.current = {
        socket: socket.current,
        sendToGuard,
        sendMessageToUser,
        joinRoom,
        confirm,
      };
    };
  }

  return (
    <WebSocketContext.Provider value={ws.current}>
      {children}
    </WebSocketContext.Provider>
  );
};
