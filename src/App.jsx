import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Chatbar from './Chatbar.jsx';

const defaultData = {
  currentUser: {name: "Bob"},
  messages: [{
    id: 1,
    username: "Bob",
    content: "Has anyone seen my marbles?"
  },
  {
    id: 2,
    username: "Anonymous1",
    content:  "No, I think you lost them. You lost your marbles Bob. You lost them for good."
  }]
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = defaultData;
  }

  render() {
    console.log("Rendering <App/>")
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList  messages = {this.state.messages} />
        <Chatbar currentUser = {this.state.currentUser} />
      </div>
    );
  }
}
export default App;
