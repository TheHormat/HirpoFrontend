import React from "react";
import Member from "./Member";
import AddCompetencyModal from "../Modals/AddCompetencyModal";
function Departament({ departament }) {
  const priority = {
    Junior: 5,
    Manager: 2,
    Senior: 3,
    Specialist: 4,
    "Top manager": 1,
  };
  const sortedData = departament?.departmentpositions.sort(
    (a, b) => priority[a.name] - priority[b.name]
  );

  console.log(sortedData)
  
  return (
    <>
      <ul className="departament">
        <p className="departamentName">{departament.name}</p>
        <ul className="members">
          {sortedData?.map((a, b) => (
            <Member
              report={sortedData.filter((c) => c.id === a.report_to)[0]?.name}
              positionLevel={sortedData.filter((c) => c.id === a.report_to)[0]?.name}
              member={a}
              key={b}
            />
          ))}
        </ul>
      </ul>
    </>
  );
}

export default Departament;
