import UserList from "../../components/admin/userList";
import { connect } from "react-redux";
import axios from "axios";
import {onGetUsers} from '../../services/admin';

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUsers: async () => {
    let getusers=await onGetUsers()
      dispatch({
        type: "GETUSERS",
        payload: getusers
      });
    },
    onChangeToggle: () =>
      dispatch({
        type: "TOGGLEUSER",
      }),
  };
};

const mapStateToProps = (state) => ({
  users: state.admin.users,
  toggle: state.admin.toggle,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
