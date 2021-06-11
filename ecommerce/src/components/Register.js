import {
  Form,
  Input,
  Button,
  Typography,
} from "antd";
const { Link, Title } = Typography;

const Register = (props) => {
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
        console.log(values);
        if(calues.password !== values.confirmPassword){
          props.register(values.user)
          props.getuserinfo(values.email)
        }else{

        }
      };

      return (
        <div style={{padding: 20}}>
          <div style={{display:'flex',justifyContent: 'center', padding:20}}>
          <Title level={2}>Create New Account</Title>
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
  export default Register