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
  Alert,
  Tooltip,
} from "antd";
import Title from "antd/lib/typography/Title";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../Action/productAction";
import {
  DeleteTwoTone,
  EditTwoTone,
  SearchOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

const ProductComponent = (props) => {
  const [data, setData] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [productUpdate, setProductUpdate] = useState({});
  const [dataloading, setDataloading] = useState(true);

  useEffect(() => {
    props.fetchProduct();
  }, []);

  useEffect(() => {
    if (props.product !== null) {
      setData(props.product.products);
      setDataloading(props.product.loading);
    }
  }, [props.product]);

  const onAddFinish = (values) => {
    let body = {
      ...values.product,
      rate: parseInt(values.product.rate),
      price: parseInt(values.product.price),
      stock: parseInt(values.product.stock),
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
        initialValues={{}}
        onFinish={onAddFinish}
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
          <Button type="primary" htmlType="submit" loading={dataloading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const deleteProduct = (id) => {
    props.deleteProduct(id);
  };
  const [onSearchError, setOnSearchError] = useState(false);
  const onSearch = (text) => {
    if (text.target.value) {
      let searchedData = props.product.products.filter((item) => {
        return item.name.toLowerCase().match(text.target.value.toLowerCase());
      });
      if (searchedData.length > 0) {
        setData(searchedData);
        setOnSearchError(false);
      } else {
        setData(props.product.products);
        setOnSearchError(true);
      }
    } else {
      setData(props.product.products);
    }
  };
  const ProductTable = () => {
    const fontSize = (size) => {
      return {
        fontSize: size,
      };
    };
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
        sorter: (a, b) => a.price - b.price,
      },
      {
        title: "Description",
        dataIndex: "desc",
        key: "desc",
        render: (text) => text.substring(0, 100)+'...',
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
              <Space direction="horizontal">
                <Popconfirm
                  title="Sure to Delete?"
                  onConfirm={() => deleteProduct(id)}
                >
                  <a>
                    <DeleteTwoTone
                      twoToneColor="red"
                      width={100}
                      style={fontSize(16)}
                    />
                  </a>
                </Popconfirm>
                <a onClick={() => showUpdate(item)}>
                  <EditTwoTone style={fontSize(16)} />
                </a>
              </Space>
            </div>
          );
        },
      },
    ];
    return (
      <Table
        size="small"
        loading={dataloading}
        columns={columns}
        dataSource={data}
        style={{alignSelf: 'stretch'}}
      />
    );
  };

  const updateProduct = (product) => {
    let body = {
      ...product,
      rate: parseInt(product.rate),
      price: parseInt(product.price),
      stock: parseInt(product.stock),
    };
    props.updateProduct(body);
  };
  const showUpdate = (item) => {
    setShowUpdateModal(true);
    setProductUpdate(item);
  };
  const closeUpdate = () => {
    setShowUpdateModal(false);
  };

  const UpdateModal = () => {
    const onUpdateFinish = (values) => {
      updateProduct(values.product);
      closeUpdate();
    };
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
          onFinish={onUpdateFinish}
          initialValues={{
            product: productUpdate,
          }}
        >
          <Form.Item name={["product", "id"]} noStyle />
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
            <Input.TextArea rows={4} />
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
            <Space>
              <Button type="ghost" onClick={closeUpdate}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  const [displayAddForm, setDisplayAddForm] = useState("none");
  const isDisplayAddForm = displayAddForm === 'none'?false:true
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Row gutter={24}>
        <Col className='animate-box' span={isDisplayAddForm ? (
                6
              ) : (
                0
              )} style={{ display: displayAddForm }} >
          <Title level={3} style={{ textAlign: "center" }}>
            Add Product
          </Title>
          <AddProductForm />
        </Col>
        <Col span={1} style={{display:'flex', flexDirection:'column',alignItems:'flex-start'}}>
          <Tooltip  title={'Add New Product'} placement='bottom'>
          <Button
            shape="circle"
            onClick={() =>
              displayAddForm === "none"
                ? setDisplayAddForm("inline")
                : setDisplayAddForm("none")
            }
            icon={
              !isDisplayAddForm ? (
                <ArrowRightOutlined />
              ) : (
                <ArrowLeftOutlined />
              )
            }
          />
          </Tooltip>
        </Col>
        <Col span={displayAddForm === "none" ? (
                23
              ) : (
                17
              )}>
            <Space direction="vertical">
              <Input
                size="large"
                placeholder="Search Products"
                prefix={<SearchOutlined />}
                onChange={onSearch}
                style={{ width: 300, marginBottom: 10}}
              />
              {onSearchError && (
                <Alert type="error" message="Cannot Find Product" closable />
              )}
            </Space>
            <ProductTable />
          <UpdateModal />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { ...state };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchProduct,
      addProduct,
      deleteProduct,
      updateProduct,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductComponent);
