import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import ArchivePage from "../app/ArchivePage/ArchivePage";
import GuardListPage from "../app/GuardListPage";
import LoginPage from "../app/LoginPage";
import MainPage from "../app/MainPage";
import MapPage from "../app/Map/MapPage";
import Requests from "../app/Requests";
import SignalListPage from "../app/SignalListPage";
import UserListPage from "../app/UserListPage";
import Loader from "../components/Loader/Loader";

const Navigation = () => {
  const { isAuth, loading } = useSelector((state) => state.auth);
  return (
    <>
      <Loader visable={loading} />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute isAuth={isAuth} />}>
            <Route index element={<MainPage />} />
            <Route path="/users" element={<UserListPage />} />
            <Route path="/guards" element={<GuardListPage />} />
            <Route path="/signal" element={<SignalListPage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/map" element={<MapPage />} />
          </Route>
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Router>
    </>
  );
};

const ProtectedRoute = ({ isAuth, redirectPath = "/login" }) => {
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default Navigation;
