import React from "react";
import ChartModalMember from "./ChartModalMember";
import "../modals.css";
import { useState } from "react";
function ModalDepartament({
  handleInput,
  setReported,
  reported,
  departament,
  objects2,
  setObjects2,
  setChartModal,
  handleClick,
  getPositionData
})
{
    const priority = {
      Junior: 5,
      Manager: 2,
      Senior: 3,
      Specialist: 4,
      "Top manager": 1,
      Ceo:6
    };
    const sortedData = departament?.departmentpositions.sort(
      (a, b) => priority[a.name] - priority[b.name]
  );

  return (
    <>
      <ul className="departament">
        <p className="departamentName">{departament.name}</p>
        <ul className="members">
          {sortedData?.map((a, b) => (
            <ChartModalMember
              getPositionData={getPositionData}
              reported={reported}
              setReported={setReported}
              handleInput={handleInput}
              setChartModal={setChartModal}
              setObjects2={setObjects2}
              objects2={objects2}
              departament={departament}
              member={a}
              reports={sortedData?.filter(
                (b) =>
                  b.department?.name === a.department?.name &&
                  priority[b.name] < priority[a.name]
              )}
              key={b}
            />
          ))}
        </ul>
        <button className="add-member" onClick={(sortedData)=>handleClick(sortedData)}>
          +
        </button>
      </ul>
    </>
  );
}

export default ModalDepartament;
