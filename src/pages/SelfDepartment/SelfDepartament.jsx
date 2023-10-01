import React from "react";
import { useState, useEffect } from "react";
import "./selfDepartment.css";
import description from "../../components/images/depdescription.png";
function SelfDepartament({
  departament,
  setRemovedDepartments,
  removedDepartments,
  getElementStyle,
  getData,
}) {
  const [isBlur, setIsBlur] = useState(false);
  const handleDeleteMember = (id) => {
    setRemovedDepartments([...removedDepartments, { id: id }]);
    setIsBlur(true);

  };
  return (
    <>
      <div className={`selfDepartment ${isBlur ? "blur-background" : ""}`}>
        <div className="selfDepartmentName">
          <p> {departament.name} </p>
          <div className="depDescription">
            <img src={description} />
          </div>
        </div>
        <div className="selfDepartmentCount">
          <i className="fa-regular fa-user"></i>
          <p> {departament.employee_number} employees</p>
        </div>
        <button
          className="removeDepartment"
          style={getElementStyle()}
          onClick={() => handleDeleteMember(departament.id)}
        >
          &times;
        </button>
      </div>
    </>
  );
}

export default SelfDepartament;
