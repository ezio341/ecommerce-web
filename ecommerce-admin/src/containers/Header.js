import { Dropdown, Layout, Menu } from "antd";
import {
  UserOutlined
} from '@ant-design/icons'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {signout} from '../Action/authAction'

const { Header } = Layout;

const HeaderComponent = (props) => {
  const dropdownMenu = () =>{
    return(
      <Menu>
      <Menu.Item>
        <a onClick={()=>props.signout()}>
          Logout
        </a>
      </Menu.Item>
    </Menu>
    )
  }
  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div className="logo" />
      {props.auth.auth && 
      <Dropdown className='float-right' overlay={dropdownMenu} placement='bottomRight' arrow>
        <a className='float-right'><UserOutlined style={{fontSize: 20}} /></a>
      </Dropdown>
      }
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">
          <Link to="/">Products</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/Users">Users</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

const mapStateToProps = (state) =>{
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators({
    signout
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (HeaderComponent);
