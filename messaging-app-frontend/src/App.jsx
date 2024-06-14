import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";

import "./App.css";

import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <AuthProvider>
              <Login />
            </AuthProvider>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthProvider>
              <Signup />
            </AuthProvider>
          }
        />

        {/* Dashboard to display all conversations and users */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat/:id" element={<Chat />} />

        <Route path="/user" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
