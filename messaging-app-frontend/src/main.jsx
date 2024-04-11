import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

/*

Layout of the web page:
1. Landing page
2. sign up 
3. log in
4. chat page
5. profile page

small components:
1. nav (icon, (log in, sign up) / (chat, log out))
2. footer (product of GP)
*/
// https://www.youtube.com/watch?v=SDMs2Pq6w90

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
