import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import chart_user from "../../components/images/chart_user.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Departament from "../../components/ChartComponents/Departament";
import ChartModal from "../../components/Modals/ChartModal/ChartModal";
import ModalDepartament from "../../components/Modals/ChartModal/ModalDepartament";
import "../Chart/chart.css";
import refreshToken from "../Auth/Refresh";
import "./selfchart.css";
const SelfChart = () => {
  refreshToken();
  const nav = useNavigate();
  const [departaments, setDepartaments] = useState([]);
  const project_id = window.localStorage.getItem("project");
   const getData = async () => {
     const token = localStorage.getItem("access_token");
     const response = await fetch("http://127.0.0.1:8000/wizard/depposition/", {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });
     if (response.status === 401) {
       nav("/");
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

  // const departament = departaments.map(a, b)

//   const priority = {
//     Junior: 5,
//     Manager: 2,
//     Senior: 3,
//     Specialist: 4,
//     "Top manager": 1,
//     Ceo:6
//   };
//   const sortedData = departament?.departmentpositions.sort(
//     (a, b) => priority[a.name] - priority[b.name]
// );

// console.log(sortedData);

  return (
    <>
      {chartModal && (
        <ChartModal setChartModal={setChartModal} getData={getData} />
      )}
      <Navbar />
      <div className="total-second">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="chart-part">
          <div className="container">
            <ul className="chart">
              <li className="chartContent">
                <img className="chartIcon" src={chart_user} />
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
              <button onClick={() => setChartModal(true)}>Edit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelfChart;
