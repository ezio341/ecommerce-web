import {Layout, Breadcrumb, Image, List } from 'antd'
import React from 'react'
import profileImg from '../Assets/profile-sq.jpg'

const {Content} = Layout

const About = () => {
    return(
        <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Shop</Breadcrumb.Item>
            <Breadcrumb.Item>About</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 400, minWidth:300}}>
            <h2 style={{textAlign:'center'}}>About Me</h2>
            <div style={{padding:50,width:'auto', display:'flex', border:'1px solid lightgray', borderRadius:10}}>
                <Image src={profileImg} style={{maxHeight: 200, maxWidth:200, height:'auto', width:'auto'}} />
                <div style={{flexWrap: 'wrap', marginLeft: 10, padding:20}}>
                    <p style={{fontSize: 15}}>
                        Hello, I'am Arga Diaz Prawira Yudha <br/>
                        Currently Study at POLINEMA <br/><br/>
                        If you have any suggestion, you can contact me on:
                    </p>
                    <List >
                            <List.Item key='email' style={{padding:'0px'}}>
                                Email: <a href='mailto:argadiaz09@gmail.com' target='#blank'>argadiaz09@gmail.com</a>
                            </List.Item>
                            <List.Item key='linkedin' style={{padding:'0px'}}>
                                LinkedIn: <a href='https://www.linkedin.com/in/arga-diaz-7947b0174/' target='#blank'>Arga Diaz</a>
                            </List.Item>
                        </List>
                </div>
            </div>
        </div>
        </Content>
    )
}

export default About