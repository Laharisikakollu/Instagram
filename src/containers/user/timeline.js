import Timeline from "../../components/user/timeline";
import { connect } from "react-redux";
import {onLikePost} from '../../services/user';
import {addComment} from '../../services/user';
import {uploadPost} from '../../services/user';
import {getComment} from '../../services/user';
import {getfollowerposts} from '../../services/user';

const mapDispatchToProps = (dispatch) => {
  return {
    uploadPost: async (value) => {
      let upload = await uploadPost(value);
      dispatch({
        type: "UPLOADPOST",
        payload:upload,
      });
    },

    onLikePost: async (value) => {
      let like = await onLikePost(value);
      dispatch({
        type: "LIKEUSERPOST",
        payload: like,
      });
    },

    addComment: async (value) => {
      let addComments = await addComment(value);

      dispatch({
        type: "ADDCOMMENT",
        payload:addComments,
      });
    },

    getComment: async (value) => {
      let getComments = await getComment(value);

      dispatch({
        type: "GETCOMMENT",
        payload:getComments,
      });
    },

    getfollowerposts: async (value) => {
      let followerposts = await getfollowerposts(value);

      dispatch({
        type: "GETFOLLOWERPOSTS",
        payload:followerposts,
      });
    },

    uploadDescription: (value) =>
      dispatch({
        type: "NEWDESCRIPTION",
        payload: value,
      }),
  };
};
const mapStateToProps = (state) => ({
  userName: state.user.userName,
  userPosts: state.user.userPosts,
  description: state.user.description,
  followingPosts: state.user.followingPosts,
  comment: state.user.comment,
});
export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
