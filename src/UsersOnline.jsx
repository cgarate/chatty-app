import React, {Component} from 'react';

class UsersOnline extends Component {
  render() {
    console.log("Rendering <UsersOnline/>")
    return (
      <div>
        <span>{this.props.users} Users online</span>
      </div>
    )
  }
}
export default UsersOnline;
