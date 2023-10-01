import React from "react";
import { useState, useEffect } from "react";
import specialist from "../../images/member.png";
import "../modals.css";
import refreshToken from "../../../pages/Auth/Refresh";
import { useNavigate } from "react-router-dom";
import AddChart from "../AddChart";
function ChartModalMember({
  handleInput,
  reported,
  setReported,
  member,
  objects2,
  setObjects2,
  setChartModal,
  reports,
  getPositionData,
  sortedData,
}) {
  refreshToken();
  const nav = useNavigate();

  const [isBlur, setIsBlur] = useState(false);
  const handleDeleteMember = (id) => {
    setObjects2([...objects2, { id: id }]);
    setIsBlur(true);
  };
  let defaultV = reports.filter((a) => member.report_to == a.id)[0]?.id;
  if (member.report_to_ceo == true) {
    defaultV = "Ceo";
  }
  const [visible, setVisible] = useState(false);
  const visibility = () => {
    setVisible(!visible);
  };
  const getStyle = () => {
    return visible ? { display: "block" } : { display: "none" };
  };
  const [addChartModal, setAddChartModal] = useState(false);
  const handleDeleteChart = async (e, id) => {
    e.preventDefault();
    const a = await fetch(
      `http://127.0.0.1:8000/wizard/PositionDeleteView/${id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(""),
      }
    )
      .then((a) => a)
      .then((data) => data);
    if (a.status == 403) {
      alert("This position has already been added");
    }
    getPositionData();
  };

  console.log(member);

  return (
    <>
      {addChartModal && (
        <AddChart
          getPositionData={getPositionData}
          setAddChartModal={setAddChartModal}
          memberId={member.id}
          reports={reports}
          memberName={member?.name}
          memberDesc={member?.description}
          handleInput={handleInput}
        />
      )}
      <li className={`member ${isBlur ? "blur-background" : ""}`}>
        {/* MEMBER IMAGE */}
        <div className="member-image">
          <div className="ellipse-image">
            <div className="specialist-image">
              <img src={specialist} />
            </div>
          </div>
        </div>

        {/* MEMBER DETAILS */}
        <div className="member-details">
          <div className="member-name">
            <p>{member.name}</p>
          </div>

          <div className="delete-chart-user">
            <button onClick={() => handleDeleteMember(member.id)}>
              &#x58;
            </button>
          </div>
          <div className="editbtn" onClick={() => setAddChartModal(true)}>
            <button>&#x270E;</button>
          </div>
        </div>
        <div className="texting">
          <div className="newText" style={getStyle()}>
            {member.positions?.map((a) => (
              <div className="newtextLis">
                <div
                  className="textLi"
                  style={{ width: "255px", overflowX: "scroll" }}
                >
                  {a.name}
                </div>
                <div className="delete-chart-add-user">
                  <button onClick={(e) => handleDeleteChart(e, a.id)}>
                    &#x58;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="select">
          {" "}
          <select onChange={(e) => handleInput(e.target.value, member.id)}>
            <option value="default">Select Report To</option>
            <option value="Ceo">Ceo</option>
            {reports.map((a) => (
              <option value={a.id} key={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div> */}
      </li>
    </>
  );
}

export default ChartModalMember;
