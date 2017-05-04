import React, {Component} from 'react';
import App from './App.jsx';

class Chatbar extends Component {
  constructor(props) {
      super(props);
      this.handleMessageInputChange = this.handleMessageInputChange.bind(this);
      this.handleUsernameInputChange = this.handleUsernameInputChange.bind(this);
      this.handleUsernameInputBlur = this.handleUsernameInputBlur.bind(this);
    }

  handleMessageInputChange = (e) => {
    if (e.key === 'Enter') {
      //const newMessage = {username: this.props.currentUser.name, content: e.target.value};
      const newMessage = {username: this.props.currentUser.name, content: e.target.value};
      JSON.stringify(newMessage);
      // This function was passed from App (the state owner and parent). We pass the new message object.
      this.props.onMessageInput(newMessage);
      e.target.value = "";
    }
  }

  handleUsernameInputChange = (e) => {
    if (e.key === 'Enter') {
      const newUser = {name: e.target.value};
      // This function was passed from App (the state owner and parent). We pass the new User object.
      this.props.onUsernameChange(newUser);
    }
  }

  handleUsernameInputBlur = (e) => {
      const newUser = {name: e.target.value};
      console.log(this.props.currentUser.name);
      const notificationContent = `User ${this.props.currentUser.name} changed their name to ${e.target.value}`;
      const newNotification = {content: notificationContent};
      //JSON.stringify(newNotification);
      // This function was passed from App (the state owner and parent). We pass the new User object.
      this.props.onUsernameChange(newUser, newNotification);
  }

  render() {
    console.log("Rendering <Chatbar />")
    return (
      <footer className = "chatbar">
        <input  className = "chatbar-username"
                placeholder = "Your Name (Optional)"
                defaultValue = {this.props.currentUser.name}
                onKeyPress = {this.handleUsernameInputChange}
                onBlur = {this.handleUsernameInputBlur} />

        <input className = "chatbar-message"
               placeholder = "Type a message and hit ENTER"
               onKeyPress = {this.handleMessageInputChange} />

      </footer>
    )
  }
}

export default Chatbar;
