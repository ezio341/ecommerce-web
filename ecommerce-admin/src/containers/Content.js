import {
    Route,
    Switch
} from 'react-router-dom'
import Products from '../contents/Products'
import Orders from '../contents/Orders'
import Users from '../contents/Users'
import { Layout,Breadcrumb } from 'antd';

const {  Content} = Layout;

const ContentComponent = () =>{
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
                    <Products/>
                </Route>
                <Route exact path='/Orders'>
                    <Orders/>
                </Route>
                <Route exact path='/Users'>
                    <Users/>
                </Route>
            </Switch>
        </div>
      </Content>
    )
}

export default ContentComponent
