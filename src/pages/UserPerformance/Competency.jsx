import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import "./userperformance.css";
import refreshToken from "../Auth/Refresh";
function Competency() {
  refreshToken();
  const nav = useNavigate();
  const [selectedPositions, setSelectedPositions] = useState([]);
  const project_id = window.localStorage.getItem("project");
  const { id } = useParams();
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
  console.log(oneCompetency)
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
              <div className="names">
                <div className="name">
                  <p>
                    first name:
                    <span> {oneCompetency?.employee?.first_name}</span>
                  </p>
                </div>
                <div className="name">
                  {" "}
                  <p>
                    last name: <span>{oneCompetency?.employee?.last_name}</span>
                  </p>
                </div>
              </div>

              <table className="skill-tds">
                <thead>
                  <th>Competencies</th>
                  <th>Weight</th>
                  <th>
                    {oneCompetency.staff_weight?.weight} 
                  </th>
                  <th>Comment</th>
                  <th>Score</th>
                </thead>
                <tbody>
                  {oneCompetency.comptency?.map((skill) => (
                    <tr>
                      <td>{skill.skill.name}</td>
                      <td>{skill.skill.weight?.toFixed(1)}</td>
                      <td>{skill.price}</td>
                      <td>{skill.comment}</td>
                      <td>
                        {skill.score == "undefined"
                          ? ""
                          : parseInt(skill.score * 100)}
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td>Total</td>
                    <td>{parseInt(oneCompetency.total?.total_weight)}%</td>
                    <td>{parseInt(oneCompetency.total?.total_score * 100)}%</td>
                    <td></td>
                    <td>Final</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="chart-btns">
              <Link to="/matrix">
                <button>Go back</button>
              </Link>
              <Link to={`/performedit/${id}`}>
                <button className="magic">Edit</button>
              </Link>
              <button className="magic">Share</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Competency;
