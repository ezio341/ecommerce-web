import {
  Form,
  Input,
  Button,
  Table,
  Space,
  Image,
  Row,
  Col,
  Popconfirm,
  Modal,
  Divider,
} from "antd";
import Title from "antd/lib/typography/Title";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchProduct,
  addProduct,
  deleteProduct,
  updateProduct
} from "../Action/productAction";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

const ProductComponent = (props) => {
  const [data, setData] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [productUpdate, setProductUpdate] = useState({})
  const [dataloading, setDataloading] = useState(true);
  const [componentSize, setComponentSize] = useState("default");

  useEffect(() => {
    props.fetchProduct();
  }, []);

  useEffect(() => {
    if (props.products !== null) {
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
    props.addProduct(body);
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
          <Input/>
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

  const deleteProduct = (id) => {
    props.deleteProduct(id);
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
      {
        title: "Action",
        dataIndex: "id",
        key: "action",
        render: (id, item) => {
          return (
            <div>
                <Space direction='horizontal'>
              <Popconfirm
                title="Sure to Delete?"
                onConfirm={() => deleteProduct(id)}
              >
                <a>
                  <DeleteTwoTone twoToneColor="red" width={100} />
                </a>
              </Popconfirm>
              <a onClick={()=>showUpdate(item)}>
                <EditTwoTone />
              </a>
              </Space>
            </div>
          );
        },
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

  const updateProduct = (product) => {
    props.updateProduct(product)
  };
  const showUpdate = (item) => {
    setShowUpdateModal(true);
    setProductUpdate(item)
  };
  const closeUpdate = () => {
    setShowUpdateModal(false);
  };

  const UpdateModal = () => {
      const onUpdateFinish = (values)=>{
        updateProduct(values.product)
        closeUpdate()
      }
    return (
      <Modal
        title="Update"
        visible={showUpdateModal}
        onCancel={closeUpdate}
        footer={[]}
      >
        <Form
          labelCol={{
            span: 10,
          }}
          wrapperCol={{}}
          layout="vertical"
          onFinish = {onUpdateFinish}
          initialValues={{
            size: componentSize,
          }}
          // onFinish={}
          size={componentSize}
        >
          <Form.Item
            name={["product", "id"]}
            initialValue={productUpdate.id}
            noStyle
          />
          <Form.Item
            name={["product", "name"]}
            label="Product Name"
            initialValue={productUpdate.name}
            rules={[{ required: true }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name={["product", "img"]}
            label="Image Link"
            initialValue={productUpdate.img}
            rules={[{ required: true }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name={["product", "desc"]}
            label="Description"
            initialValue={productUpdate.desc}
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name={["product", "price"]}
            label="Price"
            initialValue={productUpdate.price}
            rules={[{ required: true }]}
          >
            <Input type="number"/>
          </Form.Item>
          <Form.Item
            name={["product", "rate"]}
            label="Rating"
            initialValue={productUpdate.rate}
            rules={[{ required: true }]}
          >
            <Input type="number"/>
          </Form.Item>
          <Form.Item
            name={["product", "stock"]}
            label="Stock"
            initialValue={productUpdate.stock}
            rules={[{ required: true }]}
          >
            <Input type="number"/>
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
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
        <Col span={1} >
            <Divider type='vertical' style={{height:'100%'}}/>
        </Col>
        <Col span={15}>
          <ProductTable />
          <UpdateModal/>
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
      addProduct,
      deleteProduct,
      updateProduct
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductComponent);
