import { Form, Input, Button, Table, Space, Image, Row, Col } from "antd";
import Title from "antd/lib/typography/Title";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProduct } from "../Action/productAction";

const ProductComponent = (props) => {
  const [data, setData] = useState([]);
  const [dataloading, setDataloading] = useState(true);
  const [componentSize, setComponentSize] = useState("default");

  useEffect(() => {
    props.fetchProduct();
  }, []);

  useEffect(() => {
    if (props.products.products !== null) {
      setData(props.products.products);
      setDataloading(props.products.loading);
    }
  }, [props.products]);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const onAddFinish = (values) => {
    let body = {
      ...values.product,
      id: "PROD" + new Date().getTime().toString(),
    };
    console.log(body);
  };
  const AddProductForm = () => {
    return (
      <Form
        labelCol={{
          span: 10,
        }}
        wrapperCol={{}}
        layout="vertical"
        initialValues={{
          size: componentSize,
        }}
        onFinish={onAddFinish}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item
          name={["product", "name"]}
          label="Product Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["product", "img"]}
          label="Image Link"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["product", "desc"]}
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name={["product", "price"]}
          label="Price"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name={["product", "rate"]}
          label="Rating"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name={["product", "stock"]}
          label="Stock"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const ProductTable = () => {
    const columns = [
      {
        title: "Image",
        dataIndex: "img",
        key: "img",
        render: (link) => <Image width={100} src={link} />,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Description",
        dataIndex: "desc",
        key: "desc",
        render: (text) => text.substring(0, 100),
      },
      {
        title: "Rating",
        dataIndex: "rate",
        key: "rate",
      },
      {
        title: "Stock",
        dataIndex: "stock",
        key: "stock",
      },
    ];
    return (
      <Table
        bordered
        size="small"
        loading={dataloading}
        columns={columns}
        dataSource={data}
      />
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Row gutter={24}>
        <Col span={8}>
          <Title level={3} style={{ textAlign: "center" }}>
            Add Product
          </Title>
          <AddProductForm />
        </Col>
        <Col span={16}>
          <ProductTable />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { products: state.product };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchProduct,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductComponent);
