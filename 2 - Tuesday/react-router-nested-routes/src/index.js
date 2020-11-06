import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";

const info = [
  {
    id: "rendering",
    title: "Rendering with React",
    info: "This is about rendering",
  },
  {
    id: "components",
    title: "Components",
    info: "Something about components, ....",
  },
  {
    id: "props-v-state",
    title: "Props v. State",
    info: "Info about props and state",
  },
  {
    id: "hooks",
    title: "Hooks",
    info: "Info about Hook functions",
  },
  {
    id: "general",
    title: "General",
    info: "General info about React",
  },
];

ReactDOM.render(
  <React.StrictMode>
    <App info={info} />
  </React.StrictMode>,
  document.getElementById("root")
  );
  