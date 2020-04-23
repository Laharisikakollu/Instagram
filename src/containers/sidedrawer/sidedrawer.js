import SideDrawer from "../../components/sidedrawer/sidedrawer";
import { connect } from "react-redux";
import axios from "axios";
import { onGetFollowRequests } from "../../services/sidedrawer";
import { onGetSignUpRequests } from "../../services/sidedrawer";
const jwt = require("jsonwebtoken");
const mapStateToProps = (state) => ({
  users: state.admin.users,
  toggle: state.admin.toggle,
  signeduserName: state.login.userName,
  followRequests: state.user.followRequests,
  userName: state.user.userName,
  signUpRequests: state.admin.requests,
  role: state.login.role,
});
const mapDispatchToProps = (dispatch) => {
  return {
    onChangeToggle: () =>
      dispatch({
        type: "TOGGLEUSER",
      }),

    onGetFollowRequests: async (value) => {
      let followRequest = await onGetFollowRequests();
      dispatch({
        type: "GETFOLLOWREQUESTS",
        payload: followRequest,
      });
    },
    setUserName: (value) =>
      dispatch({
        type: "SETUSERNAME",
        payload: value,
      }),
      
    onGetSignUpRequests: async () => {
      let signupRequest = await onGetSignUpRequests();
      dispatch({
        type: "GETREQUESTS",
        payload: signupRequest,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);
