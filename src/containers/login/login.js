import Login from '../../components/login/login';
import { connect } from "react-redux";

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
            onSubmit:()=>
            dispatch({
                type:"SUBMIT"
            }),
            setUserName: (value) =>
            dispatch({
                type: "SETUSERNAME",
                payload: value
            })
            
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