import React, { useEffect } from "react";
import { useState } from "react";
import AddNormModal from "./AddNormModal";
import "./modals.css";
import AddCompetencyModal from "./AddCompetencyModal";
function MatrixModal({
  activeDepartment,
  setMatrixModal,
  setAddNormModal,
  setSelectedNorm,
  newNorm,
  setEditedNorms,
  editedNorms,
  positionDate,
  getSkills,
  fetchSkills,
}) {
  const [skills, setSkills] = useState([]);
  const [addCompetencyModal, setCompetencyModal] = useState(false);
  const getNewSkills = async () => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`http://127.0.0.1:8000/wizard/upload/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 401) {
      nav("/login");
    } else {
      const skills = await response.json();
      setSkills(skills);
    }
  };
  useEffect(() => {
    getNewSkills();
  }, []);

  let filteredCompetencies = [];
  if (activeDepartment) {
    const selectedDepartmentObj = skills?.find(
      (exCompetency) => exCompetency.name === activeDepartment
    );
    filteredCompetencies =
      selectedDepartmentObj && selectedDepartmentObj.compatencies
        ? selectedDepartmentObj.compatencies
        : [];
  } else {
    filteredCompetencies = [];
    skills.map((exCompetency) => {
      filteredCompetencies = filteredCompetencies.concat(
        exCompetency.compatencies
      );
    });
  }

  const skillNames = [];
  filteredCompetencies.map((skill) => {
    skillNames.push(skill.skill.name);
  });

  const uniqueSkills = [...new Set(skillNames)].sort();
  const [isBlur, setIsBlur] = useState(false);
  const [removedNorms, setRemovedNorms] = useState([]);
  const [blurred, setBlurred] = useState([]);

  const deleteCompetency = (normId, position, skill) => {
    setRemovedNorms([...removedNorms, normId]);
    setBlurred([...blurred, `${skill}-${position}-${normId}`]);
    setOlan((olan) => olan.filter((item) => item.id !== normId));
  };

  const deleteNewCompetency = (position, skill) => {
    setBlurred([...blurred, `${skill}-${position}`]);
    setEditedNorms((editedNorms) =>
      editedNorms.filter(
        (item) => item.position !== position || item.skill !== skill
      )
    );
  };

  const [newNormAdded, setNewNormAdded] = useState(false);
  const [olan, setOlan] = useState([]);
  const handleInputChange = (e, position, skill, activeDepartment, id) => {
    const existingIndex = olan.findIndex((obj) => obj.id === id);
    if (existingIndex !== -1) {
      const copyOlan = [...olan];
      copyOlan[existingIndex] = {
        ...copyOlan[existingIndex],
        norm: e > 5 ? 5 : e,
      };
      setOlan(copyOlan);
    } else {
      setOlan([...olan, { norm: e > 5 ? 5 : e, id }]);
    }

    const item = filteredCompetencies.find(
      (a) =>
        a.skill.name === position &&
        a.department.name === activeDepartment &&
        a.position.name === skill
    );
    item.norm = Number(e > 5 ? 5 : e);
  };
  const filteredPositions = Array.from(
    new Set(filteredCompetencies.map((competency) => competency.position.name))
  );

  const handleChange = (e, skill, position, activeDepartment) => {
    const existingIndex = editedNorms.findIndex(
      (obj) => obj.skill === skill && obj.position === position
    );
    const positionId = filteredCompetencies.find(
      (skill) =>
        skill.department.name === activeDepartment &&
        skill.position.name === position
    ).id;
    if (existingIndex !== -1) {
      const copyOlan = [...editedNorms];
      copyOlan[existingIndex] = { ...copyOlan[existingIndex], newNorm: e };
      setEditedNorms(copyOlan);
    } else {
      setEditedNorms([
        ...olan,
        {
          newNorm: e,
          position: position,
          skill: skill,
          department: activeDepartment,
          positionId: positionId,
        },
      ]);
    }
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
          skillRow.norms[competency.position.name + "id"] = competency.id;
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
            <td
              key={`${row.skill}-${position}`}
              className={` ${
                blurred.includes(
                  `${row.skill}-${position}-${row.norms[position + "id"]}`
                )
                  ? "blur-background"
                  : ""
              }`}
            >
              <div
                className={` ${
                  blurred.includes(`  ${row.skill}-${position}`)
                    ? "blur-background"
                    : "normInput"
                }`}
              >
                <input
                  id={row.norms[position + "id"]}
                  type="text"
                  placeholder={row.norms[position]}
                  onChange={(e) =>
                    handleInputChange(
                      Number(
                        e.target.value > 5
                          ? (e.target.value = 5)
                          : e.target.value
                      ),
                      row.skill,
                      position,
                      activeDepartment,
                      row.norms[position + "id"]
                    )
                  }
                />

                <button
                  id="deleteNorm"
                  onClick={() =>
                    deleteCompetency(
                      row.norms[position + "id"],
                      position,
                      row.skill
                    )
                  }
                >
                  &times;
                </button>
              </div>
            </td>
          ) : (
            <td>
              {editedNorms?.find(
                (a) => a.skill === row.skill && a.position === position
              ) ? (
                <div className="normInput">
                  <input
                    placeholder={
                      editedNorms.find(
                        (n) => n.skill === row.skill && n.position === position
                      )?.newNorm || ""
                    }
                    onChange={(e) =>
                      handleChange(
                        e.target.value > 5
                          ? (e.target.value = 5)
                          : e.target.value,
                        row.skill,
                        position,
                        activeDepartment
                      )
                    }
                  />
                  <button
                    id="deleteNorm"
                    onClick={() => deleteNewCompetency(position, row.skill)}
                  >
                    &times;
                  </button>
                </div>
              ) : (
                <button
                  className="add-member"
                  key={`${row.skill}-${position}`}
                  onClick={(e) => {
                    setSelectedNorm(
                      `${row.skill}-${position}-${row.norms[position + "id"]}`
                    );
                    setAddNormModal(true);
                  }}
                >
                  +
                </button>
              )}
            </td>
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
  const handleSubmit = async (e) => {
    // window.location.reload();
    e.preventDefault();
    const a = await fetch(
      "http://127.0.0.1:8000/wizard/WizardComptencySaveView",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          createdNorms: editedNorms,
          removedNorms: removedNorms,
          editedNorms: olan,
        }),
      }
    )
      .then((a) => a.json())
      .then((data) => data);
    if (location.pathname == "/competencyframework") {
      getSkills();
    } else {
      fetchSkills();
    }

  };
  const cancel = (e) => {
   if (location.pathname == "/competencyframework") {
     getSkills();
   } else {
     fetchSkills();
   }
setMatrixModal(false);

};
  return (
    <>
      <div className={`modalWrapper open`}>
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <p id="departmentName">Department:{activeDepartment}</p>
            </div>
            <div className="modal-body">
              <table className="matrix-table">
                <thead>
                  <tr>{tableHeaders}</tr>
                </thead>
                <tbody>{tableRows}</tbody>
              </table>
            </div>
            <div className="chart-btns">
              <button onClick={cancel}>Cancel</button>
              <button
                className="magic"
                onClick={() => setCompetencyModal(true)}
              >
                Add
              </button>
              <button
                className="magic"
                onClick={(e) => {
                  handleSubmit(e), setMatrixModal(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddCompetencyModal
        getNewSkills={getNewSkills}
        activeDepartment={activeDepartment}
        positionDate={positionDate}
        setCompetencyModal={setCompetencyModal}
        addCompetencyModal={addCompetencyModal}
        filteredCompetencies={filteredCompetencies}
      />
    </>
  );
}

export default MatrixModal;
