import React from "react";
import { useState } from "react";
import "../../components/Modals/modals.css";
function DepartmentModal({
  setDepartmentModal,
  editedDepartments,
  setEditedDepartments,
  getData,
  handleSubmit,
}) {
  const project_id = window.localStorage.getItem("project");
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [newDepartmentEmployee, setNewDepartmentEmployee] = useState("");
  const handleAddDepartment = () => {
    
   

    handleSubmit({ name: newDepartmentName, employee_number: newDepartmentEmployee });
    setDepartmentModal(false);
    
  };
  
  return (
    <div className={`modalWrapper open`}>
      <div className="addMemberModal">
        <div className="test">
          <label htmlFor="newDepartment">Add new Department:</label>
          <input
            placeholder="New Department"
            id="newDepartment"
            onChange={(e) => setNewDepartmentName(e.target.value)}
            value={newDepartmentName}
          />
          <input
            placeholder="Employee Number"
            type="number"
            id="newNumber"
            onChange={(e) => setNewDepartmentEmployee(e.target.value)}
            value={newDepartmentEmployee}
          />
          <div className="editDepartmentBtns">
            <button
              className="cancel-new"
              onClick={() => {
                setDepartmentModal(false);
              }}
            >
              Cancel
            </button>
            <button className="magic" onClick={() => { handleAddDepartment()}}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepartmentModal;
