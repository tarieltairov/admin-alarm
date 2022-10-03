import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ArchivePage from "../app/ArchivePage/ArchivePage";
import GuardListPage from "../app/GuardListPage";
import LoginPage from "../app/LoginPage";
import MainPage from "../app/MainPage";
import MapPage from "../app/Map/MapPage";
import Requests from "../app/Requests";
import SignalListPage from "../app/SignalListPage";
import UserListPage from "../app/UserListPage";
import CheckToken from "../components/CheckToken";
import Loader from "../components/Loader/Loader";

const Navigation = () => {
  const { loading } = useSelector((state) => state.auth);

  return (
    <>
      <Loader visable={loading} />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<CheckToken><MainPage /></CheckToken>} />
          <Route path="/users" element={<CheckToken><UserListPage /></CheckToken>} />
          <Route path="/guards" element={<CheckToken><GuardListPage /></CheckToken>} />
          <Route path="/signal" element={<CheckToken><SignalListPage /></CheckToken>} />
          <Route path="/archive" element={<CheckToken><ArchivePage /></CheckToken>} />
          <Route path="/requests" element={<CheckToken><Requests /></CheckToken>} />
          <Route path="/map" element={<CheckToken><MapPage /></CheckToken>} />
          <Route path="*" element={<CheckToken><p>There's nothing here: 404!</p></CheckToken>} />
        </Routes>
      </Router>
    </>
  );
};


export default Navigation;
