// export const USERNAMECHANGE='USERNAMECHANGE';
// export const PASSWORDCHANGE='PASSWORDCHANGE';
// export const SUBMIT='SUBMIT';
// export const SET='SET';
// export const SETUSERUSERNAME='SETUSERUSERNAME';

export const onNameChange= (value) => {
    // let success = "success";
    // if (
    //   value.length < 4 ||
    //   value.length > 30 ||
    //   !/^[A-Z0-9_-]{3,30}$/i.test(value)
    // ) {
    //   success = "warning";
    // }
    // console.log(value,"value")
    return{
      type: "USERNAMECHANGE",
      payload: {
        userName: value
       
      }}
      
    
  }

  export const onPasswordChange=(value) => {
    // let success = "success";
    // if (!value || value.length < 5) {
    //   success = "warning";
    // }
    return{
      type: "PASSWORDCHANGE",
      payload: {
        password: value
      }}
    
  }

 export const onSubmits =  (submit) => {
    // let submit=await onSubmit(userName,password)
   return{
      type: "SUBMIT",
      payload: submit,
    }
  }

  export const setUserName=(value) =>{
   return{
      type: "SET",
      payload: value,
    }
}