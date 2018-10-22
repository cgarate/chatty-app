import React from 'react';

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
export default Message;
