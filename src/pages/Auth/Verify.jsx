import React from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./auth.css";
// import { useLocation } from "react-router-dom";
import logo from "../../components/images/hirpo_logo.png";
const Verify = () => {
  const nav = useNavigate();
  // const { state } = useLocation();
  const { userId } = useParams();
  const [activation_code, setActivation_code] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const a = await fetch(`http://127.0.0.1:8000/account/verify/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ activation_code: activation_code }),
    })
      .then((a) => a.json())
      .then((data) => data);
    if (a.Status == "success") {
      nav("/");
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
              <p>Activate your account</p>
            </legend>
            <p className="activate-text">
              Please check your email and enter the 6-digit code
            </p>
            <div className="inputs">
              <input
                type="number"
                placeholder="Enter activation code"
                value={activation_code}
                onChange={(e) => setActivation_code(e.target.value)}
              />
            </div>
            <button className="login" type="submit">
              Activate my account
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Verify;
