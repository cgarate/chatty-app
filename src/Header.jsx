/* eslint-disable quotes */
import React from "react";
import PropTypes from "prop-types";

import UsersOnline from "./UsersOnline.jsx";
import { Toolbar, Typography, AppBar } from "@material-ui/core";

const Header = ({ connectedClients }) => {
  console.log("connectedClients", connectedClients);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Chatty App
        </Typography>
        <UsersOnline users={connectedClients} />
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  connectedClients: PropTypes.number,
};

export default Header;
