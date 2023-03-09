import styles from "./ChatBox.module.css";
import { io } from "socket.io-client";
import {
  faPaperPlane,
  faSmile,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const socket = io(process.env.REACT_APP_HOSTX, { withCredentials: true });
socket.on("connect", () => {});
socket.on("sendBack", (arg) => {});

//===============ADD ICON TO LIBRARY================
library.add(faPaperPlane, faSmile, faPaperclip);
const image = process.env.REACT_APP_HOSTX + "/images/person2.jpg";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_HOSTX + "/user/get-user", {
        withCredentials: true,
      })
      .then((value) => {
        socket.emit("start", value.data.email);
      })
      .catch((reason) => {
        console.log(reason);
        navigate("/error");
      });
    socket.on("chat", (arg) => {
      setConversation(arg);
    });
    socket.on("conversation", (arg) => {
      setConversation(arg);
    });
  }, [navigate]);
  useLayoutEffect(() => {
    return () => {
      socket.emit("stopChat", "stopChat");
    };
  }, []);
  const sendMessage = () => {
    if (message) {
      socket.emit("send", { isAdmin: false, message });
      setMessage("");
    }
  };
  return (
    <div className={styles["chat-box"]}>
      <div className={styles["chat-box-top"]}>
        <h3>Customer Support</h3>
        <p>Let's Chat App</p>
      </div>
      <div className={styles["chat-box-mid"]}>
        {conversation?.map((x) => {
          return x.isAdmin ? (
            <div key={Math.random()} className={styles.support}>
              <img src={image} alt="customer support" />
              <p>{x.message}</p>
            </div>
          ) : (
            <p key={Math.random()}>{x.message}</p>
          );
        })}
      </div>
      <div className={styles["chat-box-bottom"]}>
        <img src={image} alt="customer support" />
        <input
          type="text"
          placeholder="Enter Message!"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <FontAwesomeIcon icon={["fas", "paperclip"]} />
        <FontAwesomeIcon icon={["fas", "smile"]} />
        <FontAwesomeIcon
          className={styles.send}
          icon={["fas", "paper-plane"]}
          onClick={sendMessage}
        />
      </div>
    </div>
  );
}
