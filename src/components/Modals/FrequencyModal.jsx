import React from "react";
import { useState } from "react";
import "./modals.css";
function FrequencyModal({ setFrequencyModal, period, getFreData }) {
  const [frequencyData, setFrequencyData] = useState({
    start_date: "",
    end_date: "",
    freq_number: "",
    period: "",
    evalution_date: "",
  });
  const handleTime = (e) => {
    setFrequencyData({ ...frequencyData, [e.target.name]: e.target.value });
  };
  const saveFrequencyData = async (e) => {
    const a = await fetch("http://127.0.0.1:8000/eva/AddFrequencyApiView/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(frequencyData),
    })
      .then((a) => a.json())
      .then((data) => data);
    console.log(a);
getFreData();
    setFrequencyModal(false);
 
  };
   console.log(frequencyData);
   console.log(period);
console.log(
period[0].filter((a) => a)[0]?.start_date
    );
  return (
    <>
      <div className={`modalWrapper open`}>
        <div className="resetModal">
          <div className="one-userinput">
            <select name="period" onChange={handleTime} required>
              <option value="" disabled selected>
                Select Period
              </option>

              {period.map((period) =>
                period.map((singlePeriod) => (
                  <option value={singlePeriod.id} key={singlePeriod.id}>
                    {singlePeriod.period_number}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="one-userinput">
            <label htmlFor="start_date">Frequency Start Time</label>
            <input
              id="start_date"
              placeholder="Start time"
              type="date"
              onChange={handleTime}
              min={
                frequencyData?.period
                  ? period[0]?.filter((a) => a.id == frequencyData?.period)[0]
                      ?.start_date
                  : ""
              }
              max={
                frequencyData?.period
                  ? period[0]?.filter((a) => a.id == frequencyData?.period)[0]
                      ?.end_date
                  : ""
              }
              value={frequencyData.start_date}
              name="start_date"
            />
          </div>
          <div className="one-userinput">
            <label htmlFor="end_date">Frequency End Time</label>
            <input
              id="end_date"
              placeholder="End time"
              type="date"
              onChange={handleTime}
              value={frequencyData.end_date}
              min={
                frequencyData?.period
                  ? period[0]?.filter((a) => a.id == frequencyData?.period)[0]
                      ?.start_date
                  : ""
              }
              max={
                frequencyData?.period
                  ? period[0]?.filter((a) => a.id == frequencyData?.period)[0]
                      ?.end_date
                  : ""
              }
              name="end_date"
            />
          </div>
          <div className="one-userinput">
            <label htmlFor="freq_number">Frequency</label>
            <input
              id="freq_number"
              placeholder="Frequency"
              type="number"
              onChange={handleTime}
              value={frequencyData.freq_number}
              name="freq_number"
            />
          </div>
          <div className="one-userinput">
            <label htmlFor="time">Evalution starting date</label>
            <input
              id="evalution_date"
              placeholder="evalution_date"
              type="date"
              onChange={handleTime}
              value={frequencyData.evalution_date}
              name="evalution_date"
              min={frequencyData?.start_date}
              max={frequencyData?.end_date}
            />
          </div>

          <div className="resetmodal-btns">
            <button
              className="reset-cancel"
              onClick={() => setFrequencyModal(false)}
            >
              Cancel
            </button>
            <button className="reset-save" onClick={saveFrequencyData}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FrequencyModal;
