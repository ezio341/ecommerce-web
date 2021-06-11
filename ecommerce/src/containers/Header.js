import React, {Component} from 'react'
import { Layout} from 'antd'
import './style.css'

const { Header } = Layout;

class Head extends Component{
    render(){
        return(
            <Header className="site-layout-background" style={{ padding: 0, backgroundColor:''}} >
                <h3 style={{marginLeft:20, fontFamily:'sans-serif', width:'100px'}}>Shop Keeper </h3>
            </Header>
        )
    }
}

export default Head