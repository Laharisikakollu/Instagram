import  UserList from '../../components/admin/userList';
import { connect } from "react-redux";
import axios from "axios";

const mapDispatchToProps = dispatch => {
    return {
        onGetUsers: async() =>
        {let res=await axios.get('http://localhost:8000/getuserlist')
        // console.log(Object.values(res.data.users))
        console.log(res.data.names)
            dispatch({
                type: "GETUSERS",
                payload:res.data.names
            })},
        onChangeToggle:()=>
        dispatch({
            type:"TOGGLEUSER"
        })
    }
}



const mapStateToProps = state => ({
    users: state.admin.users,
    toggle:state.admin.toggle
})

export default connect(mapStateToProps, mapDispatchToProps)(UserList);