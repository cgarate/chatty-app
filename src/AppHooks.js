import React, { useState, useEffect, useRef } from "react";
import {
  ANONYMOUS,
  INCOMING_MESSAGE,
  INCOMING_NOTIFICATION,
  POST_NOTIFICATION,
  MESSAGE_NOTIFICATION,
  CLIENT_COUNT_NOTIFICATION,
} from "./constants";
import MessageList from "./MessageList.jsx";
import Header from "./Header.jsx";
import Chatbar from "./Chatbar.jsx";

const AppWithHooks = () => {
  const [connectedClients, setConnectedClients] = useState(0);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: ANONYMOUS,
    color: "#000000",
  });

  const ws = useRef(new WebSocket("ws://localhost:3001"));
  useEffect(() => {
    ws.current.onmessage = (event) => {
      // Parse the JSON string into an object.
      const data = JSON.parse(event.data);
      console.log('AppHooks event data', data)
      // Check the type of the message received and act accordingly.
      switch (data.type) {
        case INCOMING_MESSAGE:
        case INCOMING_NOTIFICATION:
          setMessages([...messages, data]);
          setConnectedClients(data.userCount);
          break;
        case CLIENT_COUNT_NOTIFICATION:
          setConnectedClients(data.userCount);
          setMessages([...messages, data]);
          break;
        default:
          throw new Error("Unknown event type: " + data.type);
      }
    };
    // eslint-disable-next-line no-console
    ws.current.onerror = (error) => console.log("Error in AppHooks:", error);
    console.log("connectedClients", connectedClients);
  }, [messages, connectedClients]);

  useEffect(() => () => ws.current.close(), [ws]);

  function handleUsername(event) {
    if (event.key === "Enter") {
      const newUser = event.target.value;
      const notificationContent = `User ${currentUser.name} changed their name to ${newUser}`;
      const newNotification = {
        username: newUser,
        content: notificationContent,
        type: POST_NOTIFICATION,
      };
      setCurrentUser({ name: newUser, color: currentUser.color });
      ws.current.send(JSON.stringify(newNotification));
    }
  }

  function handleMessageInput(event) {
    if (event.key === "Enter") {
      const newMessage = {
        username: currentUser.name,
        content: event.target.value,
        type: MESSAGE_NOTIFICATION,
      };
      ws.current.send(JSON.stringify(newMessage));
      event.target.value = "";
    }
  }

  return (
    <div>
      <Header connectedClients={connectedClients} />
      <MessageList messages={messages} userColor={currentUser.userColor} />
      <Chatbar
        currentUser={currentUser}
        handleMessageInput={handleMessageInput}
        handleUsername={handleUsername}
      />
    </div>
  );
};

export default AppWithHooks;
