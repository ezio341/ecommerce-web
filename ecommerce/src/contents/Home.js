import React, {Component} from 'react'
import { Layout, Breadcrumb, Image} from 'antd'
// import './style.css'

const {Content} = Layout;



class Cont extends Component {
    LoadHome = () =>{
        return(
            <div>
                <h2 style={{textAlign:'center'}}>Welcome to Our Shop</h2>
                <div style={{padding:50,width:'auto', display:'flex', border:'1px solid lightgray', borderRadius:10}}>
                    <Image src='https://picsum.photos/400/400' height='200px' width='200px' />
                    <p style={{margin:30, font:'caption', width:'100%'}}>Hello There, Welcome to Our Shop!</p>
                </div>
            </div>
        )
    }

    render() {
        return (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Shop</Breadcrumb.Item>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 400 }}>
                    <this.LoadHome/>
                </div>
            </Content>
        );
    }
}


export default Cont