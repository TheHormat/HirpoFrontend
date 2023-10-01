import React from "react";
import { useState } from "react";
import "./modals.css";
function PeriodModal({ setPeriodModal, projectId, getData}) {
  const [periodData, setPeriodData] = useState({
    start_date: "",
    end_date: "",
    period_number: "",
    project: projectId,
    period_position: "",
  });
  const handleTime = (e) => {
    let check = false
    
    setPeriodData({ ...periodData, [e.target.name]: e.target.value });
  };
  const savePeriodData = async (e) => {
  
    const a = await fetch("http://127.0.0.1:8000/eva/AddPeriodApiView/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(periodData),
    })
      .then((a) => a.json())
      .then((data) => data);
    
    if (a.status == 422 || a.status == 423) {
      alert('Bu tarixi ehate eden period artiq movcuddur !!!')
    }
    

    getData();
    setPeriodModal(false)
  };
console.log(periodData)
  return (
    <>
      <div className={`modalWrapper open`}>
        <div className="resetModal">
          <div className="one-userinput">
            <label htmlFor="start_date">Period Start Time</label>
            <input
              id="start_date"
              placeholder="Start time"
              type="date"
              onChange={handleTime}
              value={periodData.start_date}
              name="start_date"
            />
          </div>
          <div className="one-userinput">
            <label htmlFor="end_date">Period End Time</label>
            <input
              id="end_date"
              placeholder="End time"
              type="date"
              onChange={handleTime}
              value={periodData.end_date}
              name="end_date"
            />
          </div>
          <div className="one-userinput">
            <label htmlFor="period_number">Period Number</label>
            <input
              id="period_number"
              placeholder="Period Number"
              type="number"
              onChange={handleTime}
              value={periodData.period_number}
              name="period_number"
            />
          </div>
          <div className="resetmodal-btns">
            <button
              className="reset-cancel"
              onClick={() => setPeriodModal(false)}
            >
              Cancel
            </button>
            <button className="reset-save" onClick={savePeriodData}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PeriodModal;
