import { connect } from "react-redux";
import UserPosts from "../../components/admin/userPosts";
import axios from "axios";
import {getUserPosts} from '../../services/user';
const jwt = require("jsonwebtoken");


const mapStateToProps = (state) => ({
  userName: state.user.userName,
  userPosts: state.user.userPosts,
});
const mapDispatchToProps = (dispatch) => {
  return {
    getUserPosts: async () => {
     
        let getuserPosts=await getUserPosts()
            dispatch({
              type: "GETUSERPOSTS",
              payload: getuserPosts,
            });
          },
      
    setUserName: (value) =>
      dispatch({
        type: "SETUSERNAME",
        payload: value,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);
