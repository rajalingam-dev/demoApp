/** ****************************** Import libs *********************************** */
import React from "react";
import { Sidebar, Header, Content } from "./index";

const DefaultLayout = ({ changeHandle, handle }) => (
  <div className="c-app c-default-layout">
    <Sidebar />
    <div className="c-wrapper">
      <Header changeHandle={ changeHandle } />
      <div className="c-body">
        <Content handle={ handle } />
      </div>
    </div>
  </div>
);

export default DefaultLayout;
