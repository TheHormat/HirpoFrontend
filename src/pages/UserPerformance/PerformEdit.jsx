import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link, useNavigate, useParams ,useLocation} from "react-router-dom";
import "./userperformance.css";
import refreshToken from "../Auth/Refresh";
function PerformEdit() {
  refreshToken();
  const nav = useNavigate();
  const project_id = window.localStorage.getItem("project");
  const [updatedSkills, setUpdatedSkills] = useState({});
  const handleInput = (e) => {
    const { name, value, id } = e.target;
    
    setUpdatedSkills({ ...updatedSkills, [`${name}-${id}`]: value });
  };

  const [savedUpdatedSkills, setSavedUpdatedSkills] = useState([]);
  const { id } = useParams();
  const handleSave = async (e) => {
    e.preventDefault();
    const a = await fetch(
      "http://127.0.0.1:8000/eva/PerformCardUpdateView/",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(updatedSkills),
      }
    )
      .then((a) => a.json())
      .then((data) => data);
    if (a.message == "success") {
      nav(`/competency/${id}`);
    }
  };
  const [oneCompetency, setOneCompetency] = useState({});
  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("access_token");

      const response = await fetch(
        `http://127.0.0.1:8000/eva/EvaluateComptencyList/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 401) {
        nav("/");
      } else {
        const detailedUser = await response.json();
        setOneCompetency(detailedUser);
      }
    };
    getData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="total-second">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="grab">
          <div className="mine-table">
           
            <div className="mine">
              <table className="skill-tds">
                <thead>
                  <th>Competencies</th>
                  <th>Weight</th>
                  <th>
                    Manager <br /> (40%)
                  </th>
                  <th>Comment</th>
                </thead>
                <tbody>
                  {oneCompetency.comptency?.map((skill) => (
                    <tr>
                      <td>{skill.skill.name}</td>
                      <td>{skill.skill.weight?.toFixed(1)}</td>
                      <td>
                        <input
                          id={skill.id}
                          name="price"
                          className="userPinput"
                          type="number"
                          onKeyDown={(evt) =>
                            ["e", "E", "+", "-"].includes(evt.key) &&
                            evt.preventDefault()
                          }
                          onKeyUp={(evt) =>
                            evt.target.value > skill.skill?.norm &&
                            (evt.target.value = skill.skill?.norm)
                          }
                          placeholder={
                            skill.price == null
                              ? ` ${skill.skill?.norm}`
                              : skill.skill?.norm
                          }
                          defaultValue={skill.price}
                          onChange={handleInput}
                          min={0}
                          max={100}
                        />
                      </td>
                      <td style={{ width: "340px" }}>
                        <input
                          id={skill.id}
                          className="userPinput"
                          type="text"
                          name="comment"
                          defaultValue={skill.comment}
                          onChange={handleInput}
                        />
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>Total</td>
                    <td>{parseInt(oneCompetency.total?.total_weight)}%</td>
                    <td>{parseInt(oneCompetency.total?.total_score * 100)}%</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="chart-btns">
              <Link to={`/competency/${id}`}>
                <button>Go back</button>
              </Link>
              <button className="magic" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PerformEdit;
