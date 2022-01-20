import React from "react";
import style from "./style.scss";
export default function Appointment(props){
   
  return (
    <article className="appointment">
    <p>{props.time?`Appointment at ${props.time}`:'No Appointments'}</p>
    </article>
  );
}