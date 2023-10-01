import React from "react";
import { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import top from "../../components/images/topperformer.png";
import bottom from "../../components/images/bottomperformer.png";
import "./dashBoard.css";
import { useNavigate } from "react-router-dom";
import refreshToken from "../Auth/Refresh";
import Percentage from "../../components/Percentage";
import ChartNewComponent from "../../components/ChartNewComponent";
function DashBoard() {
  refreshToken();
  const nav = useNavigate();
  const [show, setShow] = useState(0);
  const [projects, setProjects] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "http://127.0.0.1:8000/wizard/HomePageView/",
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
        const user = await response.json();
        setUsers(user);
        if (users[0]?.length == 0) {
          nav("/wizard");
        }
      }
    };
    getData();
  }, []);
  const performed = users[0]?.employee;
  const access_token = window.localStorage.getItem("access_token");
  const percentage = 67;
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showWarning, setShowWarning] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth <= 500) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [windowWidth]);
  console.log(users)
  return (
    <>
      {showWarning ? (
        <h1 className="warned">
          Please use a tablet or a PC for the best viewing experience.
        </h1>
      ) : (
        <>
          <Navbar />
          <div className="total-second">
            <div className="sidebar">
              <Sidebar />
            </div>
            <div className="second">
              <div className="wrapper">
                <div className="second-part">
                  {users[0]?.id? (
                    <>
                      <div className="second-one">
                        <div className="second-left">
                          <div className="second-buttons">
                            <button
                              onClick={() => setShow(0)}
                              className={show === 0 ? "competency" : "goal"}
                            >
                              Competency
                            </button>
                            <button
                              onClick={() => setShow(1)}
                              className={show === 1 ? "competency" : "goal"}
                            >
                              Goal
                            </button>
                          </div>
                        </div>
                        <div className="second-right">
                          <div className="second-select">
                            <div className="periodsDashboard">
                              <select
                                name="period"
                                onChange={(e) =>
                                  setSelectedPeriod(e.target.value)
                                }
                                required
                                defaultValue={"DEFAULT"}
                              >
                                <option value="DEFAULT" disabled>
                                  Select Period
                                </option>

                                {/* {periods.map((period) => (
                  <option value={period.id} key={period.id}>
                    {period.start}-{period.end}
                  </option>
                ))} */}
                              </select>
                            </div>
                            {users[0]?.project_name ? (
                              <div id="ProjeNameDiv">
                                <b>
                                  <p id="ProjeName">{users[0]?.project_name}</p>
                                </b>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={show === 0 ? "block" : "none"}></div>
                      <div className={show === 1 ? "block" : "none"}></div>

                      {/* <div className="charts">
                        {" "}
                        <Percentage percentage={percentage} />
                        <ChartNewComponent />
                      </div> */}
                    </>
                  ) : (
                    <div className="wrong">
                      <span>The project has not been created yet</span>
                    </div>
                  )}

                  <div className="performs">
                    {performed?.length ? (
                      <div className="top-performers">
                        <ul className="performers">
                          <li className="performer-head-text">
                            <p>Top 10 performer</p>
                          </li>

                          {performed
                            ?.sort((a, b) =>
                              parseInt(
                                a.total_score.total - b.total_score.total
                              )
                            )
                            ?.map((a, b) => (
                              <li key={b}>
                                <img src={top} />
                                <p>
                                  {a.first_name} {a.last_name}
                                </p>
                              </li>
                            ))}
                        </ul>
                        <ul className="performers">
                          <li className="performer-head-text">
                            <p>Bottom 10 performer</p>
                          </li>

                          {users[0]?.bottom?.map((a, b) => (
                            <li key={b}>
                              <img src={bottom} />
                              <p>
                                {a.first_name} {a.last_name}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default DashBoard;
