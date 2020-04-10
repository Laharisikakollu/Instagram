import React,{Component} from "react";
import {Redirect} from "react-router-dom";
import {Button} from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
class Logout extends Component{

    constructor(props) {
        super(props);
        this.state = {
            logout: false,
        }
    }
    componentDidMount() {
        this.setState({ logout: false })
        console.log("logout cdm")
    }
    componentWillUnmount() {
        console.log("cwum logout")
        this.setState({ logout: false })
    }
    handleLogout = async (e) => {
        e.preventDefault();
        await localStorage.removeItem("role");
        this.setState({ logout: true })
    }
    render() {
        return (
            <div  >
                <Button style={{ float: 'right' }} onClick={this.handleLogout}><LogoutOutlined /></Button>
                {this.state.logout ?
                    (<div>
                        {console.log("heloo")}
                        {window.location.href='/login'}
                        {/* <Redirect to='/login' push={true}/> */}
                        {/* <Route  exact component={Login} /> */}
                    </div>)
                    :
                    null
                }
            </div>
        );
    }
}

export default Logout;