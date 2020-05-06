// export const USERNAMECHANGE='USERNAMECHANGE';
// export const PASSWORDCHANGE='PASSWORDCHANGE';
// export const GET='GET';
// export const LOGOUT='LOGOUT';
// export const SUBMIT='SUBMIT';
// export const EMAIL='EMAIL';
// export const PHONE='PHONE';
// export const ROLE='ROLE';

export const onNameChange= (value) => {
    // let success = "success";
    // if (
    //   value.length < 4 ||
    //   value.length > 30 ||
    //   !/^[A-Z0-9_-]{3,30}$/i.test(value)
    // ) {
    //   success = "warning";
    // }
    return{
      type: "USERNAMECHANGE",
      payload: {
        userName: value
       
      }}
    
  }

  export const onPasswordChange=(value,success) => {
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

  export const onLogout= () =>
  {
    return{
      type: "LOGOUT",
    }}

  export const getItem= () =>
  {
    return{
      type: "GET",
    }}

  export const setItems=async (set) => {
    // let set=await setItems(obj)
    return{
      type: "SUBMIT",
      payload:set,
    
  }}
  
//   export const setEmail= (value) => {
//     let success = "success";
//     if (!value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
//       success = "warning";
//     }
//     return{
//       type: "EMAIL",
//       payload: {
//         email: value,
//         success: success,
//       }}
    
//   }

//   export const setRole= (value) => {
//     let success = "success";
//     if (!value) {
//       success = "warning";
//     }
//     return{
//       type: "ROLE",
//       payload: {
//         role: value,
//         success: success,
//       }}
    
//   }

//   export const setPhone= (value) => {
//     let success = "success";
//     if (!/^\d{10}$/.test(value)) {
//       success = "warning";
//     }
//     return{
//       type: "PHONE",
//       payload: {
//         phone: value,
//         success: success,
//       }}
    
//   }

