import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Chatbar from './Chatbar.jsx';
import UsersOnline from './UsersOnline.jsx'

const defaultData = {
  connectedClients: 0,
  currentUser: {name: "Carlos", color: "#000000"},
  messages: []
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
  }

  handleUsername(newUser, newNotification) {
    let newCurrentUser = this.state.currentUser;
    newCurrentUser.name = newUser;
    this.setState({currentUser: newCurrentUser});

    newNotification.type = "postNotification";
    this.socket.send(JSON.stringify(newNotification));
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    console.log("Connected to server")

    //listen for messages coming from the server
    this.socket.onmessage = (event) => {
      console.log("Received a message from the server: ", event.data);
      // Parse the JSON string into an object.
      const data = JSON.parse(event.data);

      // Check the type of the message received and act accordingly.
      switch (data.type) {
        case "incomingMessage":
        case "incomingNotification":
          const messages = this.state.messages.concat(data)
          this.setState({messages: messages})
          break;
        case "clientCountNotification":
          this.setState({connectedClients: data.content})
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
          <UsersOnline users = {this.state.connectedClients} />
        </nav>
        <MessageList  messages = {this.state.messages}
                      userColor = {this.state.currentUser.color}
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
