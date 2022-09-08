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

const URL = process.env.REACT_APP_BASE_URL;

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
          break;
        }
        case "sendSos": {
          const newOrderList = [data, ...orderList];
          dispatch(setOrderList(newOrderList));
          dispatch(setOrderCount(data.count));
          if (orderCount !== data.count && data.count !== 0) {
            toast.error("У вас новый запрос SOS");
          }
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
            toast.warning("У вас новый запрос на завершение");
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
