// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from "react";
import ReactDOM from "react-dom";
import AppHooks from "./AppHooks";

ReactDOM.render(<AppHooks />, document.getElementById("react-root"));
