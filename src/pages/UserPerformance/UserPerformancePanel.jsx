import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import "./userperformance.css";
import refreshToken from "../Auth/Refresh";
function UserPerformancePanel() {
  refreshToken();
  const nav = useNavigate();
  const [departaments, setDepartaments] = useState([]);
  const [activeDepartment, setActiveDepartment] = useState();
  const [selectedPositions, setSelectedPositions] = useState([]);
  const project_id = window.localStorage.getItem("project");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const getData = async () => {
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
        nav("/"); // redirect to login page
      } else {
        const departaments = await response.json();
        setDepartaments(departaments);
      }
    };
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
  const [performData, setPerformData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "http://127.0.0.1:8000/eva/EmployeePerformance/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 401) {
        nav("/");
      } else {
        const a = await response.json();
        setPerformData(a);
      }
    };
    getData();
  }, []);

  console.log(performData, "--------------");

  const [displayedTableIndices, setDisplayedTableIndices] = useState([]);
  let positionNumber = 1;
  console.log(performData.map((a) => a));
  const [changeModal, setChangeModal] = useState(false);

  const [total, setTotal] = useState({
    manager: "",
    sub: "",
    cowerker: "",
    self: "",
  });
  const handleInput = (e) => {
    setTotal({ ...total, [e.target.name]: e.target.value });
  };
  const [id, setId] = useState(0);
  const handleFunctions = (id) => {
    setChangeModal(true),
      setId(id);
  }
    const [secondtotal, setSecondtotal] = useState(0);
  const handleTotal = () => {
    console.log(id)
    const a = performData.filter((a) => a.user == id)[0]
    console.log(a)
    console.log(a.total_score.selfscore,total.self)
    console.log(a.total_score.manager, total.manager);
    setSecondtotal(a.total_score.manager * total.manager/100 +
    a.total_score.selfscore * total.self/100 +
    a.total_score.sub * total.sub/100 +
      a.total_score.cowerker * total.cowerker / 100);
    setChangeModal(false)
  };
  return (
    <>
      <Navbar />
      <div className="total-second">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="mine-performance-table">
          <div className="mine2">
            {changeModal && (
              <div className={`modelWrapper open`}>
                <div className="addMemberModal">
                  <div className="resetModal background">
                    <div className="one-userinput">
                      <label>Manager</label>
                      <input
                        onChange={handleInput}
                        name="manager"
                        type="number"
                        autoComplete="off"
                        value={total.manager}
                        placeholder="Manager"
                      />
                    </div>
                    <div className="one-userinput">
                      <label>Sub</label>
                      <input
                        onChange={handleInput}
                        name="sub"
                        type="number"
                        autoComplete="off"
                        value={total.sub}
                        placeholder="Sub"
                      />
                    </div>
                    <div className="one-userinput">
                      <label>Cowerker</label>
                      <input
                        onChange={handleInput}
                        name="cowerker"
                        type="number"
                        autoComplete="off"
                        value={total.cowerker}
                        placeholder="Coworker"
                      />
                    </div>
                    <div className="one-userinput">
                      <label> Self</label>
                      <input
                        onChange={handleInput}
                        name="self"
                        type="number"
                        autoComplete="off"
                        value={total.self}
                        placeholder="Self"
                      />
                    </div>
                    <div className="editDepartmentBtns">
                      <button
                        onClick={() => setChangeModal(false)}
                        className="cancel-new"
                      >
                        Cancel
                      </button>

                      <button id="create" onClick={handleTotal}>
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="performanceTableContainer">
              {performData.map((a, index) => (
                <>
                  {/* <div className="grab"> */}
                  <div>
                    <div className="textDiv">
                      <div className="performUserTexts">
                        <div className="performUserText">
                          <p>
                            {positionNumber++}. Position:
                            <span>{a.position?.name}</span>
                          </p>
                        </div>
                        <div className="performUserText">
                          <p>
                            {""} User:
                            <span>
                              {a.first_name} {a.last_name}
                            </span>
                          </p>
                        </div>
                        <div className="performUserText">
                          <p>
                            Total:
                            <span>
                              {a.total_score?.total2
                                ?.toString()
                                .substring(0, 4)}
                              %
                              
                            </span>
                            {a.user == id ? (<span>total2:{secondtotal}%</span>):""}
 
                            
                         
                          </p>
                        </div>
                        <button id="mod" onClick={(
                          )=>handleFunctions(a.user) }>
                          <i className="fa-solid fa-calculator"></i>
                        </button>
                      </div>
                    </div>
                    <button
                      className="show"
                      onClick={() =>
                        setDisplayedTableIndices((prevIndices) =>
                          prevIndices.includes(index)
                            ? prevIndices.filter((i) => i !== index)
                            : [...prevIndices, index]
                        )
                      }
                    >
                      {displayedTableIndices.includes(index)
                        ? "Hide table"
                        : "Show table"}
                    </button>
                  </div>
                  {/* </div> */}
                  {displayedTableIndices.includes(index) && (
                    <table className="skill-tds ">
                      <thead>
                        <th>Competencies</th>
                        <th>Weight</th>
                        <th>Manager</th>
                        <th>Coworkers</th>
                        <th>Self</th>
                        <th>Sub</th>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Total</td>
                          <td>100%</td>
                          <td>{a.total_score.manager}%</td>
                          <td>{a.total_score.cowerker}%</td>
                          <td>{a.total_score.selfscore}%</td>
                          <td>{a.total_score.sub}%</td>
                        </tr>

                        {a.position?.myskills?.map((skill) => (
                          <tr>
                            <td>{skill.name}</td>
                            <td>{Number(skill.weight)?.toFixed(1)}</td>
                            <td>
                              {" "}
                              {a.all_scores?.manager[skill?.name] /
                              a.all_scores?.manager[skill?.name + "say"]
                                ? a.all_scores?.manager[skill?.name] /
                                  a.all_scores?.manager[skill?.name + "say"]
                                : "-"}
                            </td>
                            <td>
                              {a.all_scores?.cowerker[skill?.name] /
                              a.all_scores?.cowerker[skill?.name + "say"]
                                ? a.all_scores?.cowerker[skill?.name] /
                                  a.all_scores?.cowerker[skill?.name + "say"]
                                : "-"}
                            </td>
                            <td>
                              {a.all_scores?.selfscore[skill?.name] /
                              a.all_scores?.selfscore[skill?.name + "say"]
                                ? a.all_scores?.selfscore[skill?.name] /
                                    a.all_scores?.selfscore[
                                      skill?.name + "say"
                                    ] +
                                  "%"
                                : "-"}
                            </td>
                            <td>
                              {a.all_scores?.sub[skill?.name] /
                              a.all_scores?.sub[skill?.name + "say"]
                                ? a.all_scores?.sub[skill?.name] /
                                  a.all_scores?.sub[skill?.name + "say"]
                                : "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </>
              ))}
            </div>
          </div>

          <div className="chart-btns">
            <Link to="/matrix">
              <button>Go back</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPerformancePanel;
