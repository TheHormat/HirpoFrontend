import React from "react";
import chart_user from "../../images/chart_user.png";
import { useState, useEffect } from "react";
import ModalDepartament from "./ModalDepartament";
import AddMemberModal from "./AddMemberModal";
import "../modals.css";
import refreshToken from "../../../pages/Auth/Refresh";
import { useNavigate } from "react-router-dom";
import AddChart from "../AddChart";
function ChartModal({ setChartModal ,getData}) {
  refreshToken();
  const nav = useNavigate();
  const [addMemberModal, setAddMemberModal] = useState([]);
  const [departaments, setDepartaments] = useState([]);
  const [selectedDepartamentId, setSelectedDepartamentId] = useState(null);
  const [selecteds, setSelecteds] = useState([]);
  const [objects2, setObjects2] = useState([]);
  const [single, setSingle] = useState(false);
  const getPositionData = async () => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(
      "http://127.0.0.1:8000/wizard/depposition/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 401) {
      nav("/");
    } else {
      const departaments = await response.json();
      setDepartaments(departaments);
    }
  };
  useEffect(() => {
    
    getPositionData();
  }, []);
  useEffect(() => {
    setSingle(departaments.length <= 2);
  }, [departaments]);

  const handleSubmit = async (e) => {
    // window.location.reload();
    e.preventDefault();
    const a = await fetch("http://127.0.0.1:8000/wizard/positionupdate", 
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        selecteds: selecteds,
        objects2: objects2,
        reported: reported,
      }),
    })
      .then((a) => a)
      .then((data) => data);

    getData();
    
    
  };
 
   const [reported, setReported] = useState({});
  const handleInput = (e, reporter) => {
    if (e != 'default' && e != 'Ceo') {
      setReported({ ...reported, [reporter]: e });
    }
   };
   
  return (
    <>
      <div className={`modalWrapper open`}>
        <div className="modal">
          <div className="chart-part">
            <div className="container">
              <ul className="chart">
                <li className="chartContent">
                  <img src={chart_user} />
                  <p className="CeoText">Ceo</p>
                  <ul
                    className={`${
                      single ? "center-departaments" : "departaments"
                    }`}
                  >
                    {departaments.map((a, b) => (
                      <ModalDepartament
                       getPositionData={getPositionData}
                        reported={reported}
                        setReported={setReported}
                        handleSubmit={handleSubmit}
                        handleInput={handleInput}
                        key={a.id}
                        departament={a}
                        selectedDepartmentId={selectedDepartamentId}
                        setObjects2={setObjects2}
                        objects2={objects2}
                        setChartModal={setChartModal}
                        handleClick={()=>{
                          setAddMemberModal(a?.departmentpositions);
                          setSelectedDepartamentId(a.id);
                        }}
                      />
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
            <div className="chart-btns">
              <button onClick={() => setChartModal(false)}>Cancel</button>
              <button
                className="magic"
                onClick={(e) => {
                  handleSubmit(e), setChartModal(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {addMemberModal && selectedDepartamentId && (
        <AddMemberModal
          getPositionData={getPositionData}
          selecteds={selecteds}
          setSelecteds={setSelecteds}
          setSelectedDepartamentId={setSelectedDepartamentId}
          selectedDepartamentId={selectedDepartamentId}
          setChartModal={setChartModal}
          addMemberModal={addMemberModal}
          setAddMemberModal={setAddMemberModal}
        />
      )}
     
    </>
  );
}

export default ChartModal;
