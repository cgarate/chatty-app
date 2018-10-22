import React from 'react';

const Notification = (props) => (
  <div className="notification" key={props.id}>
    <span className="notification-content">{props.content}</span>
  </div>
)

export default Notification;
