import React from "react";
import { useState } from "react";

function NewProjectModal({ setNewProjectModal,getData }) {
  const [project_name, setProject_name] = useState("");
  const [projectNameError, setProjectNameError] = useState(
    ""
    // project_name.trim() === "" ? "Project name cannot be empty" : ""
  );
  const [industry, setIndustry] = useState("");
  const [employee_number, setEmployee_number] = useState("");
  const [industryError, setIndustryError] = useState("");
  const handleIndustryChange = (e) => {
    const selectedValue = e.target.value;
    setIndustry(selectedValue);
    if (selectedValue === "industry") {
      setIndustryError("Please select an industry");
    } else {
      setIndustryError("");
    }
  };
  const handleProjectNameChange = (e) => {
    const inputValue = e.target.value.trim();
    setProject_name(inputValue);
    if (inputValue === "") {
      setProjectNameError("Project name cannot be empty");
    } else {
      setProjectNameError("");
    }
  };
  

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    const data = {
      project_name,
      industry,
      employee_number,
    };

 

    const accessToken = window.localStorage.getItem("access_token");

    // Send non-empty input values in the request body
    const data2 = await fetch("http://127.0.0.1:8000/wizard/CreateProject/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify( data ),
    })
      .then((result) => result)
      .then((response) => response.json());
      setNewProjectModal(false);
      getData();

  };
  return (
    <>
      <div className={`modalWrapper open`}>
        <div className="employeeModal">
          <form className="industry-inputs">
            {" "}
            <input
              type="text"
              placeholder="Project name"
              value={project_name}
              onChange={handleProjectNameChange}
              className={projectNameError && "invalid"}
            />
            <select
              value={industry}
              onChange={handleIndustryChange}
              className={industryError && "invalid"}
            >
              <option value="industry">Choose your industry</option>
              <option value="Construction">Construction</option>
              <option value="Agriculture">Agriculture</option>
              <option value="IT-service">IT-service</option>
              <option value="Government">Government</option>
              <option value="Retail">Retail</option>
              <option value="FMCG">FMCG</option>
              <option value="Hospitality-Horeca">Hospitality-Horeca</option>
              <option value="Startup-Innovation">Startup-Innovation</option>
              <option value="Transport">Transport</option>
              <option value="R&D-Science">R&D-Science</option>
              <option value="Art-culture">Art-culture</option>
              <option value="Sports & Health">Sports & Health</option>
              <option value="Fashion">Fashion</option>
              <option value="Banking-insurance">Banking-insurance</option>
            </select>
            <input
              type="number"
              placeholder="Employee number"
              value={employee_number}
              onKeyDown={(evt) =>
                ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
              }
              onChange={(e) =>
                setEmployee_number(
                  e.target.value
                  // e.target.value > sum ? sum : e.target.value
                )
              }
              min={1}
            />
            <div className="resetmodal-btns">
              <button
                className="reset-cancel"
                onClick={() => setNewProjectModal(false)}
              >
                Cancel
              </button>
              <button className="add-user" onClick={handleSubmit2}>
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewProjectModal;
