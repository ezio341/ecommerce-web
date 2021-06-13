import { Form, Input, Button, Checkbox, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {authenticate} from '../Action/authAction'
import { useEffect } from "react";

const Login = (props) => {


  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    props.authenticate(values.admin)
  };
  return (
    <div style={{ textAlign: "center" }}>
      <Title level={2}>Login</Title>
      <Divider/>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
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
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
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
  return{}
}

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators({
    authenticate
  }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
