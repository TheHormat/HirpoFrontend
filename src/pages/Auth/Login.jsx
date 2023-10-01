import React from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import refreshToken from "./Refresh";
import "./auth.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

import logo from "../../components/images/hirpo_logo.png";
function Login({ dispatch }) {
  const { userId } = useParams();
  const nav = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = async (e) => {
    e.preventDefault();
    await fetch("http://127.0.0.1:8000/account/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((a) => {
        if (a.ok) {
          return a.json();
        }
        return Promise.reject(a);
      })
      .then((a) => {
        window.localStorage.setItem("access_token", a.access);
        window.localStorage.setItem("refresh_token", a.refresh);
        window.location.replace("/dashboard");
        dispatch({
          type: "SET_USER",
          payload: { ...a.username },
        });
        // nav("/wizard");
      })
      .catch((err) => {
        alert("username or password not correct");
        console.log(err.statusText);
      });
  };
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      <Navigate path="/wizard" />;
    }
  }, []);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <header>
        {/* <div className="container"> */}
        <div className="navbar">
          <div className="logo-team">
            <div className="logo">
              <img src={logo} />
            </div>
            <div className="logo-text-blue">
              <p>Hirpo</p>
            </div>
          </div>
          <ul className="nav">
            <li>
              <Link to="/">Hirpo</Link>
            </li>
            <li>
              <a href="#">Pricing & Bills</a>
            </li>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
          </ul>
        </div>

        {/* </div> */}
      </header>
      <section className="hero">
        <div className="hero-left">
          <div className="hero-left-text">
            <p>HIRPO</p>
            <p>READY AND EASY TO USE</p>
            <p>
              PERFORMANCE MANAGEMENT <br />
              SOLUTİONS.
            </p>
          </div>
        </div>
        <div className="hero-right">
          <form onSubmit={login}>
            <legend>
              <p>Login Account</p>
            </legend>
            <div className="inputs">
              <input
                placeholder="Enter your work username"
                onChange={handleChange}
                name="username"
                value={user.username}
              />
              <div style={{position: "relative"}}>
                <input
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={user.password}
                />
                <button
                  type="button"
                  className="toggle-password-visibility"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>
            </div>
            <button className="forgot" type="submit">
              <Link to="/sendresetcode">Forgot your password?</Link>
            </button>
            <button className="login">Login</button>
          </form>
        </div>
      </section>
    </>
  );
}

const t = (a) => a;
export default connect(t)(Login);
