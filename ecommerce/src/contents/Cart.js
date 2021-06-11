import React, {Component} from 'react'
import { Layout, Breadcrumb, Card, Image,Button, Row, Col, Modal, Skeleton} from 'antd'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import {
  LoadingOutlined,
  SyncOutlined,
  PlusOutlined,
  MinusOutlined,
  DeleteTwoTone
} from '@ant-design/icons'
import {showCart, deleteCart, updateCart} from '../Actions/cartAction'
import EmptyCartSVG from '../Assets/empty_cart.svg'
import LoginCartSVG from '../Assets/login_cart.svg'
import { Link } from 'react-router-dom';

const {Content} = Layout;

class Cont extends Component {
  state = {
    isModalVisible: true
  }


  componentDidMount(){
    if(this.props.auth){
      this.props.showCart()
    }
  }
  increaseAmount (id){
    let {cart} = this.props
    cart.forEach(item=>{
      if(item.id === id){
        if(item.amount !== item.stock){
          item.amount = ++item.amount
          this.props.updateCart(item)
        }
      }
    })
  }
  
  decreaseAmount(id){
    let {cart} = this.props
    cart.forEach(item=>{
      if(item.id === id && item.amount>1){
          item.amount = --item.amount
          this.props.updateCart(item)
      }
    })
  }

  onDeleteCart(item){
    let newTotal = this.state.totalPrice
    newTotal -= item.price*item.amount
    this.props.deleteCart(item.id);
  }

  GotoLogin = () =>{
    const {isModalVisible} = this.state
    const {auth} = this.props
    const handleOk = () => {
      this.setState({isModalVisible: false})
    }
    const handleCancel = () => {
      this.setState({isModalVisible: false})
    }
    const LoginInfo = ()=>{
      return(<div style={{textAlign:'center'}}><p>You are not logged in</p> <a href='/User'>Click Here to Login</a></div>)
    }
    return (
    <div>
      {!auth && <LoginInfo/>}
      <Modal title="You are not login yet" visible={!auth?isModalVisible: false} onOk={handleOk} onCancel={handleCancel} footer={[
        <Button key="back" onClick={handleCancel}>
          Back
        </Button>,
        <Link key='link' to='/User' style={{marginLeft:'10px'}}><Button key="Auth" type='primary' onClick={handleOk}>
          Login
        </Button></Link>
        
      ]}>
        <p>Go to Login Page?</p>
      </Modal>
    </div>
    )
  }
  RenderData = () =>{
    const {cart, deleteloading} = this.props
    return (
      cart.map(item => (
          <Card key={item.id} title={item.name} style={{marginTop:'10px'}} extra={
            <Button type='ghost' style={{border:'none'}} onClick={()=>this.onDeleteCart(item)}>
              <DeleteTwoTone style={{fontSize:22}} twoToneColor='red'/>
            </Button>
          }>
            <Row>
              <Col>
                <Image src={item.img} height='100px' width='100px' preview={false} />
                <p style={{fontSize: 11}}>Available: {item.stock}</p>
              </Col>
              <Col style={{marginLeft:'10px'}}>
                <p style={{display:'flex', textOverflow:'ellipsis', overflow: 'hidden'}}>{item.desc.substring(0,70)+'...'}</p>
                <h4 style={{color: 'orange', fontSize: 18}}>Rp {item.price.toLocaleString('id-ID', {minimumFractionDigits:2, maximumFractionDigits:2})}</h4>
                <div id='item-amount'>
                  <p>Amount:
                    <Button style={{marginLeft:10, marginRight:10}} icon={<MinusOutlined/>} shape='circle' onClick={()=>this.decreaseAmount(item.id)}/>
                      {item.amount}
                    <Button style={{marginLeft:10}} icon={<PlusOutlined/>} shape='circle' onClick={()=>this.increaseAmount(item.id)}/>
                  </p>
                </div>
                {deleteloading && <LoadingOutlined/>}
              </Col>
            </Row>
          </Card>
      ))
    )
  }
  
  Total = (props) =>{
    const total = ()=>{
      let totalPrice = 0
      props.carts.forEach(item=>{
        totalPrice += item.price*item.amount
      })
      return totalPrice
    }
    return(
      <div>
        <table cellPadding='5px' style={{textAlign:'left'}}>
          {props.carts.map(cart=>{
            return(
              <tr key={cart.id}>
                <td>{cart.name.substring(0, 15)}...</td>
                <td>x</td>
                <td>{cart.amount}</td>
                <td>{cart.price * cart.amount}</td>
              </tr>
            )
          })}
          <tr>
            <td colSpan='4'><hr style={{width:'100%'}}/></td>
            <td style={{textAlign:'center'}}>+</td>
          </tr>
          <tr style={{fontWeight:'bold'}}>
            <td>
              Total: 
            </td>
            <td colSpan='3' style={{color: 'green', fontSize: 14}}>
              Rp {total().toLocaleString('id-ID', {minimumFractionDigits:2, maximumFractionDigits:2})}
            </td>
          </tr>
        </table>
      </div>
    )
  }

  render() {
    const {cart, auth, pageloading,} = this.props
    return (
        <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Cart</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" 
          style={{ padding: 24, minHeight: 400, minWidth:300, backgroundImage: 'url('+((auth&& !pageloading&&(cart.length === 0)&&EmptyCartSVG)||(!auth && LoginCartSVG))+')', backgroundSize: '20%', backgroundRepeat: 'no-repeat', backgroundPosition:'center'}}>
            {!auth && <this.GotoLogin/>}
            {auth && <Skeleton loading={pageloading} active avatar/>}
            {auth && cart && <this.RenderData/>}
            {pageloading && <SyncOutlined spin width='100px' height='100px'/>}<br/>
            {auth && !pageloading && cart.length ===0 &&<p style={{textAlign:'center'}}>Empty Data</p>}
            {auth && !pageloading && cart.length !== 0 && <this.Total carts = {cart}/>}
            {auth && cart.length !==0 && <Button type='primary' style={{marginTop:'20px'}}>Checkout</Button>}
        </div>
        </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {cart: state.cart.data, auth: state.auth.auth, pageloading: state.cart.fetchloading, deleteloading: state.cart.deleteloading, state: state}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    deleteCart, showCart, updateCart
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cont)