import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import "./userperformance.css";
import refreshToken from "../Auth/Refresh";
function UserPerformanceEdit() {
  refreshToken();
  const nav = useNavigate();
  const [departaments, setDepartaments] = useState([]);
  const [activeDepartment, setActiveDepartment] = useState();
  const [selectedPositions, setSelectedPositions] = useState([]);
  const project_id = window.localStorage.getItem("project");
const getData = async () => {
  const token = localStorage.getItem("access_token");
  const response = await fetch("http://127.0.0.1:8000/wizard/depposition/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 401) {
    nav("/"); // redirect to login page
  } else if (response.status === 403) {
    nav("/userproject");
  } else {
    const departaments = await response.json();
    setDepartaments(departaments);
  }
};
  useEffect(() => {
    
    getData();
  }, []);
  const handleShow = (departmentposition) => {
    setSelectedPositions((prevSelectedPositions) =>
      prevSelectedPositions.includes(departmentposition)
        ? prevSelectedPositions.filter(
            (selectedPosition) => selectedPosition !== departmentposition
          )
        : [...prevSelectedPositions, departmentposition]
    );
  };

  const updateWeight = async (skillsToUpdate) => {
    
    const a = await fetch(`http://127.0.0.1:8000/wizard/weightUpdateView`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(skillsToUpdate),
    });
      
    if (a.message == "success") {
     nav("/userperformance")
   }
    

    getData();
       console.log(a);
   
    
  };

  const departament = departaments.map((departament) => departament);


  const handleSave = () => {
  nav("/userperformance")
}

  return (
    <>
      <Navbar />
      <div className="total-second">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="mine-table">
          <div className="matrix-text">
            <p>WIZARD - Weights Edit</p>
          </div>
          <div className="department-btnsBox">
            {departaments.map((departament) => (
              <button
                onClick={() => setActiveDepartment(departament)}
                style={{
                  backgroundColor:
                    activeDepartment?.name === departament?.name
                      ? "#296198"
                      : "",
                  color:
                    activeDepartment?.name === departament?.name ? "#fff" : "",
                }}
                className="department-btns"
              >
                {departament.name}
              </button>
            ))}
          </div>
          {departaments.map((departament) => {
            if (activeDepartment?.name !== departament?.name) return null;
            let positionNumber = 1;
            return departament.departmentpositions.map(
              (departmentposition) =>
                activeDepartment?.name === departament?.name && (
                  <div className="mine3">
                    <p>
                      {positionNumber++}. Position:
                      <span>{departmentposition.name}</span>
                    </p>
                    <button
                      onClick={() => handleShow(departmentposition)}
                      className="show"
                    >
                      {selectedPositions.includes(departmentposition)
                        ? "Hide Table"
                        : "Show Table"}
                    </button>
                    {selectedPositions.some(
                      (selectedPosition) =>
                        selectedPosition.id === departmentposition.id
                    ) && (
                      <table className="weight-tds">
                        <thead>
                          <th>Competencies</th>
                          <th>Weight</th>
                        </thead>
                        {/* {
                          <tbody>
                            {skills.map((skill) => (
                              <tr key={skill.id}>
                                <td>{skill.name}</td>
                                <td>{Number(skill.weight)?.toFixed(1)}</td>
                                <td>{skill.type}</td>
                              </tr>
                            ))}
                          </tbody>
                        } */}
                        <tbody>
                          {/* Compute total weight */}
                          {(() => {
                            let totalWeight = 0;
                            departament.allSkills.forEach((skill) => {
                              if (skill.position === departmentposition.id) {
                                totalWeight += skill.weight || 0;
                              }
                            });
                            console.log(totalWeight);

                            return (
                              <>
                                {departament.allSkills
                                  .filter(
                                    (skill) =>
                                      skill.position === departmentposition.id
                                  )
                                  .map((skill) => (
                                    <tr key={skill.id}>
                                      <td>{skill.name}</td>
                                      <td>
                                        <input
                                          className="userPinput"
                                          type="number"
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-"].includes(
                                              evt.key
                                            ) && evt.preventDefault()
                                          }
                                          defaultValue={skill.weight?.toFixed(
                                            1
                                          )}
                                          onChange={(e) => {
                                            let value = e.target.value;

                                            if (value > 100) {
                                              value = 100;
                                            }

                                            if (isNaN(value) || value === "") {
                                              value = 0;
                                            }

                                            const skillsToUpdate = [
                                              { id: skill.id, weight: value },
                                            ];
                                            updateWeight(skillsToUpdate);
                                          }}
                                          disabled={
                                            totalWeight === 100 && !skill.weight
                                          }
                                          min={0}
                                          max={100}
                                        />
                                      </td>
                                    </tr>
                                  ))}
                                <tr key="total">
                                  <td
                                    style={{
                                      background: "#296198",
                                      color: "#fff",
                                    }}
                                  >
                                    Total Weight
                                  </td>
                                  <td
                                    style={{
                                      background: "#296198",
                                      color: "#fff",
                                    }}
                                  >
                                    {totalWeight?.toFixed(1)}%
                                  </td>
                                </tr>
                              </>
                            );
                          })()}
                        </tbody>
                      </table>
                    )}
                  </div>
                )
            );
          })}
          <div className="chart-btns">
            <Link to="/userperformance">
              <button>Go back</button>
            </Link>
            <button className="magic">Edit</button>
            <button className="magic" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPerformanceEdit;
