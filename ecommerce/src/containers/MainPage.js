import React, {Component} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from 'react-router-dom'
import './style.css'
import { Layout, Menu, Space, Switch as SwitchCom} from 'antd'
import {
    ShopFilled,
    ShoppingOutlined,
    UserOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    SettingFilled
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
        layoutMarginLeft: 200,
        theme: 'dark',
        themeChecked: false
      };
    
    onCollapse = collapsed => {
        this.setState({ collapsed })
        if(collapsed){
            this.setState({layoutMarginLeft: 80})
        }else{
            this.setState({layoutMarginLeft: 200})

        }
    };

    switchTheme = value =>{
        this.setState({theme: value?'light':'dark', themeChecked: value? true:false})
    }

    render() {
        const {collapsed, menuSelected, theme, themeChecked} = this.state
        return (
        <Layout style={{ minHeight: '100vh' }}>
            <Router>
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} 
            theme={theme}
            style={{
                overflow: 'hidden',
                height: '100vh',
                position: 'fixed',
                left: 0,
            }}>
                <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={[menuSelected]} mode="inline" theme={theme}>
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
                        <SubMenu key="5" icon={<SettingFilled/>} title='Setting'>
                            <Menu.Item key='5.1'>
                                <Space size={30}>
                                Mode : <SwitchCom checked={themeChecked} size='default' onChange={this.switchTheme} checkedChildren={theme} unCheckedChildren={theme}></SwitchCom>
                                </Space>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: this.state.layoutMarginLeft , transitionDuration: '0.3s'}}>
                <Header/>
                <Switch>
                    <Route exact path='/'>
                        <Home theme={theme}/>
                    </Route>
                    <Route exact path='/Cart'>
                        <Cart theme={theme}/>
                    </Route>
                    <Route exact path='/User'>
                        <User theme={theme}/>
                    </Route>
                    <Route exact path='/Products'>
                        <Product theme={theme}/>
                    </Route>
                    <Route exact path='/About'>
                        <About theme={theme}/>
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