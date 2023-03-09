import styles from "./NavBar.module.css";
import {
  faCartShopping,
  faUser,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
//===============ADD ICON TO LIBRARY================
library.add(faCartShopping, faUser, faSortDown);

export default function NavBar() {
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  //===============GET CURRENT USER FROM LOCAL STORAGE================
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_HOSTX + "/user/get-user", {
        withCredentials: true,
      })
      .then((value) => {
        setCurrentUser(value.data);
      })
      .catch((reason) => {
        console.log(reason);
        navigate("/error");
      });
  }, [navigate]);
  //==============HANDLE LOGOUT BUTTON=================
  const logoutHandle = () => {
    localStorage.removeItem("currentUser");
    axios
      .get(process.env.REACT_APP_HOSTX + "/user/logout", {
        withCredentials: true,
      })
      .then((value) => {})
      .catch((reason) => {
        console.log(reason);
        navigate("/error");
      });
    setCurrentUser("");
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };
  console.log(currentUser);
  return (
    <nav className={styles["nav-bar"]}>
      <div className={styles["nav-bar-left"]}>
        <p
          className={location.pathname === "/" ? styles.active : ""}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </p>
        <p
          className={location.pathname === "/shop" ? styles.active : ""}
          onClick={() => {
            navigate("/shop");
          }}
        >
          Shop
        </p>
      </div>
      <h1>BOUTIQUE</h1>
      <div className={styles["nav-bar-right"]}>
        <FontAwesomeIcon
          className={styles["nav-icon"]}
          icon={["fas", "cart-shopping"]}
        />
        <p
          onClick={() => {
            navigate("/cart");
          }}
          className={styles.cart}
        >
          Cart
        </p>
        <FontAwesomeIcon
          className={styles["nav-icon"]}
          icon={["fas", "user"]}
        />
        {currentUser ? (
          <p>
            {currentUser.name}&nbsp;
            <FontAwesomeIcon
              className={styles["nav-icon"]}
              icon={["fas", "sort-down"]}
            />
            &nbsp;
          </p>
        ) : (
          <p
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </p>
        )}
        {currentUser && <p onClick={logoutHandle}>{"( Logout )"}</p>}
      </div>
    </nav>
  );
}
