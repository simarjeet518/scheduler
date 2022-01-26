import React,{useState} from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

export default function Form(props) {
  const [student, setStudent] = useState(props.student||"");
  const [interviewer, setInterviewer] = useState(props.interviewer|| null);
  const [error, setError] = useState("");

  function reset(){
    setStudent("");
    setInterviewer("");
  }

function cancel(){
   reset();
   props.onCancel(); 
}

function handleSubmit(event) {
  event.preventDefault();
}

function validate() {
  if (student === "") {
    setError("Student name cannot be blank");
    return;
  }
  setError("")
  props.onSave(student, interviewer);
}

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={student}
            type="text"
            placeholder="Enter Student Name"
            onChange= {(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
         interviewers={props.interviewers}
         value={interviewer}
         onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  )
}