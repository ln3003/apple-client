import styles from "./SignIn.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { onLogin } from "../../store/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  //==============EMAIL INPUT, CHECK ERROR=================
  const [emailValue, setEmailValue] = useState("");
  //==============PASSWORD INPUT, CHECK ERROR=================
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState([]);
  const dispatch = useDispatch();
  const image = process.env.REACT_APP_HOSTX + "/images/banner1.jpg";
  //==============HANDLE SUBMIT FORM=================
  const submitHandle = (e) => {
    e.preventDefault();
    axios
      .post(
        process.env.REACT_APP_HOSTX + "/user/login",
        {
          email: emailValue,
          password: passwordValue,
        },
        { withCredentials: true }
      )
      .then((value) => {
        dispatch(onLogin());
        navigate("/");
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
        <h1>Sign In</h1>
        <div>
          {error?.length === 0
            ? ""
            : error?.map((x) => {
                return <p key={x.param}>{x.msg}</p>;
              })}
        </div>
        <form onSubmit={submitHandle}>
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
          <button>SIGN IN</button>
        </form>
        <p>
          Create an account?{" "}
          <span
            onClick={() => {
              navigate("/register");
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
