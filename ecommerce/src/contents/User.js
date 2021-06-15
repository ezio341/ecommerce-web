import React, { Component } from "react";
import {
  Layout,
  Breadcrumb,
  Form,
  Input,
  Button,
  Card,
  Alert,
  Avatar,
  Space,
  Typography,
  Popconfirm
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { bindActionCreators } from "redux";
import { authenticate, logout , register} from "../Actions/authAction";
import { getuserinfo, deleteAccount} from "../Actions/userAction";
import { connect } from "react-redux";
import SignInSVG from "../Assets/Sign_in.svg";
import ProfileSVG from "../Assets/profile.svg";
import firebaseApp from "../firebase/app";
const { Content } = Layout;
const { Text, Link, Title } = Typography;

class Cont extends Component {
  state = {
    gotoregister: false,
    differPassword: false
  };
  componentDidMount() {
    console.log(this.props)
    this.props.getuserinfo(
      this.props.auth.auth ? this.props.auth.user.uname.replace(".", "_") : ""
    );
  }
  onFinish = (values) => {
    this.props.authenticate(values.username, values.password);
    this.props.getuserinfo(values.username);
  };
  LoginForm = () => {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const toRegister = () =>{
      this.setState({gotoregister: true})
    }
    return (
      <div
        id="form-block"
        style={{ maxWidth: 400, margin: "auto", textAlign: "center" }}
      >
        <div id="alert-box" style={{ minHeight: 100, padding: "10px" }}>
          {!this.props.auth.loading && this.props.auth.loginfailed && (
            <Alert
              message="Login Failed"
              description="Invalid Username/ Password"
              type="error"
              closable
            />
          )}
        </div>
        <Form
          id="form-root"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" id="input-username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" id="input-password" />
          </Form.Item>

          <Form.Item>
            <Space direction='vertical'>
          <Link onClick={toRegister}>Create New Account</Link>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    );
  };
  deleteAcc = () =>{
    console.log(this.props)
    this.props.deleteAccount()
    this.props.logout()
  }
  Profile = () => {
    return (
      <div style={{ paddingTop: 10, paddingBottom: 10 }}>
        <Card
          title={"Welcome Back " + this.props.user.name}
          style={{ margin: 30 }}
          extra={
            <Button
              type="danger"
              onClick={() => {
                this.props.logout();
              }}
            >
              Logout
            </Button>
          }
        >
          <div
            className="site-layout-background"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Avatar size={100} icon={<UserOutlined />}/>
            <Space direction="vertical">
              <Text>Name : {this.props.user.name}</Text>
              <Text>Address : {this.props.user.address}</Text>
              <Text>Phone : {this.props.user.phone}</Text>
            </Space>
          </div>
          <div style={{display:'flex', justifyContent:'center', marginTop: 54}}>
            <Popconfirm okText='Yes' cancelText='No' title='Do you want to delete this account?' onConfirm={()=>this.deleteAcc()}>
            <Button type='ghost' onClick={()=>this.deleteAccount}>Delete This Account</Button>
            </Popconfirm>
          </div>
        </Card>
      </div>
    );
  };

  Register = () => {
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 9,
      },
    };
    /* eslint-disable no-template-curly-in-string */

    const validateMessages = {
      required: "${label} is required!",
      types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
      },
      number: {
        range: "${label} must be between ${min} and ${max}",
      },
    };
    /* eslint-enable no-template-curly-in-string */

    const toLogin = () =>{
      this.setState({gotoregister: false})
    }

    const Demo = () => {
      const onFinish = (values) => {
        if(values.user.password === values.user.confirmPassword){
          this.props.register(values.user)
          this.props.getuserinfo(values.user.email)
        }else{
          this.setState({differPassword: true})
        }
      };

      return (
        <div style={{padding: 20}}>
          <div style={{display:'flex',justifyContent: 'center', padding:20}}>
          <Title level={2}>Create New Account</Title>
          </div>
          <div id="alert-box" style={{ padding: "10px", textAlign:'center'}}>
          {this.state.differPassword && (
            <Alert
              message="Register Failed"
              description="Different Password and Confirmation Password"
              type="error"
              onClose={()=>this.setState({differPassword:false})}
              closable
            />
          )}
          </div>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["user", "name"]}
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "address"]}
            label="Address"
            rules={[
              {
                required: true
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "phone"]}
            label="Phone"
            rules={[
              {
                required: true
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "password"]}
            label="Password"
            
            rules={[
              {
                required: true
              },
            ]}
          >
            <Input type='password'/>
          </Form.Item>
          <Form.Item
            name={["user", "confirmPassword"]}
            label="Confirm Password"
            rules={[
              {
                required: true
              },
            ]}
          >
            <Input type='password'/>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Link onClick={toLogin} style={{marginLeft:20}}>Already have an Account?</Link>
          </Form.Item>
        </Form>\
        </div>
      );
    };
    return Demo()
  };

  render() {
    return (
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Login</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{
            minHeight: 400,
            backgroundImage:
              "url(" + (!this.props.auth.auth && !this.state.gotoregister && SignInSVG) + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "80%",
          }}
        >
          {!this.props.auth.loading && this.props.auth.auth === true ? (
            <this.Profile />
          ) : this.state.gotoregister ? (
            <this.Register />
          ) : (
            <this.LoginForm />
          )}
        </div>
      </Content>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      authenticate,
      logout,
      getuserinfo,
      register,
      deleteAccount
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Cont);
