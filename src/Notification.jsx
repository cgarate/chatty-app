import React, {Component} from 'react';

class Notification extends Component {
  render() {
    console.log("Rendering <Notification/>")
    return (
      <div className="notification" key={this.props.id}>
        <span className="notification-content">{this.props.content}</span>
      </div>
    )
  }
}
export default Notification;
