import Login from '../../components/login/login';
import { connect } from "react-redux";
import axios from "axios";
const mapDispatchToProps = dispatch => {
    return {
        onNameChange: (value) =>
            dispatch({
                type: "USERNAMECHANGE",
                payload: value
            }),
        onPasswordChange: (value) =>
            dispatch({
                type: "PASSWORDCHANGE",
                payload: value
            }),
            onSubmit:async (userName,password)=>{
            let res = await axios.post('http://localhost:8000/login', {
                userName:userName,
                password:password
            })
            console.log(res.data)
            dispatch({
                type:"SUBMIT",
                payload:res.data
            })},

            setUserName: (value) =>
            dispatch({
                type: "SET",
                payload: value
            }),
            setUserUserName: (value) => {
                dispatch({
                    type: "SETUSERUSERNAME",
                    payload: value
                })
            },
            
  }
    };

const mapStateToProps = (state) => ({
    userName: state.login.userName,
    password: state.login.password,
    localStorageData: state.login.localStorageData,
    success: state.login.success,
    uSuccess: state.login.uSuccess,
    pSuccess: state.login.pSuccess,
    role:state.login.role
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);