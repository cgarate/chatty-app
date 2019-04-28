import React from "react";
import PropTypes from 'prop-types';

const Notification = ({ id, content }) => (
  <div className="notification" key={id}>
    <span className="notification-content">{content}</span>
  </div>
);

Notification.propTypes = {
  id: PropTypes.string,
  content: PropTypes.string,
}

export default Notification;
