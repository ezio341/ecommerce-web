import React, {Component} from 'react'
import FirebaseApp from '../firebase/app'
import { Layout, Breadcrumb, Card, Image, Button, List, Modal, Skeleton, Alert, Menu, Dropdown} from 'antd'
import {
    StarOutlined,
    DownOutlined
} from '@ant-design/icons'
import {addCart, updateCart, showCart} from '../Actions/cartAction'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Search from 'antd/lib/input/Search'
import EmptySVG from '../Assets/empty.svg'
import { Link } from 'react-router-dom'

const {Content} = Layout;


class Cont extends Component {
    state = {
        products:[],
        loading:true,
        descRendered: false,
        visible: false,
        modalItem:[],
        productFilter: [],
        isCartAvailable: false,
        isAddCartSuccess: false,
        addCartSuccessMsg: '',
        cartAvailableMsg:'',
        isModalLoginVisible: false
    }
    hideModal = () => {
        this.setState({visible:false})
    }
    showModal = (item) => {
        this.setState({
            visible:true,
            modalItem:item
        }) 
    }
    takeProducts = () => {
        FirebaseApp.database().ref('products')
            .on('value',snapshot=>{
                const products = snapshot.val()
                const productscopy = snapshot.val()
                if(products.length>0){
                    this.setState({
                        products: products,
                        productFilter: productscopy
                    })
                }
                this.setState({loading: false})
            }, err=>{
                this.setState({loading:false})
            })
    }
    componentDidMount(){
        this.takeProducts()
        if(this.props.auth.auth){
            this.props.showCart()
        }
    }
    addCart(item){
        if(this.props.auth.auth){
            let foundCart = false
            if(this.props.cart){
                this.props.cart.map(cart=>{
                    if(item.id === cart.productid){
                        foundCart = true
                    }
                })
            }
            if(foundCart){
                this.setState({isCartAvailable: true, cartAvailableMsg: '"'+item.name +'" is already in your cart'})
            }else{
                this.props.addCart(item)
                this.setState({isAddCartSuccess: true, addCartSuccessMsg:'"'+item.name +'" is added to your cart'})
            }
        }else{
            this.setState({isModalLoginVisible: true})
        }
    }

    search(str){
        const productFilter = this.state.products.filter(product=>{
            return product.name.toLowerCase().includes(str)
        })
        this.setState({productFilter: productFilter})
    }

    GotoLogin = () =>{
        const {isModalLoginVisible} = this.state
        const handleOk = () => {
            this.setState({isModalLoginVisible: false})
        }
        const handleCancel = () => {
            this.setState({isModalLoginVisible: false})
        }
        return (
            <div>
            <Modal style={{zIndex: 5}} title="You are not login yet" visible={isModalLoginVisible} onOk={handleOk} onCancel={handleCancel} footer={[
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

    RenderProducts = (item)=> {
        return(
            <Card title={item.name} hoverable style={{cursor:'default'}}>
                <div style={{textAlign:'center'}}>
                    <Image src={item.img} height='100px' width='100px' onClick={()=>this.showModal(item)} preview={false} style={{cursor:'pointer'}} ></Image>
                </div>
                <p style={{textAlign: 'right', fontSize:11}}>Stock: {item.stock}</p>
                <p style={{fontSize: 13, textOverflow:'ellipsis', overflow: 'hidden', maxHeight:'100px', cursor:'pointer'}} onClick={()=>this.showModal(item)}>{item.desc && item.desc.substring(0, 50)+'...'}</p>
                <h4 style={{color: 'orange', fontSize: 18}}>Rp {item.price.toLocaleString('id-ID',{minimumFractionDigits:2, maximumFractionDigits:2})}</h4>
                <StarOutlined/> {item.rate}
                <div style={{textAlign:'right'}}>
                    <Button type='primary' onClick={()=>this.addCart(item)} disabled={((item.stock > 0))? false: true}>Add to Cart</Button>
                </div>
            </Card>
        )
    }

    ProductDetail = (Item) =>{
        const {visible} = this.state
        return (   
            <Modal title={Item.name} visible={visible} onCancel={this.hideModal} onOk={()=>{this.addCart(Item); setTimeout(this.hideModal, 1000)}} okText='Add To Cart' 
                footer={[
                    <Button key='cancel' type='ghost'  onClick={this.hideModal}>Back</Button>,
                    <Button key='ok' type='primary'  onClick={()=>this.addCart(Item)} disabled={((Item.stock !== 0))? false: true} >Add to Cart</Button>]}>
                <div style={{textAlign:'center'}}>
                    <Image src={Item.img} height='auto' width='auto' style={{maxHeight:200, maxWidth:200}}></Image>
                </div>
                <div style={{textAlign:'right'}}><p>Stock: {Item.stock}</p></div>
                <p>{Item.desc}</p>
                <h4 style={{color: 'orange', fontSize: 18}}>Rp {Item.price!==undefined && Item.price.toLocaleString('id-ID', {minimumFractionDigits:2, maximumFractionDigits:2})}</h4>
                <StarOutlined/> {Item.rate}
            </Modal>
        )
    }
    onCloseAlert = (e)=>{
        this.setState({isCartAvailable: false, isAddCartSuccess: false, cartAvailableMsg:'', addCartSuccessMsg:''})
    }
    onClickSort = (key) => {
        switch(key){
            case 'low':
                this.setState({productFilter: this.state.productFilter.sort((a,b)=>{return a.price - b.price})})
                break
            case 'high':
                this.setState({productFilter: this.state.productFilter.sort((a,b)=>{return b.price - a.price})})
                break
        }
    }
    menu = (
        <Menu>
        <Menu.Item key="1" onClick={()=>this.onClickSort('low')}>
          Price Low - High
        </Menu.Item>
        <Menu.Item key="2" onClick={()=>this.onClickSort('high')}>
          Price High - Low
        </Menu.Item>
      </Menu>
    )
    render() {
        const {modalItem, loading, products, productFilter, cartAvailableMsg, isCartAvailable, isAddCartSuccess, addCartSuccessMsg} = this.state
        return (
            <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Shop</Breadcrumb.Item>
                <Breadcrumb.Item>Products</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 400, backgroundImage: 'url('+(!loading&&(products.length === 0) && EmptySVG)+')', backgroundRepeat: 'no-repeat', backgroundSize:'35%', backgroundPosition:'center'}}>
                <div style={{textAlign:'center', padding: '10px'}}>
                    {!(products.length ===0) && <Search placeholder="Search" allowClear style={{ minWidth:100, maxWidth:300, verticalAlign:'middle', marginRight:50 }} onSearch={value=> this.search(value)}/>}
                    {products.length !== 0 &&
                        <Dropdown overlay={this.menu}>
                        <Button>
                            Filter <DownOutlined/>
                        </Button>
                    </Dropdown>}
                </div>
                {isCartAvailable && <Alert type='warning' showIcon message={cartAvailableMsg} closable onClose={this.onCloseAlert}/>}
                {isAddCartSuccess && <Alert type='success' showIcon message={addCartSuccessMsg} closable onClose={this.onCloseAlert}/>}
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 2,
                        lg: 3,
                        xl: 4,
                        xxl: 5,
                        }}
                    dataSource={productFilter}
                    renderItem={
                        item => (
                            <div>
                                <List.Item key={item.id} >
                                    <Skeleton loading={loading} active>
                                        <this.RenderProducts {...item}/>
                                    </Skeleton>
                                </List.Item>
                            </div>
                        )
                    } style={{marginTop:20}}/>
                <this.ProductDetail {...modalItem}/>
                <this.GotoLogin/>
            </div>
            </Content>
        );
    }
}
const mapStateToProps = (state) =>{
    return {
        auth: state.auth, cart: state.cart.data
    }
}

const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({
        addCart, updateCart, showCart
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cont)