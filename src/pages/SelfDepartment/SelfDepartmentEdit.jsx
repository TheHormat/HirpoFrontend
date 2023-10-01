import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./selfDepartmentEdit.css";
import { useEffect, useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import DepartmentModal from "./DepartmentModal";
import SelfDepartament from "./SelfDepartament";
import refreshToken from "../Auth/Refresh";
function SelfDepartmentEdit() {
  refreshToken();
  const nav = useNavigate();
  const [editedDepartments, setEditedDepartments] = useState([]);
  const [removedDepartments, setRemovedDepartments] = useState([]);
  const [departmentModal, setDepartmentModal] = useState(false);
  const [departaments, setDepartaments] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const customClick = () => {
    handleSubmit({})
    toggleVisibility();
  };
  const toggleVisibility = () => {
    
      setIsVisible(!isVisible);
       };

  const getElementStyle = () => {
    return isVisible ? { display: "block" } : { display: "none" };
  };
  const getData = async () => {
    const token = localStorage.getItem("access_token");
    const response = await fetch("http://127.0.0.1:8000/wizard/DpForChart/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 401) {
      nav("/"); // redirect to login page
    } else {
      const departaments = await response.json();
      setDepartaments(departaments);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {

    const token = localStorage.getItem("access_token");
    const a = await fetch("http://127.0.0.1:8000/wizard/DepartmentUpdate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        editedDepartments: [e],
        removedDepartments: removedDepartments,
      }),
    })
      .then((a) => a.json())
      .then((data) => data);  
getData();
    
  };
  return (
    <>
      {departmentModal && (
        <DepartmentModal
          handleSubmit={handleSubmit}
          getData={getData}
          setDepartmentModal={setDepartmentModal}
          editedDepartments={editedDepartments}
          setEditedDepartments={setEditedDepartments}
        />
      )}
      <Navbar />
      <div className="total-second">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="selfDepartmentPage">
          <div className="wizardHeading">
            <p>Organizational chart</p>
          </div>
          <div className="wrapper2">
            <div className="selfDepartments">
              {departaments.map((departament) => (
                <SelfDepartament
                  getElementStyle={getElementStyle}
                  removedDepartments={removedDepartments}
                  setRemovedDepartments={setRemovedDepartments}
                  departament={departament}
                  key={departament.id}
                />
              ))}
              <div className="addNewDepartment">
                <button
                  className="magic"
                  style={getElementStyle()}
                  onClick={() => setDepartmentModal(true)}
                >
                  Add Department
                </button>
              </div>
            </div>
            <div className="selfEditBtn">
              <button
                style={
                  getElementStyle().display == "none"
                    ? { display: "block" }
                    : { display: "none" }
                }
                className="magic"
                onClick={toggleVisibility}
              >
                Edit
              </button>
              <button
                className="magic"
                style={getElementStyle()}
                type="submit"
                onClick={() => customClick()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelfDepartmentEdit;
