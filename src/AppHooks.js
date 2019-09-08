import React, { useState, useEffect } from "react";
import { ANONYMOUS } from "./constants";
import MessageList from "./MessageList";

const AppWithHooks = (props) => {
  const [connectedClients, setConnectedClients] = useState(0);
  const [currentUser, setCurrentUser] = useState({name: ANONYMOUS, color: "#000000"})
  const [messages, setMessage] = useState([]);

  useEffect(() => {
    
  })

  return (
    <Header connectedClients={connectedClients} />
    <MessageList messages={messages} userColor={currentUser.userColor} />
    <Chatbar currentUser={currentUser} />
  )

};
