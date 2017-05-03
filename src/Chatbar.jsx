import React, {Component} from 'react';
import App from './App.jsx';

class Chatbar extends Component {
  constructor(props) {
      super(props);
      this.handleMessageInputChange = this.handleMessageInputChange.bind(this);
    }

  handleMessageInputChange = (e) => {
    if (e.key === 'Enter') {
      const newMessage = {username: this.props.currentUser.name, content: e.target.value};
      // This function was passed from App (the state owner and parent). We pass the new message object.
      this.props.onMessageInput(newMessage);
      e.target.value = "";
    }
  }

  render() {
    console.log("Rendering <Chatbar />")
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleMessageInputChange} />

      </footer>
    )
  }
}

export default Chatbar;
