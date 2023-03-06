import { useState } from "react";

import {
  Card,
  Col,
  Row,
  Typography,
  Tooltip,
  Progress,
  Upload,
  Form,
  Button,
  InputNumber,
  Input,
} from "antd";
import { Select, theme } from 'antd';


import Echart from "../components/chart/EChart";
import LineChart from "../components/chart/LineChart";

function Account() {

  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 20,
    },
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    }
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <>
      <div className="layout-content" style={{backgroundColor: ''}}>
      <h1>Details</h1>
        <Form
          name="basic"
          style={{ border: '1px solid black', padding: 40, margin: 20 }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Row>
            <Col
              xs={24} sm={24} md={12} lg={12}
              span={10}>
              <Form.Item
                label="Binance email"
                name="binanceEmail">
                <Input disabled/>
              </Form.Item>
            </Col>
            <Col
              xs={24} sm={24} md={12} lg={12}
              span={10}>
              <Form.Item
                label="Binance Pay Id"
                name="binancePayId">
                <Input disabled/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      <h1>Deposit Detials</h1>
        <Form
          name="basic"
          style={{ border: '1px solid black', padding: 40, margin: 20 }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Row>
            <Col
              xs={24} sm={24} md={12} lg={12}
              span={10}>
              <Form.Item
                label="Binance email"
                name="binanceEmail">
                <Input disabled/>
              </Form.Item>
            </Col>
            <Col
              xs={24} sm={24} md={12} lg={12}
              span={10}>
              <Form.Item
                label="Binance Pay Id"
                name="binancePayId">
                <Input disabled/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      <h1>Withdraw Details</h1>
        <Form
          name="basic"
          style={{ border: '1px solid black', padding: 40, margin: 20 }}
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Row>
            <Col
              xs={24} sm={24} md={8} lg={8}
              span={10}>
              <Form.Item
                label="Binance email"
                name="binanceEmail"
                rules={[{ required: true, message: 'Please input your Binance email!' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col
              xs={24} sm={24} md={6} lg={6}
              span={10}>
              <Form.Item
                label="Binance Pay Id"
                name="binancePayId"
                rules={[{ required: true, message: 'Please input your Binance pay id!' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col
              xs={24} sm={24} md={10} lg={10}
              span={10}>
              <Form.Item
                label="Binance User"
                name="username">
                <Input />
              </Form.Item>
            </Col>
            <Col
              xs={24} sm={24} md={12} lg={12}
              span={10}>
              <Form.Item wrapperCol={{ offset: 18, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default Account;
