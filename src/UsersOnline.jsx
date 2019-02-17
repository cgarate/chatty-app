import React from "react";
import Badge from "material-ui/Badge";
import IconButton from "material-ui/IconButton";
import AccountBoxIcon from "material-ui/svg-icons/action/account-box";

const styles = {
  smallIcon: {
    width: 36,
    height: 36,
  },
  mediumIcon: {
    width: 48,
    height: 48,
  },
  largeIcon: {
    width: 60,
    height: 60,
  },
  small: {
    width: 72,
    height: 72,
    padding: 16,
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24,
  },
  large: {
    width: 120,
    height: 120,
    padding: 30,
  },
};

const UsersOnline = ({ users }) => (
  <div className="usersOnline">
    <Badge
      badgeContent={users}
      primary={true}
      badgeStyle={{ top: 0, right: 0 }}
      style={{ padding: 0, right: 15 }}
    >
      <IconButton
        iconStyle={styles.smallIcon}
        style={styles.small}
        tooltip="Users Online now!"
        touch={true}
      >
        <AccountBoxIcon />
      </IconButton>
    </Badge>
  </div>
);
export default UsersOnline;
