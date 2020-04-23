import Profile from "../../components/user/profile";
import { connect } from "react-redux";
import axios from "axios";
import {getUserPosts} from '../../services/user';
import {onLikePost} from '../../services/user';
import {deletePost} from '../../services/user'

const jwt = require("jsonwebtoken");

const mapDispatchToProps = (dispatch) => {
  return {
    getUserPosts: async (value) => {
      
          let getPost=await getUserPosts()
          dispatch({
            type: "GETUSERPOSTS",
            payload: getPost,
          });
        },
      
    

    deletePost: async (value) => {
      let deletes=await deletePost(value)
      dispatch({
        type: "DELETEPOST",
        payload: deletes,
      });
    },

    onLikePost: async (value) => {
     
      let like=await onLikePost(value)
      dispatch({
        type: "LIKEUSERPOST",
        payload: like,
      });
    }
  };
};
const mapStateToProps = (state) => ({
  userName: state.user.userName,
  userPosts: state.user.userPosts,
  searchValue: state.user.searchValue,
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
