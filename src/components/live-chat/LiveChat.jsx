import { createPortal } from "react-dom";
import styles from "./LiveChat.module.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import ChatBox from "./ChatBox";

library.add(faFacebookMessenger);

const LiveChatDom = document.getElementById("livechat");

export default function LiveChat() {
  const [showChat, setShowChat] = useState(false);
  //==============HANDLE CHAT BUTTON=================
  const chatHandle = () => {
    setShowChat((state) => {
      return !state;
    });
  };
  return createPortal(
    <div className={styles["live-chat"]}>
      {showChat && <ChatBox />}
      <FontAwesomeIcon
        className={styles.icon}
        onClick={chatHandle}
        icon={["fab", "facebook-messenger"]}
      />
    </div>,
    LiveChatDom
  );
}
