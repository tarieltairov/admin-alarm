import React, { createContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineGuards, setOrderCount, setOrderList } from "../store/slices/socketSlice";

const URL = process.env.REACT_APP_BASE_URL;

const WebSocketContext = createContext(null);

export { WebSocketContext };

export default ({ children }) => {
  const { order, orderCount, orderList } = useSelector((state) => state.socket);
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let socket = useRef(null);
  let ws = useRef(null);

  const sendToGuard = ({ alarmId, guardId }) => {
    const message = JSON.stringify({
      event: "sendSosToGuard",
      data: {
        alarmId,
        guardId,
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
          // console.log("getAll", data);
          dispatch(setOrderList(data.data));
          dispatch(setOrderCount(data.count));
          break;
        }
        case "sendSos": {
          // console.log("sendSos", data);
          const newOrderList = [data, ...orderList];
          dispatch(setOrderList(newOrderList));
          dispatch(setOrderCount(orderCount + 1));
          break;
        }
        case "sendSosToGuard": {
          const newOrderList = [data, ...orderList];
          dispatch(setOrderList(newOrderList));
          dispatch(setOrderCount(orderCount - 1));
          break;
        }
        case "acceptSos": {
          // console.log("acceptSos", data);
          const newOrderList = orderList.map((order) => {
            if (order.id === data.id) {
              return data;
            } else {
              return order;
            }
          });
          console.log(newOrderList);
          dispatch(setOrderList(newOrderList));
          break;
        }
      }
      ws.current = {
        socket: socket.current,
        sendToGuard,
      };
    };
  }

  return (
    <WebSocketContext.Provider value={ws.current}>
      {children}
    </WebSocketContext.Provider>
  );
};
