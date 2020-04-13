import  UserList from '../../components/admin/userList';
import { connect } from "react-redux";


const mapDispatchToProps = dispatch => {
    return {
        onGetUsers: () =>
            dispatch({
                type: "GETUSERS"
            }),
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