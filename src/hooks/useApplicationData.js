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
            appointments
        
          }),
          spotsRemaining(state,id,false,true)
         )
         
    )
  }

  function bookInterview(id, interview, book) {
    
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
            appointments
            
          }),
          spotsRemaining(state,id,book,false)
         )
          
    )
  }

  function spotsRemaining(state, id, book, cancel) {
    let result = [];
    const appointmentDay = state.days.filter(daysData =>
      daysData.appointments.includes(id)
    );
    result = [...appointmentDay];
    if (state.appointments[id].interview === null && book === true) {
       return result[0].spots -= 1;  
    }
    if (state.appointments[id].interview !== null && cancel === true) {
      return  result[0].spots += 1;
    }

  }

  return { state, setDay, bookInterview, cancelInterview };
}