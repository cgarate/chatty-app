import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from "./Notification.jsx";

class MessageList extends Component {

  render() {
    console.log("Rendering <MessageList />")
    return (

      <main className="messages">
        {
          this.props.messages.map( (message) =>
          <Message key={message.id} username={message.username} content={message.content} usercolor={message.color} />
          )
        }
        {
          this.props.notifications.map( (notification) =>
          <Notification key={notification.id} content={notification.content} />
          )
        }
      </main>
    )
  }
}
export default MessageList;
