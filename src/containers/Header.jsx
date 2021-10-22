/** ****************************** Import libs *********************************** */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CBreadcrumbRouter,
  CSelect,
} from "@coreui/react";
import { HeaderDropdown, HeaderDropdownNotif } from ".";

/** ****************************** Import routes *********************************** */
import routes from "../constants/routes";

/** ****************************** Import CSS *********************************** */
import "./header.css";

const Header = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector(
    (state) => state.changeStateReducer.sidebarShow,
  );

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={ toggleSidebarMobile }
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={ toggleSidebar }
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CSelect
          id="role"
          className="inputFocus roleSelect"
          placeholder="Role"
          name="role"
        >
          <option value="">Choose</option>
          <option>Super Admin</option>
          {/* <option>User</option>
          <option>Human Resource</option> */}
        </CSelect>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0"
          routes={ routes }
        />
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <HeaderDropdownNotif />
        <HeaderDropdown />
      </CHeaderNav>
    </CHeader>
  );
};


export default Header;
