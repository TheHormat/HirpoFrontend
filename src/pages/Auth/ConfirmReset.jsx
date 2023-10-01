import React from "react";
import { useState } from "react";
import { useParams, Link, useNavigate,useLocation } from "react-router-dom";
import logo from "../../components/images/hirpo_logo.png";
import "./auth.css";
function ConfirmReset() {
  const nav = useNavigate()
  const { id } = useParams();
  const [resetData, setResetData] = useState({
    password_reset_code: "",
    password: "",
  });
  const handleInput = (e) => {
    setResetData({ ...resetData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const a = await fetch(
      `http://127.0.0.1:8000/account/ChangePasswordVerifyView/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          password: resetData.password,
          password_reset_code: resetData.password_reset_code,
        }),
      }
    )
      .then((a) => a.json())
      .then((data) => data);
if (a.Status == "Success") {
 nav("/")
  // nav("/login", {
  //   state: {
  //     verificationCode: a.data.id,
  //   },
  // });
}
  };
  return (
    <>
      <header>
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
              <Link to="/">Sign in</Link>
            </li>
          </ul>
        </div>
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
          <form onSubmit={handleSubmit} className="verificaation">
            <legend>
              <p>Reset Password</p>
            </legend>
            <p className="activate-text">
              Please check your email and enter the reset code
            </p>
            <div className="inputs">
              <input
                onChange={handleInput}
                name="password_reset_code"
                type="password"
                value={resetData.password_reset_code}
                placeholder="Enter activation code"
              />
              <input
                type="number"
                value={resetData.password}
                placeholder="Password"
                name="password"
                onChange={handleInput}
              />
            </div>
            <button className="login" type="submit">
              Reset password
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ConfirmReset;
