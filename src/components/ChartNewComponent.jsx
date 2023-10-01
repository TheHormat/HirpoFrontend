import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
function ChartNewComponent() {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
const data = {
  labels,
  datasets: [
    {
      label: "Departments",
      data: [100, 200, 300, 400, 500, 600, 700], // Your own data here
      backgroundColor: " #3778b8 ",
    },
  ],
};
 return (
   <div style={{ width: "50%" }}>
     <Bar data={data}/>
   </div>
 );
;
}
export default ChartNewComponent;