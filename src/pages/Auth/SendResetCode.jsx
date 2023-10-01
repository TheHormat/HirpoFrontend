import React from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../../components/images/hirpo_logo.png";
import "./auth.css";
function SendResetCode() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const a = await fetch(
      "http://127.0.0.1:8000/account/SendResetCodeView/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: email }),
      }
    )
      .then((a) => a.json())
      .then((data) => data);

    if (a.Status == "success") {
      const id = a.id;
      nav(`/confirmreset/${id}`);
      // const userId = a.data.id;
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
          <form className="reset" onSubmit={handleSubmit}>
            <legend>
              <p>Reset password</p>
            </legend>
            <p className="activate-text">Please enter your email</p>
            <div className="inputs">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="login">
              Reset Password
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default SendResetCode;
