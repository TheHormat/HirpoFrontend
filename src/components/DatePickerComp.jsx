import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComp = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="date">
      <h2>Select a Date</h2>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        minDate={new Date()}
        maxDate={new Date().setDate(new Date().getDate() + 30)}
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
};

export default DatePickerComp;
