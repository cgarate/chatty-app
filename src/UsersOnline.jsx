import React, {Component} from 'react';

class UsersOnline extends Component {
  render() {
    console.log("Rendering <UsersOnline/>")
    return (
      <div className="usersOnline">
        <span>{this.props.users} User(s) online</span>
      </div>
    )
  }
}
export default UsersOnline;
