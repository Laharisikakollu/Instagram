import Search from "../../components/user/search";
import { connect } from "react-redux";
import { getUserPosts } from "../../services/user";
import { onLikePost } from "../../services/user";
import axios from "axios";

const mapDispatchToProps = (dispatch) => {
  return {
    getUserPosts: async (value) => {
        let getPost = await getUserPosts(value);

        dispatch({
          type: "GETUSERPOSTS",
          payload: getPost,
        });
    },

    onLikePost: async (value) => {
      let like = await onLikePost(value);
      dispatch({
        type: "LIKEUSERPOST",
        payload: like,
      });
    },

    setUserName: (value) =>
      dispatch({
        type: "SETUSERNAME",
        payload: value,
      }),

   

    onNewSearch: (value) =>
      dispatch({
        type: "SEARCHUSERNAME",
        payload: value,
      }),
  };
};

const mapStateToProps = (state) => ({
  userName: state.user.userName,
  userPosts: state.user.userPosts,
  followRequests: state.user.followRequests,
  searchValue: state.user.searchValue,
});
export default connect(mapStateToProps, mapDispatchToProps)(Search);
