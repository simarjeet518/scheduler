import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ])
      .then((all) => {
        setState(prev => {
          return ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data })
        });
      })
  }, [])

  const setDay = day => setState({ ...state, day });

  function cancelInterview(id, interview) {
    let daysCopy = [...state.days];
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return (
      axios.delete(`api/appointments/${id}`, appointment)
        .then((res) =>
          setState({
            ...state,
            appointments,
            days: spotsRemaining(daysCopy, id, state.appointments)
          }))
    )
  }

  function bookInterview(id, interview) {
    let daysCopy = [...state.days];
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return (
      axios.put(`api/appointments/${id}`, appointment)
        .then((res) =>
          setState({
            ...state,
            appointments,
            days: spotsRemaining(daysCopy, id, state.appointments)
          }))
    )
  }

  function spotsRemaining(daysCopy, id, appointment_s) {
    let day = daysCopy.find(days => days.appointments.includes(id));
    let spots=5;
  
      day.appointments.forEach(item =>{
        console.log(appointment_s[item].interview);
      })
     
      return daysCopy;
  }
  return { state, setDay, bookInterview, cancelInterview };
}