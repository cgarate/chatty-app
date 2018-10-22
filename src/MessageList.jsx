import React from 'react';
import Message from './Message.jsx';
import Notification from "./Notification.jsx";

const MessageList = (props) => (
  <main className="messages">
    {props.messages.map( (message) => {
      if (message.type === "incomingMessage") {
        return <Message key={message.id} username={message.username} content={message.content} usercolor={message.color} />;
      } else if (message.type === "incomingNotification") {
        return <Notification key={message.id} content={message.content} />;
      }
    })}
  </main>
)
export default MessageList;
