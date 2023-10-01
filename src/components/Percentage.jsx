import React from "react";

const Percentage = ({ percentage }) => {
  const radius = 100; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const offset = circumference - (percentage / 100) * circumference; // Offset based on the percentage

  return (
    <svg
      width={radius * 3}
      height={radius * 2}
      viewBox={`-10 -10 ${radius * 3} ${radius * 3}`}
    >
      <circle
        className="circle"
        r={radius}
        cx={radius}
        cy={radius}
        stroke="#b9cde1"
        strokeWidth="7"
        fill="transparent"
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: offset,
        }}
      />
      <text
        x="20%"
        y="40%"
   
        style={{
          color: "#3778b8",
        }}
        // dominantBaseline="middle"
        // textAnchor="middle"
        fontSize="48"
      >
        {percentage}%
      </text>
    </svg>
  );
};

export default Percentage;
