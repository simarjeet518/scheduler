import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss"

export default function InterviewerList(props) {
 
  const InterviewerListItems = props.interviewers.map((interviewer) => 
   <InterviewerListItem
     key={interviewer.id}
     id ={interviewer.id}
     name={interviewer.name} 
     avatar={interviewer.avatar} 
     selected={interviewer.id === props.interviewer}
     setInterviewer={props.setInterviewer}  
    />
  );
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{InterviewerListItems}</ul>
    </section>
  );
}