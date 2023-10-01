import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import "./users.css";
import refreshToken from "../Auth/Refresh";
import AddEmployee from "../../components/Modals/AddEmployee";
function User() {
  const nav = useNavigate();
  refreshToken();
  const [searchUser, setSearchUser] = useState("");
  const [employeeModal, setEmployeeModal] = useState(false);
  const [users, setUsers] = useState([]);
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
      if (response.status === 401) {
        nav("/"); // redirect to login page
      } else if (response.status === 403) {
        // nav("/userproject");
        pass;
      } else {
        const user = await response.json();
        setUsers(user);
      }
    };
  useEffect(() => {
  
    getData();
  }, []);
  console.log(users)
  const filteredData = users?.filter((item) =>
    item.first_name?.toLowerCase().includes(searchUser?.toLowerCase())
  );
  function handleInputChange(e) {
    setSearchUser(e.target.value);
  }
  const depNames = new Set(users.map((a) => a.position?.department?.name));
  const a = Array.from(depNames);
  // const names = a.map((a) => {
  //   return a;
  // }); 
  // console.log(names);



  const filtrByDep = filteredData.filter(
    (a) => a.position?.department?.name == "Sales"
  );
console.log(filteredData,'l')
  return (
    <>
      <Navbar />
      <div className="total-second">
        <div className="sidebar">
          <Sidebar />
        </div>
        {employeeModal && (
          <>
            <AddEmployee
              getData={getData}
              employeeModal={employeeModal}
              setEmployeeModal={setEmployeeModal}
            />
          </>
        )}
        <div className="self-container">
          <div className="user-head">
            <div className="matrix-text">
              <p>Users: {filteredData.length}</p>
            </div>
            <div className="search-user">
              <input
                type="text"
                value={searchUser}
                onChange={handleInputChange}
                placeholder="Search for user"
              />

              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
          <div className="u">
            {a.map((department) => (
              <>
                <span>{department}</span>
                <div className="usersNames">
                  {filteredData
                    .filter((a) => a.position?.department?.name === department)
                    .map((user) => (
                      <>
                        <div className="user-body" key={user.id}>
                          <div className="userlefrr">
                            <div className="user">
                              <p>
                                User:
                                <span>
                                  <Link to={`/userpanel/${user.id}`}>
                                    {user.first_name} {user.last_name}
                                  </Link>
                                </span>
                              </p>
                            </div>
                            <div className="user">
                              <p>
                                Position:<span>{user.is_systemadmin?'Ceo':user.position?.name}</span>
                              </p>
                            </div>
                          </div>
                          <div id="way">
                            {user?.report_to ? (
                              ""
                            ) : (
                              <>
                                <div className="exclamation">
                                  {" "}
                                  <i className="fa-solid fa-exclamation"></i><div className="hoveredway">
                                  <h3 style={{width:"50px",fontSize:"16px"}}>Reported employee doesnt exist</h3>
                                </div>
                                </div>
                                
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    ))}
                </div>
              </>
            ))}
          </div>
          <div className="add">
            <button className="magic" onClick={() => setEmployeeModal(true)}>
              Add employee
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
