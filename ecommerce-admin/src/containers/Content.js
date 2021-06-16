import {
    Route,
    Switch
} from 'react-router-dom'
import Products from '../contents/Products'
import Users from '../contents/Users'
import Login from '../contents/Login'
import { Layout,Breadcrumb } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {signout} from '../Action/authAction'
import { useEffect } from 'react';

const {  Content} = Layout;

const ContentComponent = (props) =>{
    //Automatic logout session
    useEffect(()=>{
        const authTime = localStorage.getItem('_authdatetime')
        if(authTime && (new Date().getTime() - authTime) > 86400000){
            props.signout()
        }
    }, [props])

    return(
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item> */}
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            <Switch>
                <Route exact path='/'>
                    {props.isAuthenticated ? <Products/>:<Login/> }
                </Route>
                <Route exact path='/Users'>
                    {props.isAuthenticated ? <Users/>:<Login/> }
                </Route>
            </Switch>
        </div>
      </Content>
    )
}

const mapStateToProps = (state) =>{
    return {
        ...state
    }
}
const mapDispatchToProps = dispatch =>{
    return bindActionCreators({
        signout
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ContentComponent)
