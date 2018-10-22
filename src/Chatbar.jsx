import React from 'react';

const Chatbar = (props) => (
  <footer className = "chatbar">
    <input  className = "chatbar-username"
            placeholder = "Your Name (Optional)"
            defaultValue = {props.currentUser.name}
            onKeyPress = {props.handleUsername}
            />

    <input className = "chatbar-message"
            placeholder = "Type a message and hit ENTER"
            onKeyPress = {props.handleMessageInput} />
  </footer>
)
export default Chatbar;
