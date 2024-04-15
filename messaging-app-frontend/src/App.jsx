import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";

import "./App.css";

import { AuthProvider } from "./context/authContext";

function App() {
  // const [isAuth, setIsAuth] = useState(false);
  // const [user, setUser] = useState();
  // const [allChats, setAllChats] = useState([]);
  // const [allUsers, setAllUsers] = useState([]);
  return (
    <div>
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

        {/* <Route path="/user" element={<Profile />} />
        <Route path="/chat/:chatID" element={<Chat />} /> */}

        {/* <Route
          exact
          path="/"
          element={
            isAuth ? (
              <Chat
                isAuth={isAuth}
                setIsAuth={setIsAuth}
                user={user}
                setUser={setUser}
                allChats={allChats}
                setAllChats={setAllChats}
                allUsers={allUsers}
                setAllUsers={setAllUsers}
              />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        ></Route>
        <Route
          path="/login"
          element={
            isAuth ? (
              <Navigate to={"/"} />
            ) : (
              <Login
                isAuth={isAuth}
                setIsAuth={setIsAuth}
                user={user}
                setUser={setUser}
              />
            )
          }
        ></Route>
        <Route
          path="/signup"
          element={isAuth ? <Navigate to={"/"} /> : <Signup />}
        ></Route>

        <Route path="/user/:id" element={<Profile />}></Route>
        <Route path="/chat/:id" element={<Chat />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
