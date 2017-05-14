import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from "./Notification.jsx";

class MessageList extends Component {

  render() {
    console.log("Rendering <MessageList />")
    return (
      <main className="messages">
        {this.props.messages.map( (message) => {
          if (message.type === "incomingMessage") {
            return <Message key={message.id} username={message.username} content={message.content} usercolor={message.color} />;
          } else if (message.type === "incomingNotification") {
            return <Notification key={message.id} content={message.content} />;
          }
        })}
      </main>
    )
  }
}
export default MessageList;
