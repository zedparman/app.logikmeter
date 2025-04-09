"use client";
import React, { useState } from "react";
import { InputDatePicker } from "jalaali-react-date-picker";
// import { Calendar, DatePicker } from "react-persian-datepicker";

import "./PersainDate.css";
const PersianDatePicker = () => {
  const [data, setDate] = useState("");
  return <InputDatePicker value={data} onChange={(e) => setDate(e)} />;
};

export default PersianDatePicker;
