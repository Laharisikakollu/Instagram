import { connect } from "react-redux";
import UserRequest from '../../components/admin/userRequest';
import axios from "axios";
const mapDispatchToProps = dispatch => {
    return {
        onGetRequests:async () =>
        {let res=await axios.get('http://localhost:8000/getrequestlist')
            dispatch({
                type: "GETREQUESTS",
                payload:res.data.names
            })},

        accept:async (data) =>
      
        {   console.log(data)
            let res=await axios.put('http://localhost:8000/acceptrequest',{

            userName:data.userName,
            isaccept:data.value
        })
            dispatch({
                type: "ACCEPT",
                payload: res.data
            })},

        decline:async (data) =>
        {let res=await axios.put('http://localhost:8000/declinerequest',{
            userName:data.userName,
            isaccept:data.value
        })
            dispatch({
                type: "REJECT",
                payload: data
            })}
    }
}
const mapStateToProps = state => ({
    requests: state.admin.requests,
})
export default connect(mapStateToProps, mapDispatchToProps)(UserRequest);

