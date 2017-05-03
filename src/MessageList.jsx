import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    console.log("Rendering <MessageList />")
    return (

      <main className="messages">
        {
          this.props.messages.map( (message, index) =>
          <Message key={index} username={message.username} content={message.content} />
          )
        }
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    )
  }
}

export default MessageList;
