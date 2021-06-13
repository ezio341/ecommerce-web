import {
    Route,
    Switch
} from 'react-router-dom'
import Products from '../contents/Products'
import Users from '../contents/Users'
import Login from '../contents/Login'
import { Layout,Breadcrumb } from 'antd';
import { connect } from "react-redux";

const {  Content} = Layout;

const ContentComponent = (props) =>{
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
                    {props.auth.auth ? <Products/>:<Login/> }
                </Route>
                <Route exact path='/Users'>
                    {props.auth.auth ? <Users/>:<Login/> }
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
export default connect(mapStateToProps)(ContentComponent)
