import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import "./users.css";
import refreshToken from "../Auth/Refresh";
import ResetModal from "../../components/Modals/ResetModal";
import PhotoModal from "../../components/Modals/PhotoModal";
function UserPanel() {
  refreshToken();
  const nav = useNavigate();
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
        nav("/"); // redirect to login page
      } else {
        const departaments = await response.json();
        setDepartaments(departaments);
        setActiveDepartment(departaments[0]);
      }
    };
    getData();
  }, []);
  const handleReset = (e) => {
    e.preventDefault;
    setResetModal(true);
  };
  const [newPasswords, setNewPasswords] = useState([]);

  // const [userData,setUserData]=useState([])
  // useEffect(() => {
  //    const getData = async () => {
  //      let userData = await fetch("").then((a) => a.json());
  //      setUserData(userData);
  //    };
  //    getData();
  //  }, []);
  const { id } = useParams();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });

  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const [user, setUser] = useState({});
  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://127.0.0.1:8000/wizard/EmployeeSingle/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const detailedUser = await response.json();
      setUser(detailedUser);
    };
    getData();
  }, []);
  console.log(user)
  const myuserid = user.user?.id;
  const saveNewPasswords = async (e) => {
    window.location.reload();
    const a = await fetch(
      `http://127.0.0.1:8000/wizard/UserChange/${user.user.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userData),
      }
    )
      .then((a) => a.json())
      .then((data) => data);
  };
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "http://127.0.0.1:8000/wizard/EmployeeListView/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = await response.json();
      setUsers(user);
    };
    getData();
  }, []);
console.log(users)

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
                Name & surname:
                <span>
                  {user.first_name} {user.last_name}
                </span>
              </p>

              <p>
                Position level:{" "}
                <span>{user.position?.positionlevel?.name}</span>
              </p>
              <p>
                Position :{" "}
                <span>{user.position?.name}</span>
              </p>
              <p>
                Report to:
                <span>
                  {user.report_to?.first_name} {user.report_to?.last_name}
                </span>
              </p>
              <p>
                Department:
                <span>{user.position?.department?.name}</span>
              </p>
            </div>

            <div className="userpanel-head-right">
              <img className="userImg" src={user.image} />
              <button className="magic" onClick={() => setPhotoModal(true)}>
                Change Photo
              </button>
              <div className="star">{stars}</div>
            </div>
          </div>
          {photoModal && <PhotoModal setPhotoModal={setPhotoModal} id={id} />}

          {/* <button className="projectsText">
            <Link to={`/userproject/${user.id}`}>Review your projects</Link>
          </button> */}
          <form>
            <div className="one-userinput">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                placeholder={user.user?.username}
                onChange={handleInput}
                name="username"
                value={userData.username}
              />
            </div>
            <div className="one-userinput">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                placeholder={user.user?.email}
                onChange={handleInput}
                name="email"
                value={userData.email}
              />
            </div>
          </form>
          {resetModal && (
            <ResetModal myuserid={myuserid} setResetModal={setResetModal} />
          )}
          <button id="reset" onClick={handleReset}>
            Reset Password
          </button>

          <div className="chart-btns">
            <button className="magic" onClick={saveNewPasswords}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPanel;
