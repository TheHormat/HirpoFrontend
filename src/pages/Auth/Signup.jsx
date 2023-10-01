import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../components/images/hirpo_logo.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./auth.css";
// import { useParams } from "react-router-dom";
function Signup() {
  // const { verificationCode } = useParams();
  const nav = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [signForm, setSignForm] = useState({
    username: "",
    email: "",
    password: "",
    matchPassword: "",
    firstName: "",
    lastName: "",
  });
  const handleInput = (e) => {
    setSignForm({ ...signForm, [e.target.name]: e.target.value });
  };
  const [errorSign, setErrorSign] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const a = await fetch("http://127.0.0.1:8000/account/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: signForm.username,
        email: signForm.email,
        password: signForm.password,
        matchPassword: signForm.matchPassword,
        firstName: signForm.firstName,
        lastName: signForm.lastName,
      }),
    })
      .then((a) => a.json())
      .then((data) => data);
    if (a.username) {
      setErrorSign(a.username);
    }
    if (a.non_field_errors) {
      alert(a.non_field_errors[0]);
    }
    if (a.email == "MyUser with this email already exists.") {
      console.log("bu user var");
    }
    if (a.Status == "success") {
      const userId = a.data.id;
      // nav(`/verify/${userId}`);
      nav("/");
      // nav("/login", {
      //   state: {
      //     verificationCode: a.data.id,
      //   },
      // });
    }
    let error = a.username;
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
          <form onSubmit={onSubmit}>
            <legend>
              <p>Get Started</p>
            </legend>
            <div className="inputs">
              {errorSign || ""}
              <input
                onChange={handleInput}
                name="username"
                type="text"
                autoComplete="off"
                value={signForm.username}
                placeholder="Include your username"
              />
              <input
                onChange={handleInput}
                name="email"
                type="text"
                autoComplete="off"
                value={signForm.email}
                placeholder="Enter your work email"
              />
              <div className="namesInputss">
                <input
                  onChange={handleInput}
                  name="firstName"
                  type="text"
                  autoComplete="off"
                  value={signForm.firstName}
                  placeholder="Enter your first name"
                />
                <input
                  onChange={handleInput}
                  name="lastName"
                  type="text"
                  autoComplete="off"
                  value={signForm.lastName}
                  placeholder="Enter your last name"
                />
              </div>
              {/* <p>gds</p> */}
              <div style={{ position: "relative" }}>
                <input
                  onChange={handleInput}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={signForm.password}
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="toggle-password-visibility"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  onChange={handleInput}
                  name="matchPassword"
                  type={showPassword ? "text" : "password"}
                  value={signForm.matchPassword}
                  placeholder="Confirm Password"
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
            {/* <div className="login"> */}
            <button className="login" type="submit">
              Sign up
            </button>
            {/* </div> */}
          </form>
        </div>
      </section>
    </>
  );
}

export default Signup;
