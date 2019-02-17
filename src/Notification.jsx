import React from "react";

const Notification = ({ id, content }) => (
  <div className="notification" key={id}>
    <span className="notification-content">{content}</span>
  </div>
);

export default Notification;
