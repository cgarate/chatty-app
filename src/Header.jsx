/* eslint-disable quotes */
import React from "react";
import PropTypes from "prop-types";

import UsersOnline from "./UsersOnline.jsx";
import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar";

const Header = ({connectedClients}) => (
  <Toolbar style={{ backgroundColor: "#FFE082" }}>
    <ToolbarGroup firstChild={true}>
      <div className="navbar">
        <div className="navbar-brand">
          <ToolbarTitle text="Chatty App" />
        </div>
        <UsersOnline users={connectedClients} />
      </div>
    </ToolbarGroup>
  </Toolbar>
);

Header.propTypes = {
  connectedClients: PropTypes.number,
};

export default Header;
