import "./login.css";
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import {CircularProgress} from "@mui/material"

export default function Login() {
  const email = useRef();
  const password = useRef();
  const {user, isFetching, error, dispatch} = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall({email: email.current.value,password: password.current.value},dispatch);
    console.log(user);

  };



  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">ShihamSocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on ShihamSocial
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              ref={password}
              required
              minLength="6"
            />
            <button className="loginButton" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress
                  size={"20px"}
                  sx={{ color: "white", fontSize: "15px" }}
                />
              ) : (
                "Login"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegister" disabled={isFetching}>
              Create new Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
