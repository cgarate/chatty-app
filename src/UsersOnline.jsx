import React from "react";
import PropTypes from "prop-types";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

const UsersOnline = ({ users }) => {
  return (
    <div className="usersOnline">
      <Badge badgeContent={users}>
        <IconButton size="small">
          <AccountBoxIcon />
        </IconButton>
      </Badge>
    </div>
  );
};

UsersOnline.propTypes = {
  users: PropTypes.number,
};
export default UsersOnline;
