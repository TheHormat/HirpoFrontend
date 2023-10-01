import React, { useState, useEffect } from "react";
import "../modals.css";

function AddMemberModal({
  addMemberModal,
  setAddMemberModal,
  selectedDepartamentId,
  getPositionData,
}) {
  {
  }
  const priority = {
    Junior: 5,
    Manager: 2,
    Senior: 3,
    Specialist: 4,
    "Top manager": 1,
    Ceo: 6,
  };
  const [newMemberName, setNewMemberName] = useState("");
  const [reportsTo, setReportsTo] = useState();
  const [positionLevel, setPositionLevel] = useState();
  const [desc, setDesc] = useState();

  const [selects, setSelects] = useState({
    department: "",
    name: newMemberName,
    positionLevel: positionLevel,
    reports: reportsTo,
  });

  const reports = addMemberModal.sort(
    (a, b) => priority[a.name] - priority[b.name]
  );

  const handleAddMember = async (e) => {
    console.log(
      addMemberModal.sort((a, b) => priority[a.name] - priority[b.name])
    );
    e.preventDefault();

    const a = await fetch(
      "http://127.0.0.1:8000/wizard/CreatePositionView/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          department: selectedDepartamentId,
          name: newMemberName,
          positionLevel: positionLevel,
          reports: reportsTo,
          description: desc
        }),
      }
    )
      .then((a) => a)
      .then((data) => data);
    if (a.status == 403) {
      alert("This position has already been added");
    }
    setAddMemberModal(false);
    getPositionData();
  };
  return (
    <>
      <div className={`modalWrapper open`}>
        <div className="addMemberModal">
          <div className="test">
            <input
              placeholder="Add name"
              name="name"
              onChange={(e) => setNewMemberName(e.target.value)}
              required
            />

            <div className="select">
              {" "}
              <select onChange={(e) => setReportsTo(e.target.value)}>
                <option value="default">Select Report To</option>
                <option value="Ceo">Ceo</option>
                {reports?.map((a) => (
                  <option value={a.id} key={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            <select
              name="memberPostion"
              onChange={(e) => setPositionLevel(e.target.value)}
              defaultValue={"DEFAULT"}
              required
            >
              <option value="DEFAULT" disabled>
                Select position level
              </option>
              <option value="Junior">Junior</option>
              <option value="Specialist">Specialist</option>
              <option value="Senior">Senior</option>
              <option value="Manager">Manager</option>
            </select>

            <textarea
              className="textArea"
              placeholder="Enter description"
              onChange={(e) => setDesc(e.target.value)}
            />
            <button
              className="cancel-new"
              onClick={() => {
                setAddMemberModal(false);
              }}
            >
              Cancel
            </button>
            <button className="add-new" onClick={handleAddMember}>
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddMemberModal;
