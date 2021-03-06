// server.js

const express = require("express");
const SocketServer = require("ws").Server;

// Generate a v1 UUID (time-based)
const uuidV1 = require("uuid/v1");

// Set the port to 3001
const PORT = 3001;

// String Constants
const USER_LEFT = "left";
const USER_ARRIVED = "joined";
const POST_NOTIFICATION = "postNotification";
const POST_MESSAGE = "postMessage";
const INCOMING_NOTIFICATION = "incomingNotification";
const INCOMING_MESSAGE = "incomingMessage";
const CLIENT_COUNT_NOTIFICATION = "clientCountNotification";

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`),
  );

// Create the WebSockets server
const wss = new SocketServer({ server });
let countMessage = "";

// Random color RGB to be assigned to each connected user.
function randomColor() {
  const rand255 = () => {
    return Math.floor(Math.random() * 255);
  };
  return `rgb(${rand255()},${rand255()},${rand255()})`;
}

const broadcast = (message) => {
  // Broadcast to everyone else.
  wss.clients.forEach(function(client) {
    client.send(JSON.stringify(message));
  });
};

const setUserCountNotificationMessage = (action) =>
  `A user just ${action} the chat`;

const updateCurrentClientCount = (clientsConnected, notification) => {
  const guid = uuidV1();
  countMessage = {
    userCount: clientsConnected,
    content: notification,
    type: CLIENT_COUNT_NOTIFICATION,
    id: guid,
  };
  broadcast(countMessage);
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on("connection", (ws) => {
  //Assign a random colour to users. Saved as part of the websocket (client connection) object.
  ws.color = randomColor();
  // Send number of clients connected.
  updateCurrentClientCount(
    wss.clients.size,
    setUserCountNotificationMessage(USER_ARRIVED),
  );

  ws.on("message", function incoming(message) {
    // Since this came as an Object, we JSON stringified on the react end and we JSON parse here.
    let parsedMsg = JSON.parse(message);
    switch (parsedMsg.type) {
      // The client posted a message
      case POST_MESSAGE:
        // we change the type of the message to incoming before broadcasting to everybody.
        parsedMsg.type = INCOMING_MESSAGE;
        parsedMsg.color = ws.color; // send back the color assigned to the client connection (user)
        break;
      // The client sent a notification.
      case POST_NOTIFICATION:
        // Change the type before broadcasting to everybody.
        parsedMsg.type = INCOMING_NOTIFICATION;
        break;
    }
    // Generate a uuid, this will be used to give a unique id to the elements rendered.
    const guid = uuidV1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'
    parsedMsg.id = guid;
    //Broadcast the message to the clients.
    broadcast(parsedMsg);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", function() {
    updateCurrentClientCount(
      wss.clients.size,
      setUserCountNotificationMessage(USER_LEFT),
    );
  });
  // Catch errors
  ws.on("error", (Error) => console.error(Error));
});
