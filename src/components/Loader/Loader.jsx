import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import classes from "./Loader.module.css";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const Loader = () => (
  <div className={classes.loader}>
    <Spin indicator={antIcon} />
  </div>
);

export default Loader;
