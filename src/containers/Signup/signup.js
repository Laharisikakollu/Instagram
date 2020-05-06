
// import SignUp from "../../components/Signup/Signup";
// import { connect } from "react-redux";
// import {setItem} from '../../services/signup';

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onNameChange: (value) => {
//       let success = "success";
//       if (
//         value.length < 4 ||
//         value.length > 30 ||
//         !/^[A-Z0-9_-]{3,30}$/i.test(value)
//       ) {
//         success = "warning";
//       }
//       dispatch({
//         type: "USERNAMECHANGE",
//         payload: {
//           userName: value,
//           success: success,
//         },
//       });
//     },

//     onPasswordChange: (value) => {
//       let success = "success";
//       if (!value || value.length < 5) {
//         success = "warning";
//       }
//       dispatch({
//         type: "PASSWORDCHANGE",
//         payload: {
//           password: value,
//           success: success,
//         },
//       });
//     },

//     onLogout: () =>
//       dispatch({
//         type: "LOGOUT",
//       }),

//     getItem: () =>
//       dispatch({
//         type: "GET",
//       }),

//     setItem: async (obj) => {
//       let set=await setItem(obj)
//       dispatch({
//         type: "SUBMIT",
//         payload:set,
//       });
//     },
    
//     setEmail: (value) => {
//       let success = "success";
//       if (!value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
//         success = "warning";
//       }
//       dispatch({
//         type: "EMAIL",
//         payload: {
//           email: value,
//           success: success,
//         },
//       });
//     },

//     setRole: (value) => {
//       let success = "success";
//       if (!value) {
//         success = "warning";
//       }
//       dispatch({
//         type: "ROLE",
//         payload: {
//           role: value,
//           success: success,
//         },
//       });
//     },

//     setPhone: (value) => {
//       let success = "success";
//       if (!/^\d{10}$/.test(value)) {
//         success = "warning";
//       }
//       dispatch({
//         type: "PHONE",
//         payload: {
//           phone: value,
//           success: success,
//         },
//       });
//     },
//   };
// };
// const mapStateToProps = (state) => ({
//   userName: state.signUp.userName,
//   password: state.signUp.password,
//   localStorageData: state.signUp.localStorageData,
//   phone: state.signUp.phone,
//   role: state.signUp.role,
//   email: state.signUp.email,
//   success: state.signUp.success,
//   userNameValidated: state.signUp.userNameValidated,
//   passwordValidated: state.signUp.passwordValidated,
//   emailValidated: state.signUp.emailValidated,
//   phoneValidated: state.signUp.phoneValidated,
//   roleValidated: state.signUp.roleValidated,
// });
// export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
