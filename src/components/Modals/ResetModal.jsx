import React from "react";
import { useState } from "react";
import "../../pages/Users.jsx/users.css";
import "./modals.css";
function ResetModal({ setResetModal, myuserid}) {
  
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleInput = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  
  };
  const match = passwords.password == passwords.confirmPassword;

  const savePasswords = async (e) => {
    e.preventDefault();
    if (match) {
    const a = await fetch(
      `http://127.0.0.1:8000/account/EmployeeChangePasswordView/${myuserid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          password: passwords.password,
        }),
      }
    );
      setResetModal(false)
    } else {
document.getElementById("match").innerHTML="Passwords are not the same"
      setResetModal(true);
  }
    
  };

    // const savePasswords = () => {
    //   setNewPasswords([
    //     ...newPasswords,
    //     { password: passwords.password, confirmPassword: passwords.confirmPassword },
    //   ]);

    //   setResetModal(false);
    // };
  return (
    <div className={`modalWrapper open`}>
      <div className="resetModal">
        <div className="one-userinput">
          <label htmlFor="newpassword">New password</label>
          <input
            id="newpassword"
            placeholder="*********"
            type="password"
            onChange={handleInput}
            value={passwords.password}
            name="password"
          />
        </div>
        <div className="one-userinput">
          <label htmlFor="password">Confirm new password</label>
          <input
            id="password"
            placeholder="*********"
            type="password"
            onChange={handleInput}
            value={passwords.confirmPassword}
            name="confirmPassword"
          />
        </div>
        <div id="match"></div>
        <div className="resetmodal-btns">
          <button className="reset-cancel" onClick={() => setResetModal(false)}>
            Cancel
          </button>
          <button className="reset-save" onClick={savePasswords}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetModal;
