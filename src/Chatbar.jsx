import React from "react";
import { ANONYMOUS } from "./constants";

const Chatbar = ({ currentUser, handleUsername, handleMessageInput }) => (
  <footer className="chatbar">
    <input
      className="chatbar-username"
      placeholder={ANONYMOUS}
      defaultValue={
        currentUser && currentUser.name !== ANONYMOUS ? currentUser.name : ""
      }
      onKeyPress={handleUsername}
    />

    <input
      className="chatbar-message"
      placeholder="Type a message and hit ENTER"
      onKeyPress={handleMessageInput}
    />
  </footer>
);
export default Chatbar;
