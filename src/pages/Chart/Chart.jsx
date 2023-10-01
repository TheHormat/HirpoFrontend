import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import chart_user from "../../components/images/chart_user.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Departament from "../../components/ChartComponents/Departament";
import ChartModal from "../../components/Modals/ChartModal/ChartModal";
import ModalDepartament from "../../components/Modals/ChartModal/ModalDepartament";
import "./chart.css";
import refreshToken from "../Auth/Refresh";
function Chart() {
  refreshToken();
  const nav = useNavigate();
  const [departaments, setDepartaments] = useState([]);
  const project_id = window.localStorage.getItem("project");
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
      nav("/");
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
  const handleDelete = async () => {
    const data2 = await fetch("http://127.0.0.1:8000/wizard/goback", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ project: project_id }),
    })
      .then((result) => result)
      .then((response) => response.json());
  };
  const [single, setSingle] = useState(false);
  useEffect(() => {
    setSingle(departaments.length <= 2);
  }, [departaments]);
  const [chartModal, setChartModal] = useState(false);
  const CreateCompetency = async () => {
    const token = localStorage.getItem("access_token");
    const data = await fetch(`http://127.0.0.1:8000/wizard/download`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(""),
    })
      .then((result) => result)
      .then((response) => response.json());
  };




  return (
    <>
      {chartModal && <ChartModal  setDepartaments={setDepartaments} getData={getData} setChartModal={setChartModal} />}
      <Navbar />
      <div className="total-second">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="chart-part">
          <div className="wizardHeading">
            <p>WIZARD - Organizational chart</p>
          </div>
          <div className="container">
            <ul className="chart">
              <li className="chartContent">
                <div className="charttt">
                  <div className="chartIcon-image">
                    <img className="chartIcon" src={chart_user} />
                    <p className="CeoText">Ceo</p>
                    <div className="hiddenChart">
                      <div className="hiddenChartText">{departaments[0]?.ceo?.ceo_name}</div>
                    </div>
                  </div>
                </div>

                <ul
                  className={` ${
                    single ? "center-departaments" : "departaments"
                  }`}
                >
                  {chartModal == "true"
                    ? departaments.map((a, b) => (
                        <li>
                          <ModalDepartament departament={a} key={b} />
                        </li>
                      ))
                    : departaments.map((a, b) => (
                        <Departament departament={a} key={b} />
                      ))}
                </ul>
              </li>
            </ul>
            <div className="chart-btns">
              <Link to="/wizard">
                <button onClick={handleDelete}>Go back</button>
              </Link>
              <button onClick={() => setChartModal(true)}>Edit</button>
              <Link to="/matrix">
                <button className="magic" onClick={CreateCompetency}>
                  Continue
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chart;
