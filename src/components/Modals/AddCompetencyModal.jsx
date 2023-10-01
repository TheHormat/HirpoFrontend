import React, { useState ,useEffect} from "react";
import "./modals.css";
import axios from "axios";

function AddCompetencyModal({
  setCompetencyModal,
  addCompetencyModal,
  filteredCompetencies,
  positionDate,
  activeDepartment,
  getNewSkills,
}) {
  const [selectedPosition, setSelectedPosition] = useState("");
  const [skillType, setSkillType] = useState("");
  const [name, setName] = useState();
  const [normForCompetency, setnormForCompetency] = useState();

  const positionData = Array.from(
    new Set(filteredCompetencies?.map((competency) => competency.position))
  );
  const uniquePositions = Array.from(
    new Set(positionData.map((pData) => JSON.stringify(pData)))
  ).map((pData) => JSON.parse(pData));
  const handleSubmit = (event) => {
    event.preventDefault();
    const requestData = {
      position: Number(selectedPosition),
      name,
      skilltype: skillType,
      norm: parseInt(normForCompetency),
    };
    axios
      .post("http://127.0.0.1:8000/wizard/CreateMainSkill/", requestData)
      .then((response) => {
      })
      .catch((error) => {
        if (error.message === "Request failed with status code 409") {
          window.alert(
            "Bu bacariq artiq elave edilmisdir. Zehmet olmasa davamkeeee"
          );
        }
        console.log(error)
      });

    setCompetencyModal(false);
    getNewSkills();
  };
  const [pnames, setPnames] = useState([]);
  const getPname = async () => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(
      `http://127.0.0.1:8000/wizard/ListPositionView/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 401) {
      nav("/login");
    } else {
      const pnames = await response.json();
      setPnames(pnames);
    }
  };
  useEffect(() => {
    getPname();
  }, []);
  const selectablePositions = pnames.filter(
    (a) => a.name == activeDepartment
  )[0]?.departmentpositions;
  
  return (
    <>
      <div className={`modalWrapper ${addCompetencyModal ? "open" : ""}`}>
        <div className="addMemberModal">
          <div className="testAdd">
            <form onSubmit={handleSubmit}>
              <label htmlFor="newNorm">Add new Competency:</label>

              <select
                name="selectedPosition"
                id="selectedPosition"
                style={{ width: "240px" }}
                value={selectedPosition}
             
                onChange={(event) => setSelectedPosition(event.target.value)}
                required
              >
                <option value="" disabled selected >
                  Select position level
                </option>

                {selectablePositions?.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
              <select
                name="skillType"
                onChange={(e) => setSkillType(e.target.value)}
                value={skillType}
                style={{ width: "240px" }}
                required
              >
                <option value="" disabled selected>
                  Select Skill Type
                </option>
                <option value="Hard">Hard</option>
                <option value="Soft">Soft</option>
              </select>
              <input
                placeholder="New Competency"
                id="newCompetency"
                name="newCompetency"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <input
                placeholder="Norm"
                id="newNorm"
                name="newNorm"
                value={normForCompetency}
                onChange={(event) => setnormForCompetency(event.target.value)}
              />

              <div className="editDepartmentBtns">
                <button
                  type="button"
                  className="cancel-new"
                  onClick={() => setCompetencyModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="add-new">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCompetencyModal;
