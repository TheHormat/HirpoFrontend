import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./users.css";
import refreshToken from "../Auth/Refresh";
import PhotoModal from "../../components/Modals/PhotoModal";
import partimg from "../../components/images/selftodo.png";

function UserProject() {
  refreshToken();
  const nav = useNavigate();
  const { id } = useParams();
 
  const [departaments, setDepartaments] = useState([]);
  const [activeDepartment, setActiveDepartment] = useState();
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [resetModal, setResetModal] = useState(false);
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
        nav("/");
      } else {
        const departaments = await response.json();
        setDepartaments(departaments);
        setActiveDepartment(departaments[0]);
      }
    };
    getData();
  }, []);

  const [user, setUser] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "http://127.0.0.1:8000/wizard/EmployeePageView/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const a = await response.json();
      setUser(a);
    };
    getData();
  }, []);
  const firstName = user.first_name;
  
  const [photoModal, setPhotoModal] = useState(false);
  let number = parseInt(Math.round(user.total?.total_score / 10));

  const fullStars = Math.floor(number / 2);
  const hasHalfStar = number % 2 === 1;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<i key={i} className="fas fa-star orange"></i>);
  }
  if (hasHalfStar) {
    stars.push(<i key={fullStars} className="fas fa-star-half-alt orange"></i>);
  }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i
          key={i + fullStars + (hasHalfStar ? 1 : 0)}
          className="far fa-star orange"
        ></i>
      );
  }
  return (
    <>
      <Navbar />
      <div className="total-second">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="userpanel-container">
          <div className="userpanel-head">
            <div className="userpanel-head-left">
              <p>
                {" "}
                Name & surname:{" "}
                <span>
                  {user.first_name} {user.last_name}
                </span>
              </p>

              <p>
                Position name:<span>{user.position?.name}</span>
              </p>
              <p>
                Position level: <span>{user.positionName}</span>
              </p>
              <p>
                Report to:
                <span>
                  {user.report_to?.first_name} {user.report_to?.last_name}
                </span>
              </p>
            </div>

            <div className="userpanel-head-right">
              <img
                className="userImg"
                src={`http://127.0.0.1:8000/${user.image}`}
              />
              <button className="magic" onClick={() => setPhotoModal(true)}>
                Change Photo
              </button>
              <div className="star">{stars}</div>
            </div>
          </div>
          {photoModal && (
            <PhotoModal setPhotoModal={setPhotoModal} id={user.id} />
          )}
          <div style={{ margin: "40px 5px" }}>
            <div className="goal-part">
              <div className="part-text">
                <p>Involved projects</p>
                <div className="part-img">
                  <img src={partimg} />
                </div>
              </div>
              <div className="part-body">
                <ul>
                  <li
                    style={{
                      color: "#296198",
                      font: "normal 900 18px 'Roboto'",
                    }}
                  >
                    Project: {user?.project?.project_name}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProject;
