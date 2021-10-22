/** ****************************** Import libs *********************************** */
import React from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

/** ****************************** Import images *********************************** */
import Avator from "../assets/images/avatar.png";
import { postLogoutRequestData } from "../api/create";

const refreshToken = localStorage.getItem("refreshToken");

const logout = async () => {
  await postLogoutRequestData({ refreshToken })
    .then((res) => {
      localStorage.clear();
      window.location.href = "/";
    })
    .catch((err) => {
      console.log(err);
    });
};
const HeaderDropdown = () => (
  <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
    <CDropdownToggle className="c-header-nav-link" caret={ false }>
      <div className="c-avatar">
        <CImg
          src={ Avator }
          className="c-avatar-img"
          alt="admin@bootstrapmaster.com"
        />
      </div>
    </CDropdownToggle>
    <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem to="/home/userProfile">
          <CIcon name="cil-user" className="mfe-2" />
          Profile
        </CDropdownItem>
      <CDropdownItem>
        <CIcon name="cil-settings" className="mfe-2" />
        Settings
      </CDropdownItem>
      <CDropdownItem divider />
      <CDropdownItem onClick={ () => logout() }>
        <CIcon name="cil-lock-locked" className="mfe-2" />
        Log Out
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
);

export default HeaderDropdown;
