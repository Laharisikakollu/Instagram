import SideDrawer from '../../components/sidedrawer/sidedrawer'; 
import { connect } from "react-redux";
const mapStateToProps = state => ({
    users: state.admin.users,
    toggle:state.admin.toggle,
    signeduserName:state.login.userName,
    followRequests: state.user.followRequests,
    userName: state.user.userName,
    signUpRequests: state.admin.requests,
  })
  const mapDispatchToProps = dispatch => {
    return {
        onChangeToggle:()=>
        dispatch({
            type:"TOGGLEUSER"
        }),
        onGetFollowRequests: (value) =>
        dispatch({
            type: "GETFOLLOWREQUESTS",
            payload: value,
        }),
        setUserName: (value) =>
        dispatch({
            type: "SETUSERNAME",
            payload: value
        }),
        onGetSignUpRequests: () =>
        dispatch({
            type: "GETREQUESTS"
        })
        
  }}
  export default (connect(mapStateToProps, mapDispatchToProps)(SideDrawer));