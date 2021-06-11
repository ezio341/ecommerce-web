import React, {Component} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from 'react-router-dom'
import './style.css'
import { Layout, Menu} from 'antd'
import {
    ShopFilled,
    ShoppingOutlined,
    UserOutlined,
    HomeOutlined,
    ShoppingCartOutlined
  } from '@ant-design/icons'
import Header from './Header'
import Footer from './Footer'
import Product from '../contents/Products'
import Cart from '../contents/Cart'
import User from '../contents/User'
import Home from '../contents/Home'
import About from '../contents/About'


const { Sider } = Layout
const {SubMenu} = Menu

class MainPage extends Component {
    state = {
        collapsed: false,
        menuSelected: '1.1',
        layoutMarginLeft: 200
      };
    
    onCollapse = collapsed => {
        this.setState({ collapsed })
        if(collapsed){
            this.setState({layoutMarginLeft: 80})
        }else{
            this.setState({layoutMarginLeft: 200})

        }
    };

    render() {
        const {collapsed, menuSelected} = this.state
        return (
        <Layout style={{ minHeight: '100vh' }}>
            <Router>
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} 
            style={{
                overflow: 'hidden',
                height: '100vh',
                position: 'fixed',
                left: 0,
            }}>
                <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={[menuSelected]} mode="inline">
                        <SubMenu key="1" title='Shop' icon={<ShopFilled />}>
                            <Menu.Item key="1.1" icon={<HomeOutlined/>}>
                                <Link to='/'>Home</Link>
                            </Menu.Item>
                            <Menu.Item key="1.2" icon={<ShoppingOutlined/>}>
                                <Link to='/Products'>Products</Link>
                            </Menu.Item>
                            <Menu.Item key="1.3" icon={<ShoppingOutlined/>}>
                                <Link to='/About'>About</Link>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="3" icon={<ShoppingCartOutlined/>}>
                            <Link to='/Cart'>Cart</Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<UserOutlined/>}>
                            <Link to='/User'>User</Link>
                        </Menu.Item>
                    </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: this.state.layoutMarginLeft , transitionDuration: '0.3s'}}>
                <Header/>
                <Switch>
                    <Route exact path='/'>
                        <Home/>
                    </Route>
                    <Route exact path='/Cart'>
                        <Cart/>
                    </Route>
                    <Route exact path='/User'>
                        <User/>
                    </Route>
                    <Route exact path='/Products'>
                        <Product/>
                    </Route>
                    <Route exact path='/About'>
                        <About/>
                    </Route>
                </Switch>
                <Footer/>
            </Layout>
            </Router>
        </Layout>
        );
    }
}


export default MainPage