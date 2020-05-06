// import { connect } from "react-redux";
// import UserRequest from "../../components/admin/userRequest";
// import {onGetRequests} from '../../services/admin';
// import {accept} from '../../services/admin';
// import {decline} from '../../services/admin';

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onGetRequests: async () => {
//     let getRequests=await onGetRequests()
//       dispatch({
//         type: "GETREQUESTS",
//         payload: getRequests,
//       });
//     },

//     accept: async (data) => {
//      let accepts=await accept(data)
//       dispatch({
//         type: "ACCEPT",
//         payload: accepts,
//       });
//     },

//     decline: async (data) => {
//       let declines=await decline(data)
//       dispatch({
//         type: "REJECT",
//         payload: declines,
//       });
//     },
//   };
// };
// const mapStateToProps = (state) => ({
//   requests: state.admin.requests,
// });
// export default connect(mapStateToProps, mapDispatchToProps)(UserRequest);
