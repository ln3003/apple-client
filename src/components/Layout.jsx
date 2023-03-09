import { Fragment } from "react";
import Footer from "./footer/Footer";
import LiveChat from "./live-chat/LiveChat";
import NavBar from "./nav-bar/NavBar";
import styles from "./Layout.module.css";

export default function Layout(props) {
  //===============CREATE LAYOUT FOR WEBSITE================
  return (
    <Fragment>
      <LiveChat />
      <div className={styles.center}>
        <NavBar />
        {props.children}
      </div>
      <Footer />
    </Fragment>
  );
}
