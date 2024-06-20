import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";

import "./App.css";

import AppLayout from "./Layout";
import RouteGuard from "./utils/RouteGuard";

function App() {
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Dashboard to display all conversations and users */}

          <Route path="/" element={<AppLayout />}>
            <Route element={<RouteGuard />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="chat/:id" element={<Chat />} />
              <Route path="user" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
