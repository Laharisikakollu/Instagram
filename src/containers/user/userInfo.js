import UserInfo from "../../components/user/userInfo";
import { connect } from "react-redux";
import { getUserFollowersAndFollowing } from "../../services/user";
import { followAndUnFollow } from "../../services/user";
import { onGetFollowRequests } from "../../services/user";

const mapDispatchToProps = (dispatch) => {
  return {
    getUserFollowersAndFollowing: async (value) => {
      let getUserfollowers = await getUserFollowersAndFollowing(value);

      dispatch({
        type: "GETUSERFOLLOWERSANDFOLLOWING",
        payload: getUserfollowers,
      });
    },

    followAndUnFollow: async (value) => {
      let followunfollow = await followAndUnFollow(value);

      dispatch({
        type: "FOLLOWANDUNFOLLOW",
        payload: followunfollow,
      });
    },

    onNewSearch: (value) =>
      dispatch({
        type: "SEARCHUSERNAME",
        payload: value,
      }),

    onGetFollowRequests: async (value) => {
      let getfollowrequest = await onGetFollowRequests(value);

      dispatch({
        type: "GETFOLLOWREQUESTS",
        payload: getfollowrequest,
      });
    },
  };
};
const mapStateToProps = (state) => ({
  userName: state.user.userName,
  followers: state.user.followers,
  following: state.user.following,
  searchValue: state.user.searchValue,
  followRequests: state.user.followRequests,
});
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
