import React from "react";
import "./layout.css";
import Sidebar from "../sidebar/Sidebar";
import Routes from "../Routes";
import { BrowserRouter, Route } from "react-router-dom";

const Layout = () => {
  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <div>
            <Sidebar {...props} />
            <div className="layout__content-main">
              <div className="layout__content">
                <Routes />
              </div>
            </div>
          </div>
        )}
      />
    </BrowserRouter>
  );
};

export default Layout;
