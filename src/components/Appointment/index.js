import React from "react";
import "./style.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(error => transition(ERROR_SAVE, true));
  }
  

  function confirmDelete() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(error => transition(ERROR_DELETE, true));
  }


  return (
    <article className="appointment">
      <Header
        time={props.time}
      />

      {mode === EMPTY &&
        <Empty
          onAdd={() => transition(CREATE)}
        />}

      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />}

      {mode === SAVING &&
        <Status
          message="Saving"
        />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer || { interviewer: { name: "" } }}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === EDIT &&
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />}

      {mode === CONFIRM &&
        <Confirm
          message={"Are you sure you would like to delete"}
          onCancel={() => back()}
          onConfirm={() => confirmDelete()}
        />}

      {mode === DELETING &&
        <Status
          message="Deleting"
        />}

      {mode === ERROR_SAVE &&
        <Error
          message={"Could not save appointment"}
          onClose={() => transition(CREATE, true)}
        />}

      {mode === ERROR_DELETE &&
        <Error
          message={"Could not cancel appointment"}
          onClose={() => back()}
        />}
    </article>
  );
}