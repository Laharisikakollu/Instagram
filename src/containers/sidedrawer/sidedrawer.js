import SideDrawer from '../../components/sidedrawer/sidedrawer'; 
import { connect } from "react-redux";
import axios from "axios"
const jwt=require('jsonwebtoken')
const mapStateToProps = state => ({
    users: state.admin.users,
    toggle:state.admin.toggle,
    signeduserName:state.login.userName,
    followRequests: state.user.followRequests,
    userName: state.user.userName,
    signUpRequests: state.admin.requests,
    role:state.login.role
  })
  const mapDispatchToProps = dispatch => {
    return {
        onChangeToggle:()=>
        dispatch({
            type:"TOGGLEUSER"
        }),

        onGetFollowRequests: async (value) =>
    {console.log("getfollowrequest",value)
    let payload=jwt.decode(JSON.parse(localStorage.getItem("token")))
  
      let res=await axios.get(`http://localhost:8000/getfollowrequest/${payload.userName}`)
      console.log(res.data)
      dispatch({
        type: "GETFOLLOWREQUESTS",
        payload: res.data
      })},
        setUserName: (value) =>
        dispatch({
            type: "SETUSERNAME",
            payload: value
        }),
        onGetSignUpRequests: async() =>
        {let res=await axios.get('http://localhost:8000/getrequestlist')
        dispatch({
            type: "GETREQUESTS",
            payload:res.data.names
        })},
        
  }}
  export default (connect(mapStateToProps, mapDispatchToProps)(SideDrawer));