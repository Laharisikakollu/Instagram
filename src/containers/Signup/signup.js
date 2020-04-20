import SignUp from '../../components/Signup/Signup';
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
        onLogout: () =>
            dispatch({
                type: "LOGOUT",
            }),
        getItem: () =>
            dispatch({
                type: "GET",
                // payload: this.props.userName
            }),
        setItem: async (obj) =>
           
            {
              let res=await axios.post('http://localhost:8000/signup',obj)
              console.log(res.data)
               dispatch({
                type: "SUBMIT",
                payload: res.data
            })}
            ,
        validate: () =>
            dispatch({
                type: "VALIDATE",
            }),
            setEmail:(value)=>
            dispatch({
                type:"EMAIL",
                payload:value
            }),
            setRole:(value)=>
            dispatch({
                type:"ROLE",
                payload:value
            }),
            setPhone:(value)=>
            dispatch({
                type:"PHONE",
                payload:value
            }),
    };
};
const mapStateToProps = (state) => ({
    userName: state.signUp.userName,
    password: state.signUp.password,
    localStorageData: state.signUp.localStorageData,
    phone:state.signUp.phone,
    role:state.signUp.role,
    email:state.signUp.email,
    success:state.signUp.success,
    userNameValidated:state.signUp.userNameValidated,
    passwordValidated:state.signUp.passwordValidated,
    emailValidated:state.signUp.emailValidated,
    phoneValidated:state.signUp.phoneValidated,
    roleValidated:state.signUp.roleValidated
})
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);