import Followrequests from "../../components/user/followRequest";
import { connect } from "react-redux";
import axios from "axios";
import {onGetFollowRequests} from '../../services/user';
import {accept} from '../../services/user';
import {decline} from '../../services/user'
const jwt = require("jsonwebtoken");

const mapDispatchToProps = (dispatch) => {
  return {
    onGetFollowRequests: async (value) => {
     let getfollowrequest=await onGetFollowRequests()
      dispatch({
        type: "GETFOLLOWREQUESTS",
        payload:getfollowrequest,
      });
    },

    accept: async (value) => {
        let accepts=await accept(value)
    
      dispatch({
        type: "ACCEPTFOLLOW",
        payload: accepts,
      });
    },

    decline: async (value) => {
      let declines=await decline(value)
      dispatch({
        type: "DECLINEFOLLOW",
        payload:declines,
      });
    },
  };
};
const mapStateToProps = (state) => ({
  followRequests: state.user.followRequests,
  userName: state.user.userName,
});
export default connect(mapStateToProps, mapDispatchToProps)(Followrequests);
