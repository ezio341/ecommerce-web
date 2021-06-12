import { Dropdown, Layout, Menu } from "antd";
import {
  UserOutlined
} from '@ant-design/icons'
import { Link } from "react-router-dom";

const { Header } = Layout;

const HeaderComponent = () => {
  const dropdownMenu = () =>{
    return(
      <Menu>
      <Menu.Item>
        <a>
          Logout
        </a>
      </Menu.Item>
    </Menu>
    )
  }
  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div className="logo" />
      <Dropdown className='float-right' overlay={dropdownMenu} placement='bottomRight' arrow>
        <a className='float-right'><UserOutlined style={{fontSize: 20}}/></a>
      </Dropdown>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">
          <Link to="/">Products</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/Orders">Orders</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/Users">Users</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};


export default HeaderComponent;
