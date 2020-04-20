import { connect } from "react-redux";
import UserPosts from '../../components/admin/userPosts';
import axios from "axios";
const jwt=require('jsonwebtoken');

const mapStateToProps = state => ({
    userName: state.user.userName,
    userPosts: state.user.userPosts,

})
const mapDispatchToProps = dispatch => {
    return {
       getUserPosts: async (value) => {
            console.log((localStorage.getItem("token")))
           let payload=await jwt.decode(JSON.parse(localStorage.getItem("token")))
           console.log(payload)
           console.log(window.location.pathname.substr(14))
            await axios.get(`http://localhost:8000/getPosts/${payload.userName}`)
                .then((res) => {
                    console.log(res)
                    if (res.data.success) {
                        dispatch({
                            type: "GETUSERPOSTS",
                            payload: res.data.posts1
                        })
                    }
                })
                .catch((err) => {
                    console.log(err);
                    // message.error("error")
                })

        },
            setUserName: (value) =>
            dispatch({
                type: "SETUSERNAME",
                payload: value
            }),

    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(UserPosts));