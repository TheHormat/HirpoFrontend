import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import LoadingSpinner from "../../components/Loader/Loader";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MatrixModal from "../../components/Modals/MatrixModal";
import refreshToken from "../Auth/Refresh";
import AddNormModal from "../../components/Modals/AddNormModal";
function Matrix() {
  refreshToken();
  const nav = useNavigate();
  const [activeDepartment, setActiveDepartment] = useState("HR");
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
  const project_id = window.localStorage.getItem("project");
   const getSkills = async () => {
     const token = localStorage.getItem("access_token");
     setIsLoading(true);
     const response = await fetch(`http://127.0.0.1:8000/wizard/upload/`, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });

     if (response.status === 401) {
       nav("/");
     } else {
       const skills = await response.json();
       setSkills(skills);
       setIsLoading(false);
     }
   };
  useEffect(() => {
   
    getSkills();
  }, []);
  let filteredCompetencies = [];
  if (activeDepartment) {
    const selectedDepartmentObj = skills?.find(
      (exCompetency) => exCompetency.name === activeDepartment
    );

    filteredCompetencies = selectedDepartmentObj
      ? selectedDepartmentObj.compatencies
      : [];
  }
  // else {
  //   filteredCompetencies = [];
  //   skills.map((exCompetency) => {
  //     filteredCompetencies = filteredCompetencies.concat(
  //       exCompetency.compatencies
  //     );
  //   });
  // }

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
          skillRow.positions.add(competency.position.name);
        }
      });
      return skillRow;
    })
    .map((row) => (
      <tr key={row.skill}>
        <td>{row.skill}</td>
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
    ));

  const tableHeaders = [
    <th>
      Positions
      <hr />
      Competencies
    </th>,
    ...filteredPositions.map((position) => <th key={position}>{position}</th>),
  ];
  const isAdmin = skills.detail;
  return (
    // <>
    //   {isAdmin == "besuper" ? (
    //     <div>
    //       <h1>You dont have an access</h1>
    //     </div>
    //   ) : (

    //   )
    //   }
    // </>
    <>
      {matrixModal && (
        <MatrixModal
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
          getSkills={getSkills}
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
          <>
            {skills.length > 0 ? (
              <div className="grab">
                <div className="mine-table">
                  <div className="department-btnsBox">
                    {skills.map((department) => (
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
                    ))}
                  </div>
                  <div className="mine">
                    <table className="matrix-table">
                      <thead>
                        <tr>{tableHeaders}</tr>
                      </thead>

                      <tbody>{tableRows}</tbody>
                    </table>
                  </div>
                  <div className="matrix-btns">
                    <Link to="/chart">
                      <button>Go back</button>
                    </Link>
                    <button onClick={() => setMatrixModal(true)}>Edit</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="wrong">
                <span>Something is wrong...</span>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
export default Matrix;
