/** ****************************** Import libs *********************************** */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CSidebarBrand,
} from "@coreui/react";

/** ****************************** Import sidebar nav config *********************************** */
import { sideMenu } from "../constants/sideNavigation";

/** ****************************** Import Images *********************************** */
import sidebarLogo from "../assets/images/paradigam-sidebar-logo.png";
import sidebarLogoMinimized from "../assets/images/paradigam-sidebar-minimized.png";

/** ****************************** Import Action *********************************** */
import { sidebarMinimizerAction } from "../redux/actions";

/** ****************************** Import CSS *********************************** */
import "./sidebar.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.changeStateReducer.sidebarShow);

  return (
    <CSidebar
      show={ show }
      onShowChange={ (val) => dispatch({ type: "set", sidebarShow: val }) }
      minimize
    >
      <CSidebarBrand className="d-md-down-none" to="/home/dashboard">
        <img
          src={ sidebarLogo }
          alt="sidebarLog"
          width="75%"
          className="c-sidebar-brand-full img-fluid"
        />
        <img
          src={ sidebarLogoMinimized }
          alt="sidebarLogoMinimized"
          className="c-sidebar-brand-minimized img-fluid"
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={ sideMenu }
          components={ {
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          } }
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" onClickCapture={ () => dispatch(sidebarMinimizerAction()) } />
    </CSidebar>
  );
};

export default React.memo(Sidebar);
