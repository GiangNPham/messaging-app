import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logoutHandler = async function (e) {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3001/auth/logout`, {
        method: "GET",
        withCredntials: true,
        credentials: "include",
      });
      // const data = await res.json();
      if (res.status === 200) {
        // console.log(data);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <nav className="fixed flex w-full justify-between bg-background text-primary border-b-2 border-accent pb-5 pt-8 top-0 ">
      <Link to="/" className="text-primary font-bold text-4xl ml-40">
        Messenger <i className="text-lg">by GP</i>
      </Link>
      <ul className="flex mr-40 text-xl">
        <li>
          <Link to="/dashboard">
            <FontAwesomeIcon icon={faHouse} className="mr-10" />
          </Link>
        </li>
        <li>
          <Link to="/user">
            <FontAwesomeIcon icon={faUser} className="mr-10" />
          </Link>
        </li>

        <li>
          <button onClick={logoutHandler}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        </li>
      </ul>
    </nav>
  );
}
