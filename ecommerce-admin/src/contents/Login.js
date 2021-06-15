import { Form, Input, Button, Checkbox, Divider, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {authenticate} from '../Action/authAction'
import { useEffect, useState } from "react";

const Login = (props) => {
  const [loginError, setLoginError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if(props.auth.status === 'SIGNIN_FAILED'){
      setLoginError(true)
    }
    if(props.auth){
      setLoading(props.auth.loading)
    }
    console.log(props)
  }, [props.auth])

  const onFinish = (values) => {
    props.authenticate(values.admin)
  };
  const onCloseAlert = () =>{
    setLoginError(false)
  }
  return (
    <div style={{ textAlign: "center" }}>
      <Title level={2}>Login</Title>
      <Divider/>
      <div style={{ display: "flex", justifyContent: "center", alignContent:'center', flexDirection:'column', flexWrap:'wrap'}}>
      { loginError &&<Alert  type='error' message='Login Error!' description='Invalid email/ password' onClose={onCloseAlert} closable style={{ marginBottom:10 }}/>}
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name={["admin","email"]}
            rules={[
              {
                required: true,
                message: "Please input your Email!"
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              type='email'
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name={["admin","password"]}
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps =(state) =>{
  return{...state}
}

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators({
    authenticate
  }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
