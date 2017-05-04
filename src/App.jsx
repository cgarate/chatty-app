import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Chatbar from './Chatbar.jsx';

const defaultData = {
  currentUser: {name: "Bob"},
  messages: [],
  notifications: []
};

class App extends Component {
  constructor(props) {
    super(props);
    // Initialize the state of this component with the default data object above.
    this.state = defaultData;
    this.socket = "";
    // Bind the function to handle the status change from the child.
    this.handleMessageInput = this.handleMessageInput.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
  }

  // This function will be passed to the chatbar as a props.
  // Chatbar will call it after handling the event locally with its own local function.
  handleMessageInput(newMessage) {
      // Add type
      newMessage.type = "postMessage";
      this.socket.send(JSON.stringify(newMessage));
    //const messages = this.state.messages.concat(newMessage)
    //this.setState({messages: messages})
  }

  handleUsername(newUser, newNotification) {
    this.setState({currentUser: newUser});
    newNotification.type = "postNotification";
    this.socket.send(JSON.stringify(newNotification));
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    console.log("Connected to server")

    this.socket.onmessage = (event) => {
      console.log("Received a message from the server: ", event.data);
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "incomingMessage":
          const messages = this.state.messages.concat(event.data)
          this.setState({messages: messages})
          break;
        case "incomingNotification":
          const notifications = this.state.notifications.concat(event.data)
          this.setState({notifications: notifications})
          break;
        default:
          throw new Error("Unknown event type: " + data.type);
      }
    };
    this.socket.onerror = (error) => console.log(error);
  }

  render() {
    console.log("Rendering <App/>")
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList  messages = {this.state.messages}
                      notifications = {this.state.notifications}
         />
        <Chatbar currentUser = {this.state.currentUser}
                 onMessageInput = {this.handleMessageInput}
                 onUsernameChange = {this.handleUsername}
        />
      </div>
    );
  }
}
export default App;
