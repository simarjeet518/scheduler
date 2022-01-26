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
    spotsRemaining(state,id,false);
    return (
      axios.delete(`api/appointments/${id}`, appointment)
        .then((res) =>
          setState({
            ...state,
            appointments
        
          }))
         
    )
  }

  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    spotsRemaining(state,id,true);
    return (
      axios.put(`api/appointments/${id}`, appointment)
        .then((res) =>
          setState({
            ...state,
            appointments
            
          }))
          
    )
  }

  function spotsRemaining(state, id, book) {
    let result = [];
    const appointmentDay = state.days.filter(daysData =>
      daysData.appointments.includes(id)
    );
    result = [...appointmentDay];
    result[0].spots = 0;
    appointmentDay[0].appointments.forEach(item => {
      if (state.appointments[item].interview === null) {
        result[0].spots += 1;
      }
    })
    result[0].spots = book ? result[0].spots - 1 : result[0].spots + 1;
  }

  return { state, setDay, bookInterview, cancelInterview };
}