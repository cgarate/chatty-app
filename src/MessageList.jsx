import React from "react";
import Message from "./Message.jsx";
import Notification from "./Notification.jsx";
import {
  CLIENT_COUNT_NOTIFICATION,
  INCOMING_MESSAGE,
  INCOMING_NOTIFICATION,
} from "./constants";

const MessageList = ({ messages }) => (
  <main className="messages">
    {messages.map((message) => {
      if (message.type === INCOMING_MESSAGE) {
        return (
          <Message
            key={message.id}
            username={message.username}
            content={message.content}
            usercolor={message.color}
          />
        );
      } else if (
        message.type === INCOMING_NOTIFICATION ||
        CLIENT_COUNT_NOTIFICATION
      ) {
        return <Notification key={message.id} content={message.content} />;
      }
    })}
  </main>
);
export default MessageList;
