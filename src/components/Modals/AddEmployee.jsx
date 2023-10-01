import React from "react";
import { useState, useEffect } from "react";
import refreshToken from "../../pages/Auth/Refresh";
import "./modals.css";
function AddEmployee({ employeeModal, setEmployeeModal, getData }) {
  refreshToken();
  const [industry, setIndustry] = useState("");
  const [industryError, setIndustryError] = useState("");
  const [report, setReport] = useState("");
  const [reportError, setReportError] = useState("");
  const [addedEmployee, setAddedEmployee] = useState({
    username: "",
    position: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  let bodyData = {};
  if (addedEmployee.reportTo) {
    bodyData = {
      ...addedEmployee,
      reportTo: addedEmployee.reportTo,
    };
  } else {
    bodyData = addedEmployee;
  }
  const [addedEmployees, setAddedEmployees] = useState([]);
  const handleInput = (e) => {
    setAddedEmployee({ ...addedEmployee, [e.target.name]: e.target.value });
  };
  const saveAddedEmployeer = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    const a = await fetch("http://127.0.0.1:8000/wizard/AddUser/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyData),
    })
      .then((a) => a.json())
      .then((data) => data);
    console.log(a);
    if (a.message != "success") {
      alert(Object.values(a));
    } else {
      setEmployeeModal(false);
    }

    getData();
  };

  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "http://127.0.0.1:8000/wizard/PositionSelect/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 401) {
        nav("/");
      } else {
        const position = await response.json();
        setPositions(position);
      }
    };
    getData();
  }, []);
  console.log(positions);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "http://127.0.0.1:8000/wizard/EmployeeListView/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = await response.json();
      setUsers(user);
    };
    getData();
  }, []);

  return (
    <div className={`modalWrapper open`}>
      <div className="employeeModal">
        <div className="userInputs">
          <div className="one-userinput">
            <p>Position:</p>
            <select name="position" onChange={handleInput} required>
              <option value="" disabled selected>
                Select Position Level
              </option>
              {positions.map((position) => (
                <option value={position.id} key={position.id}>
                  {position.name}-{position.department?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="one-userinput">
            <p>Report to:</p>
            <select name="reportTo" onChange={handleInput}>
              <option value="" disabled selected>
                Select Report To
              </option>
              {users.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.first_name} {user.last_name}
                </option>
              ))}
            </select>
          </div>

          <div className="one-userinput">
            <label htmlFor="user">Username:</label>
            <input
              id="user"
              type="text"
              onChange={handleInput}
              name="username"
              value={addedEmployee.username}
            />
          </div>
          <div className="one-userinput">
            <label htmlFor="firstName">First name:</label>
            <input
              id="firstName"
              type="text"
              onChange={handleInput}
              name="firstName"
              value={addedEmployee.firstName}
            />
          </div>
          <div className="one-userinput">
            <label htmlFor="lastName">Last name:</label>
            <input
              id="lastName"
              type="text"
              onChange={handleInput}
              name="lastName"
              value={addedEmployee.lastName}
            />
          </div>
          <div className="one-userinput">
            <label htmlFor="email">Email address:</label>
            <input
              id="email"
              type="text"
              onChange={handleInput}
              name="email"
              value={addedEmployee.email}
            />
          </div>
          <div className="one-userinput">
            <label htmlFor="phone">Phone number:</label>
            <input
              id="phone"
              type="text"
              onChange={handleInput}
              name="phone"
              onKeyDown={(evt) =>
                !/^[0-9]$/.test(evt.key) &&
                !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(
                  evt.key
                )
                  ? evt.preventDefault()
                  : null
              }
              value={addedEmployee.phone}
            />
          </div>
          <div className="one-userinput">
            <label htmlFor="phone">Password:</label>
            <input
              id="password"
              type="text"
              onChange={handleInput}
              name="password"
              value={addedEmployee.password}
            />
          </div>
          <div className="resetmodal-btns">
            <button
              className="reset-cancel"
              onClick={() => setEmployeeModal(false)}
            >
              Cancel
            </button>
            <button className="add-user" onClick={saveAddedEmployeer}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
