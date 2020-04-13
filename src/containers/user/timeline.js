import Timeline from '../../components/user/timeline';
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
    return {
       
        uploadPost:(value)=>
        dispatch({
            type:"UPLOADPOST",
            payload:value
        }),

        getUserPosts:(value)=>
        dispatch({
            type:"GETUSERPOSTS",
            payload:value
        }),
        
        uploadDescription: (value) =>
         dispatch({
        type: "NEWDESCRIPTION",
        payload: value
    })
    }
}
const mapStateToProps = state => ({
   
userName:state.user.userName,
userPosts:state.user.userPosts,
description: state.user.description
})
export default connect(mapStateToProps, mapDispatchToProps)(Timeline);