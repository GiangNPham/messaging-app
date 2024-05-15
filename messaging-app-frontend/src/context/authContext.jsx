import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticateUser = async () => {
    try {
      const res = await axios.get("http://localhost:3001/auth/reauth");
      // const res = await fetch("http://localhost:3001/auth/reauth", {
      //   method: "GET",
      //   credentials: "include",
      // });

      // const data = await res.json();
      // console.log(data);

      if (res.status === 200) {
        setIsAuthenticated(true);
      } else setIsAuthenticated(false);
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
