import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useNavigate} from "react-router-dom"

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
   let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(passwordAgain.current.value !== password.current.value){
      password.current.setCustomValidity("Password don't match");
    }else{
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("auth/register", user);
          navigate(`/login`);
        
      } catch (error) {
        console.log(error)
      }

    }
  };

  const handleLoginNavigation = () => {
    navigate("/login");
  }

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
              placeholder="Email"
              className="loginInput"
              ref={email}
              required
              type="email"
            />
            <input
              placeholder="Username"
              className="loginInput"
              ref={username}
              required
            />
            <input
              placeholder="Password"
              className="loginInput"
              ref={password}
              required
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              className="loginInput"
              ref={passwordAgain}
              required
              type="password"
            />
            <button className="loginButton" type="submit">Sign Up</button>
            <button className="loginRegister" onClick={handleLoginNavigation}>Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
