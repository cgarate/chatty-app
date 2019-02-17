import React, { Component } from "react";
import MessageList from "./MessageList.jsx";
import Chatbar from "./Chatbar.jsx";
import UsersOnline from "./UsersOnline.jsx";
import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar";
import { POST_NOTIFICATION, MESSAGE_NOTIFICATION, ANONYMOUS } from './constants';

const defaultData = {
  connectedClients: 0,
  currentUser: { name: ANONYMOUS, color: "#000000" },
  messages: [],
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
  handleMessageInput(event) {
    if (event.key === "Enter") {
      const newMessage = {
        username: this.state.currentUser.name,
        content: event.target.value,
        type: MESSAGE_NOTIFICATION,
      };
      this.socket.send(JSON.stringify(newMessage));
      event.target.value = "";
    }
  }

  // handleUsername(newUser, newNotification) {
  handleUsername(event) {
    if (event.key === "Enter") {
      const newUser = event.target.value;
      const notificationContent = `User ${
        this.state.currentUser.name
      } changed their name to ${newUser}`;
      const newNotification = {
        username: newUser,
        content: notificationContent,
        type: POST_NOTIFICATION,
      };
      this.setState({
        currentUser: { name: newUser, color: this.state.currentUser.color },
      });
      this.socket.send(JSON.stringify(newNotification));
    }
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    console.log("Connected to server");

    //listen for messages coming from the server
    this.socket.onmessage = (event) => {
      console.log("Received a message from the server: ", event.data);
      // Parse the JSON string into an object.
      const data = JSON.parse(event.data);
      const stateMessages = this.state.messages;
      // Check the type of the message received and act accordingly.
      switch (data.type) {
        case "incomingMessage":
        case "incomingNotification":
          this.setState({ messages: [...stateMessages, data] });
          break;
        case "clientCountNotification":
          this.setState({
            connectedClients: data.userCount,
            messages: [...stateMessages, data],
          });
          break;
        default:
          throw new Error("Unknown event type: " + data.type);
      }
    };
    this.socket.onerror = (error) => console.log(error);
  }

  render() {
    return (
      <div>
        <Toolbar style={{ backgroundColor: "#FFE082" }}>
          <ToolbarGroup firstChild={true}>
            <div className="navbar">
              <div className="navbar-brand">
                <ToolbarTitle text="React Chat App" />
              </div>
              <UsersOnline users={this.state.connectedClients} />
            </div>
          </ToolbarGroup>
        </Toolbar>

        <MessageList
          messages={this.state.messages}
          userColor={this.state.currentUser.color}
        />

        <Chatbar
          currentUser={this.state.currentUser}
          handleMessageInput={this.handleMessageInput}
          handleUsername={this.handleUsername}
        />
      </div>
    );
  }
}
export default App;
