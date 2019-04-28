import React from 'react';
import { stringify } from 'querystring';
import PropTypes from 'prop-types';

const Message = ({ usercolor, content, id, username }) => {
  const userStyle = {
    color: `${usercolor}`
  }
  return (
    <div className="message" key={id}>
      <span style={userStyle} className="message-username">{username}</span>
      <span className="message-content">{content}</span>
    </div>
  )
}

Message.propTypes = {
  usercolor: PropTypes.string,
  content: PropTypes.string,
  id: PropTypes.string,
  username: PropTypes.string,
}

export default Message;
