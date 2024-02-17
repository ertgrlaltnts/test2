import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";

import { withTranslation } from "react-i18next";

const AppsDropdown = () => {
const [singlebtn, setSinglebtn] = useState(false);

  return(
    <React.Fragment>
        <Dropdown
          isOpen={singlebtn}
          toggle={() => setSinglebtn(!singlebtn)}
          className="dropdown d-inline-block ms-1"
          tag="li"
        >
          <DropdownToggle
            className="btn header-item noti-icon waves-effect"
            tag="button"
            id="page-header-notifications-dropdown"
          >
            <i className="ri-apps-2-line"></i>

          </DropdownToggle>

          <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end">

          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
  )
}

export default withTranslation()(AppsDropdown);