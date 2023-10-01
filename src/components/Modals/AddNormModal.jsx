import React from "react";
import { useState, useEffect } from "react";
import "./modals.css";
function AddNormModal({
  activeDepartment,
  position,
  skill,
  handleAddMember,
  setAddNormModal,
  newNorm,
  setNewNorm,
  positionId
}) {
     const handleInput = (e) => {
       setNewNorm({ ...newNorm, [e.target.name]: Number(e.target.value>5?e.target.value=5 :e.target.value) });
  };

  return (
    <>
      <div className={`modalWrapper open`}>
        <div className="addMemberModal">
          <div className="test">
            <label htmlFor="newNorm">Add new norm:</label>
            <input
              placeholder="New norm"
              id="newNorm"
              name="newNorm"
              onChange={handleInput}
              value={newNorm.newNorm}
            />
            <div className="editDepartmentBtns">
              <button
                className="cancel-new"
                onClick={() => {
                  setAddNormModal(false);
                }}
              >
                Cancel
              </button>
              <button
                className="add-new"
                onClick={() =>
                  handleAddMember(position, skill, activeDepartment,positionId)
                }
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNormModal;
