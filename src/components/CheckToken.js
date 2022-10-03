import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { STORAGE_KEYS } from "../utils/constants";
import { notification } from "antd";

const CheckToken = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEYS.token) === null) {
      dispatch(logout());
      navigate("/login");
      notification.error({
        placement: "topRight",
        top: 50,
        duration: 3,
        rtl: true,
        message: "Необходимо повторная авторизовация!",
      });
    }
  }, [localStorage.getItem(STORAGE_KEYS.token)]);

  return children;
};

export default CheckToken;
