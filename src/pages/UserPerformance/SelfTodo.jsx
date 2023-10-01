import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import partimg from "../../components/images/selftodo.png";
import refreshToken from "../Auth/Refresh";
import "../Users.jsx/users.css";
function SelfTodo() {
  refreshToken();
  const nav = useNavigate();
  const [departaments, setDepartaments] = useState([]);
  const [activeDepartment, setActiveDepartment] = useState();
  const project_id = window.localStorage.getItem("project");
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
        setActiveDepartment(departaments[0]);
      }
      // if (departaments.detail === "Given token not valid for any token type") {
      //   nav("/login");
      // }
    };
    getData();
  }, []);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "http://127.0.0.1:8000/eva/EvaluationList/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 401) {
        nav("/"); // redirect to login page
      } else {
        const data = await response.json();
        setUsers(data);
      }
    };
    getData();
  }, []);
  console.log(users)
  return (
    <>
      <Navbar />
      <div className="total-second">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="self-container">
          <div className="self-head">
            <div className="matrix-text">
              <p>Self- To do</p>
            </div>
          </div>
          <div className="self-body">
            <div className="competency-part">
              <div className="part-text">
                <Link to="/competency">
                  <p>Competency</p>
                </Link>
                <div className="part-img">
                  <img src={partimg} />
                </div>
              </div>
              <div className="part-body">
                {users.map((user) => (
                  <div className="users">
                    <div className="user">
                      <p>
                        User:
                        <span>
                          <Link to={`/competency/${user.id}`}>
                            {user.employee.first_name} {""}
                            {user.employee.last_name}
                          </Link>
                        </span>
                      </p>
                    </div>
                    <div className="user">
                      <p>
                        Position:
                        <span>
                          {user.employee?.position?.positionlevel?.name}{""} - {""}
                          {user.employee?.position?.name}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="goal-part">
                <div className="part-text">
                  <p>Goal based</p>
                  <div className="part-img">
                    <img src={partimg} />
                  </div>
                </div>
                <div className="part-body"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelfTodo;
