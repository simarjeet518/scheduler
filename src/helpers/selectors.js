export function getAppointmentsForDay(state,day){
  let result =[];
  
   const appointmentDay = state.days.filter(daysData => 
   daysData.name === day);
   
   if(appointmentDay.length>0){
    appointmentDay[0].appointments.forEach(item =>{
      result.push(state.appointments[item]);
   })
   }
   return result;
 
 }

 export function getInterviewersForDay(state,day){
  let result =[];
  
   const interviewersForDay = state.days.filter(daysData => 
   daysData.name === day);
   
   if(interviewersForDay.length>0){
    interviewersForDay[0].interviewers.forEach(item =>{
      result.push(state.interviewers[item]);
   })
   }
   return result;
 
 }

 export function getInterview(state,interview){
    let result = {...interview};
    
    if(interview){
       const id = result.interviewer;
       delete result['interviewer']; 
       result.interviewer = state.interviewers[id]
       return result;
       
     } 
     return interview;

 }