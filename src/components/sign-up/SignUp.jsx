import styles from "./SignUp.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  //===============FULL NAME INPUT================
  const [nameValue, setNameValue] = useState("");
  //===============EMAIL INPUT================
  const [emailValue, setEmailValue] = useState("");
  //===============PASSWORD INPUT================
  const [passwordValue, setPasswordValue] = useState("");
  //===============PHONE INPUT================
  const [telValue, setTelValue] = useState("");
  const [error, setError] = useState([]);
  const image = process.env.REACT_APP_HOSTX + "/images/banner1.jpg";
  //==============HANDLE SUBMIT FORM=================
  const submitHandle = (e) => {
    e.preventDefault();
    axios
      .post(
        process.env.REACT_APP_HOSTX + "/user/signup",
        {
          name: nameValue,
          email: emailValue,
          password: passwordValue,
          tel: telValue,
        },
        { withCredentials: true }
      )
      .then((value) => {
        navigate("/login");
      })
      .catch((reason) => {
        setError(reason.response.data.errors);
      });
  };
  //===============HANDLE KEYBOARD================
  const keyDownHandle = (e) => {
    if (e.key === "enter") {
      submitHandle();
    }
  };
  return (
    <div onKeyDown={keyDownHandle} className={styles["sign-up"]}>
      <div className={styles["center-box"]}>
        <h1>Sign Up</h1>
        <div>
          {error.length === 0
            ? ""
            : error.map((x) => {
                return <p key={x.param}>{x.msg}</p>;
              })}
        </div>
        <form onSubmit={submitHandle}>
          <input
            type="text"
            placeholder="Full Name"
            onChange={(event) => {
              setNameValue(event.target.value);
            }}
            value={nameValue}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(event) => {
              setEmailValue(event.target.value);
            }}
            value={emailValue}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(event) => {
              setPasswordValue(event.target.value);
            }}
            value={passwordValue}
          />
          <input
            type="tel"
            placeholder="Phone"
            onChange={(event) => {
              setTelValue(event.target.value);
            }}
            value={telValue}
          />
          <button>SIGN UP</button>
        </form>
        <p>
          Login?{" "}
          <span
            onClick={() => {
              navigate("/login");
            }}
          >
            Click
          </span>
        </p>
      </div>
      <img src={image} alt="" />
    </div>
  );
}
