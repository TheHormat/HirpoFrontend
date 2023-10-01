import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import LoadingSpinner from "../components/Loader/Loader";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MatrixModal from "../components/Modals/MatrixModal";
import refreshToken from "./Auth/Refresh";
import AddNormModal from "../components/Modals/AddNormModal";
function Matrix() {
  refreshToken();
  const nav = useNavigate();
  const [activeDepartment, setActiveDepartment] = useState();
  const [skills, setSkills] = useState([]);
  const [matrixModal, setMatrixModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addNormModal, setAddNormModal] = useState(false);

  const [selectedNorm, setSelectedNorm] = useState("");
  const [editedNorms, setEditedNorms] = useState([]);
  const [newNorm, setNewNorm] = useState({
    newNorm: "",
    skill: "",
    position: "",
  });

  const token = localStorage.getItem("access_token");
  const fetchSkills = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/wizard/upload/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      try {
        const skills = await response.json();
        setSkills(skills);
        {
          activeDepartment ? "" : setActiveDepartment(skills[0]?.name);
        }
        if (skills.detail === "besuperuser") {
          nav("/userproject");
        }
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    fetchSkills();
  }, [activeDepartment]);


  const positionNames = skills.map((subArray) =>
    subArray.departmentpositions.map((a) => a)
  );
 
  const positionDate = [];
  positionNames.forEach((innerArray) => {
    innerArray.forEach((position) => {
      positionDate.push({ name: position.name, id: position.id,department:position.department?.name });
    });
  });
  
  let filteredCompetencies = [];
  if (activeDepartment) {
    const selectedDepartmentObj = skills?.find(
      (exCompetency) => exCompetency.name === activeDepartment
    );

    filteredCompetencies = selectedDepartmentObj
      ? selectedDepartmentObj.compatencies
      : [];
  }


  const skillNames = [];
  filteredCompetencies.map((skill) => {
    skillNames.push(skill.skill.name);
  });
  const uniqueSkills = [...new Set(skillNames)].sort();
  const filteredPositions = Array.from(
    new Set(filteredCompetencies.map((competency) => competency.position.name))
  );

  const handleAddMember = (position, skill, activeDepartment) => {
    const positionId = filteredCompetencies.find(
      (skill) =>
        skill.department.name === activeDepartment &&
        skill.position.name === position
    ).position.id;
    setEditedNorms([
      ...editedNorms,
      {
        newNorm: newNorm.newNorm,
        skill: skill,
        position: position,
        department: activeDepartment,
        positionId: positionId,
      },
    ]);
    setAddNormModal(false);
  
  };

  const tableRows = uniqueSkills
    .map((skillName) => {
      
      const skillRow = {
        skill: skillName,
        norms: {},
        positions: new Set(),
      };
      filteredCompetencies.forEach((competency) => {
        if (competency.skill.name === skillName) {
          skillRow.norms[competency.position.name] = competency.norm;
          skillRow.skilltype = competency.skilltype
          skillRow.positions.add(competency.position.name);
        }
      });
      return skillRow;
    }).sort((a,b)=>a.skilltype.localeCompare(b.skilltype))
    .map((row) =>

    (
      <tr key={row.skill}>
        <td>{row.skill}</td>
        <td>{ row.skilltype}</td>
        {filteredPositions.map((position) =>
          row.norms[position] !== undefined ? (
            <td key={`${row.skill}-${position}`}>{row.norms[position]}</td>
          ) : (
            <>
             <td>-</td>
              {addNormModal &&
                selectedNorm ==
                  `${row.skill}-${position}-${row.norms[position + "id"]}` && (
                  <AddNormModal
                    activeDepartment={activeDepartment}
                    skill={row.skill}
                    position={position}
                    handleAddMember={handleAddMember}
                    newNorm={newNorm}
                    setNewNorm={setNewNorm}
                    setAddNormModal={setAddNormModal}
                    setEditedNorms={setEditedNorms}
                    editedNorms={editedNorms}
                    setSelectedNorm={setSelectedNorm}
                  />
                )}
            </>
          )
        )}
      </tr>
    )
    );

  const tableHeaders = [
    <th>
      Positions
      <hr />
      Competencies
    </th>, <th>
      Skill Type
    </th>,
    ...filteredPositions.map((position) => <th key={position} >{position}</th>),
  ];

  const accessToken = window.localStorage.getItem("access_token");
  const handleWeights = async (e) => {
    const a = await fetch("http://127.0.0.1:8000/wizard/Get_Weights/", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(""),
    })
      .then((a) => a.json())
      .then((data) => data);
    if (a.message == "success") {
      nav("/userperformance");
    } else {
      console.log(a);
    }
  };
  return (
    <>
      {matrixModal && (
        <MatrixModal
          fetchSkills={fetchSkills}
          positionDate={positionDate}
          activeDepartment={activeDepartment}
          setActiveDepartment={setActiveDepartment}
          setSelectedNorm={setSelectedNorm}
          setAddNormModal={setAddNormModal}
          addNormModal={addNormModal}
          setMatrixModal={setMatrixModal}
          tableHeaders={tableHeaders}
          tableRows={tableRows}
          uniqueSkills={uniqueSkills}
          newNorm={newNorm}
          setEditedNorms={setEditedNorms}
          editedNorms={editedNorms}
          filteredCompetencies={filteredCompetencies}
        />
      )}

      <Navbar />

      <div className="total-second">
        <div className="sidebar">
          <Sidebar />
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grab">
            <div className="mine-table">
              <div className="matrix-text">
                <p>WIZARD - Competency framework & Matrix</p>
              </div>
              <div className="department-btnsBox">
                {skills.map((department) => (
                  <>
                    {/* {performance.navigation.type === 1 &&
                      setActiveDepartment(department[0]?.name)} */}
                    <button
                      onClick={() => setActiveDepartment(department.name)}
                      key={department.id}
                      style={{
                        backgroundColor:
                          activeDepartment === department?.name
                            ? "#296198"
                            : "",
                        color:
                          activeDepartment === department?.name ? "#fff" : "",
                      }}
                      className="department-btns"
                    >
                      {department.name}
                    </button>
                  </>
                ))}
              </div>
              {filteredCompetencies.length === 0 ||
              filteredPositions.length === 0 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "20vh",
                    width: "100%",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "#296198",
                  }}
                >
                  Please select departament above
                </div>
              ) : (
                <div className="mine">
                  <table className="matrix-table">
                    <thead>
                      <tr>{tableHeaders}</tr>
                    </thead>

                    <tbody>{tableRows}</tbody>
                  </table>
                </div>
              )}
              <div className="matrix-btns">
                <Link to="/chart">
                  <button>Go back</button>
                </Link>
                <button onClick={() => setMatrixModal(true)}>Edit</button>

                <button className="magic" onClick={handleWeights}>
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Matrix;
