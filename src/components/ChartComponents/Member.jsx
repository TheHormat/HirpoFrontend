import React from "react";
import specialist from "../images/member.png";
import description from "../images/description.png";
import { useState, useEffect } from "react";

function Member({ member, report }) {
  const [departaments, setDepartaments] = useState([]);
  const project_id = window.localStorage.getItem("project");
  const [visible, setVisible] = useState(false);
  const visibility = () => {
    setVisible(!visible);
  };
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
      } else if (response.status === 403) {
        nav("/userproject");
      } else {
        const departaments = await response.json();
        setDepartaments(departaments);
      }
    };
    getData();
  }, []);
  const getStyle = () => {
    return visible ? { display: "block" } : { display: "none" };
  };

  return (
    <>
      <li className="member">
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
          <div className="description-image">
            <img src={description} />
            <div className="hidden">
              <div className="hiddenText">
                {" "}
                Report to:{" "}
                {member?.report_to_ceo == true
                  ? 'Ceo'
                  : member?.report_tos.name}
              </div>
              <hr />
              <div className="hiddenText">
                {" "}
                Position level: {member?.positionlevel}
              </div>
              <hr />
              <div className="hiddenText">
                {" "}
                Description: {member?.description}
              </div>
            </div>
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
              </div>
            ))}
          </div>
        </div>
      </li>
    </>
  );
}

export default Member;
