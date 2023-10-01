import React from "react";
import { useState, useEffect } from "react";
function AddChart({
  setAddChartModal,
  memberId,
  memberName,
  getPositionData,
  reports,
  memberDesc,
}) {
  const [reportto, setReportto] = useState();
  const [chartName, setChartName] = useState();
  const [desc, setDesc] = useState();

  const handleAdd = async (e) => {
    e.preventDefault();
    const a = await fetch("http://127.0.0.1:8000/wizard/PositionAddView/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: chartName,
        positionlevel: memberId,
        reportto: reportto,
        description: desc
      }),
    })
      .then((a) => a)
      .then((data) => data);
    if (a.status == 403) {
      alert("This position has already been added");
    }
    setAddChartModal(false);
    getPositionData();
  };
  console.log(memberId);
  return (
    <div className={`modelWrapper open`}>
      <div className="test2">
        <label htmlFor="name">Edit Position</label>
        <input
          placeholder={memberName}
          onChange={(e) => setChartName(e.target.value)}
          required
        />
        <div className="select">
          {" "}
          <select onChange={(e) => setReportto(e.target.value)} required>
            <option value="default">Select Report To</option>
            <option value="Ceo">Ceo</option>
            {reports.map((a) => (
              <option value={a.id} key={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <textarea
          className="textArea"
          placeholder={memberDesc == null ? "Enter description" : memberDesc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button
          className="cancel-new"
          onClick={() => {
            setAddChartModal(false);
          }}
        >
          Cancel
        </button>
        <button className="add-new" onClick={handleAdd}>
          Save
        </button>
      </div>
    </div>
  );
}

export default AddChart;
