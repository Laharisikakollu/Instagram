import React, { Component } from 'react';
import {Container} from 'reactstrap';
import { connect } from "react-redux";

class Home extends Component{
    // componentDidMount() {
    //     this.props.onGetUsers();
    // }

    render() {
       
        return (<div>
         <Container>
             <h1>{this.props.match.params.id}</h1>
         </Container>
        </div>);
    }
}
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
   userName:state.user.userName
})
export default connect(mapStateToProps, mapDispatchToProps)(Home);

