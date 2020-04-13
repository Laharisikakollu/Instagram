import { connect } from "react-redux";
import UserRequest from '../../components/admin/userRequest';

const mapDispatchToProps = dispatch => {
    return {
        onGetRequests: () =>
            dispatch({
                type: "GETREQUESTS"
            }),
        accept: (value) =>
            dispatch({
                type: "ACCEPT",
                payload: value
            }),
        decline: (value) =>
            dispatch({
                type: "REJECT",
                payload: value
            })
    }
}
const mapStateToProps = state => ({
    requests: state.admin.requests,
})
export default connect(mapStateToProps, mapDispatchToProps)(UserRequest);