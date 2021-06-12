import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div className="logo" />
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
