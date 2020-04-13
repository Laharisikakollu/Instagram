import { connect } from "react-redux";
import UserPosts from '../../components/admin/userPosts';

const mapStateToProps = state => ({
    userName: state.user.userName,
    userPosts: state.user.userPosts,
})
const mapDispatchToProps = dispatch => {
    return {
        getUserPosts: () =>
            dispatch({
                type: "GETUSERPOSTS",

            }),
            setUserName: (value) =>
            dispatch({
                type: "SETUSERNAME",
                payload: value
            }),

    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(UserPosts));