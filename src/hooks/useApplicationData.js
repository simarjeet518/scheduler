import { useState, useEffect } from 'react';
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


  function cancelInterview(id) {  
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(state, appointments)

    return (
      axios.delete(`api/appointments/${id}`, appointment)
        .then((res) =>
          setState({
            ...state,
            appointments,
            days    
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
    const days = updateSpots(state, appointments)

    return (
      axios.put(`api/appointments/${id}`, appointment)
        .then((res) =>
          setState({
            ...state,
            appointments,
            days      
          }))      
    )
  }


  const getSpotsForDay = function(dayObj, appointments){
    let spots = 0;

    for(const id of dayObj.appointments){
      if(!appointments[id].interview){
        spots++;
      }
    }

    return spots;
  }


  const updateSpots = function(state, appointments){

    const dayObj = state.days.find(day => day.name === state.day);   //find day from state (modify spots) then replace 
    const spots = getSpotsForDay(dayObj, appointments);
    const day = {...dayObj, spots};
    
    return state.days.map(stateDay => stateDay.name === state.day ? day : stateDay)
  }

  return { state, setDay, bookInterview, cancelInterview };
}