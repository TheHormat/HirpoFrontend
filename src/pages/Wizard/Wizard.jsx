import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useState,useEffect} from "react";
import "./wizard.css";
import refreshToken from "../Auth/Refresh";
function Wizard() {
  // "lllllllllllll"
  refreshToken();
  const nav = useNavigate();
  const companyleader = window.localStorage.getItem("userId");
  const [newDepName, setNewDepName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [project_name, setProject_name] = useState("");
  const [industry, setIndustry] = useState("");
  const [employee_number, setEmployee_number] = useState("");
  const [objects2, setObjects] = useState([]);
  const [selectedObjects, setSelectedObjects] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [formError, setFormError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [dep_btns, setDep_btns] = useState([
    {
      id: 1,
      name: "HR",
    },
    {
      id: 2,
      name: "Sales",
    },
    {
      id: 3,
      name: "IT",
    },
    {
      id: 4,
      name: "Accounting",
    },
    {
      id: 5,
      name: "Procurement",
    },
  ]);
  const [projectNameError, setProjectNameError] = useState(
    ""
    // project_name.trim() === "" ? "Project name cannot be empty" : ""
  );
  let names = dep_btns.map((a) => a.name)
  const handleAddDep = () => {
    if (!names.includes(newDepName)) {
      const newDep = {
        id: dep_btns.length + 1,
        name: newDepName,
      };
      setDep_btns([...dep_btns, newDep]); 
      setNewDepName(""); 
      setShowInput(false);
    }
    else {
      setShowInput(false);
      alert("This name has already been declared")

    }
  };
  const handleCheck = (e) => {
    e.preventDefault();
    const checkID = {
      project_name,
      industry,
    };
    const emptyInputs = Object.values(checkID).some(
      (value) => value.trim() === "" || value === "industry"
    );

    if (emptyInputs) {
      setFormError("Please fill in all the required fields *");
    }
    else if (employee_number == 0) {setFormError("Please fill employee number"); } else {
      setFormError("");
      setWizardModal(true)
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const objects = objects2.map((a) => ({ name: a }));
    const data = {
      project_name,
      industry,
      employee_number,
      inputValues,
    };
      const nonEmptyValues = {};
      for (const [key, value] of Object.entries(inputValues)) {
        if (value.trim() !== "") {
          nonEmptyValues[key] = value.trim();
        }
    }
      const accessToken = window.localStorage.getItem("access_token");
      const data2 = await fetch("http://127.0.0.1:8000/wizard/start", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...data, inputValues: nonEmptyValues }),
      })
        .then((result) => result)
        .then((response) => response.json());
      if (data2.detail == "besuperuser") {
        document.getElementById("permit").style.display = "block";
        
      }
      if (data2.message == "success") {
        nav("/chart");
    }
  };
  const sum = Object.values(inputValues).reduce((acc, value) => {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      return acc + numValue;
    }
    return acc;
  }, 0);
  if (sum > employee_number) {
    setEmployee_number(sum)
  }
  const accessToken = window.localStorage.getItem("access_token");
  const [wizardModal, setWizardModal] = useState(false);
  const handleDelete = async () => {
    const data2 = await fetch("http://127.0.0.1:8000/wizard/project_delete", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ delete: "delete" }),
    })
      .then((result) => result)
      .then((response) => response.json());
  };
  return (
    <>
      <Navbar />
      <div className="total-second">
        <div className="sidebar">
          <Sidebar />
        </div>

        <div className="second">
          <div className="wrapper">
            {wizardModal && (
              <>
                <div className={`modalWrapper open`}>
                  <div className="test">
                    <span id="wizard-reminder">
                      Are you sure you want to create a new project?
                      <p id="reminder">
                        Reminder:The previous project will be deleted
                      </p>
                    </span>
                    <div className="wizard-modal-btns">
                      <p id="permit">You have not permission</p>
                      <button
                        onClick={() => setWizardModal(false)}
                        className="cancel-new"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={handleSubmit2}
                        // onClick={async () => {
                        //   await handleDelete();
                        //   handleSubmit2();
                        // }}
                        id="create"
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {showInput && (
              <div className={`modalWrapper open`}>
                <div className="add-member-modal">
                  <div className="test">
                    <label htmlFor="newDepartment">Add new department:</label>
                    <input
                      className="add-wizard"
                      id="newDepartment"
                      placeholder="Department name"
                      type="text"
                      value={newDepName}
                      onChange={(e) => setNewDepName(e.target.value)}
                    />
                    <div className="editDepartmentBtns">
                      <button onClick={handleAddDep} className="add-new">
                        Add department
                      </button>
                      <button
                        className="cancel-new"
                        onClick={() => setShowInput(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <form className="industry-inputs" onSubmit={handleSubmit}>
              {formError && <p className="error">{formError}</p>}
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
                placeholder={sum != 0 ? sum : "Employee number"}
                // defaultValue={sum}
                value={employee_number || ""}
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
                max={sum}
              />
              <p>Pick up your section/function area</p>
              <div className="areas">
                <div className="first-area">
                  {dep_btns.map((a, b) => (
                    <div className="departInput" key={b}>
                      <div className="formgroup field">
                        <input
                          required=""
                          placeholder="Name"
                          className="formfield"
                          type="number"
                          onKeyDown={(evt) =>
                            ["e", "E", "+", "-"].includes(evt.key) &&
                            evt.preventDefault()
                          }
                          name={a.name}
                          value={inputValues[a.name]|| ""}
                          onChange={handleInputChange}
                        />
                        <label className="formlabel" htmlFor="name">
                          {a.name}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="second-area">
                  <button onClick={() => setShowInput(!showInput)}>
                    <i className="fa-solid fa-plus"></i>Add yourself
                  </button>
                </div>
              </div>
              <div className="magic-btns">
                <button id="disregard" type="reset">
                  Disregard
                </button>
                {/* <Link to="/chart"> */}

                <button
                  className="magic"
                  type="submit"
                  onClick={(e) => handleCheck(e)}
                >
                  Start magic
                </button>
                {/* </Link> */}
              </div>
         
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Wizard;
