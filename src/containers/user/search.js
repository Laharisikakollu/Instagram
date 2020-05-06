import Search from "../../components/user/search";
import { connect } from "react-redux";
import { getUserPosts } from "../../services/user";
import { onLikePost } from "../../services/user";
import{getUserFollowersAndFollowing} from "../../services/user";


const mapDispatchToProps = (dispatch) => {
  return {
    getUserPosts: async (value,following) => {
      let index=0
      let getPost=[]
      let path = window.location.pathname.substring(
        window.location.pathname.length - 10,
        window.location.pathname.length
      );
     
        if(path==="userSearch")
        {
          index=following.findIndex(item=>{
            return item==value
          })
        }
       
        if(index >= 0)
        {
         
          getPost = await getUserPosts(value);
        }
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

      getUserFollowersAndFollowing: async (value) => {
        let getUserfollowers=await getUserFollowersAndFollowing(value)
         dispatch({
           type: "GETUSERFOLLOWERSANDFOLLOWING",
           payload:getUserfollowers,
         });
       },
   

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
  following:state.user.following
});
export default connect(mapStateToProps, mapDispatchToProps)(Search);
