import React, {Component} from 'react';


class Message extends Component {

  render() {
    console.log("Rendering <Message/>")
    const userStyle = {
      color: `${this.props.usercolor}`
    };
    return (
      <div className="message" key={this.props.id}>
        <span style={userStyle} className="message-username">{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
    )
  }
}
export default Message;
