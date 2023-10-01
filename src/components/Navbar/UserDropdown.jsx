import React from "react";
import { Link ,useNavigate} from "react-router-dom";

const UserDropdown = ({ showDropdown, setShowDropdown }) => {
  const nav = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/wizard/logout", {
        method: "POST",
      });
      if (response.status==200) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      nav("/")
      } else {
        <p>kdjks</p>;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
<>
      <button onClick={setShowDropdown} className="trigger-button">
        <i className="fa-solid fa-user"></i>
      </button>
      {showDropdown && 
        <div className="dropdown">
          <ul>
            <li onClick={handleLogout}>
              Log out
            </li>
            <li>
              Settings
            </li>
            </ul>
        </div>}
   </>
  );
};

export default UserDropdown;
