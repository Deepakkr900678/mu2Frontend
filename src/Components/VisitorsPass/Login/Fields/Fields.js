import React from "react";
import "antd/dist/antd.css";
import { Form, Input, InputNumber, Button, DatePicker } from "antd";
import TopNavBar from "../NavBar/TopNavBar";
import "./Fields.css";
import Container from "react-bootstrap/Container";
import formResult from "../Result/Result";

// import { gql, useMutation } from "@apollo/client";

// import { v4 as uuidv4 } from "uuid";

const layout = {
  labelCol: {
    span: 8,
    //8
  },
  wrapperCol: {
    span: 16,
    //16
  },
};

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

const Fields = () => {
  // const [addVisiting, { data, loading, error }] = useMutation(ADD_PASS);

  const onFinish = (values) => {};

  return (
    <div>
      <Container>
        <div className="Form">
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name="VISITORS_NAME"
              label="Visitor's Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input style={{ borderRadius: "5px", marginLeft: "10px" }} />
            </Form.Item>
            <Form.Item name="STUDENT_NAME" label="Student's Name">
              <Input style={{ borderRadius: "5px", marginLeft: "10px" }} />
            </Form.Item>
            <Form.Item name="HTNO" label="Hall Ticket No.">
              <Input style={{ borderRadius: "5px", marginLeft: "10px" }} />
            </Form.Item>
            <Form.Item name="EMAIL" label="Email">
              <Input style={{ borderRadius: "5px", marginLeft: "10px" }} />
            </Form.Item>
            <Form.Item
              name="PHNO"
              label="Phone No."
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input style={{ borderRadius: "5px", marginLeft: "10px" }} />
            </Form.Item>
            <Form.Item name="VEHICLE_NO" label="Vehicle No.">
              <Input style={{ borderRadius: "5px", marginLeft: "10px" }} />
            </Form.Item>
            <Form.Item
              name="FROM"
              label="Coming From"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input style={{ borderRadius: "5px", marginLeft: "10px" }} />
            </Form.Item>
            <Form.Item
              name="MEET"
              label="To meet"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input style={{ borderRadius: "5px", marginLeft: "10px" }} />
            </Form.Item>
            <Form.Item
              name="DATE"
              label="Visiting Date"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              {/* <Input style={{ borderRadius: "5px", marginLeft: "10px" }} /> */}
              <DatePicker style={{ borderRadius: "5px", marginLeft: "10px" }} />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
              <Button type="primary" htmlType="submit">
                Get E-Pass
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Container>
    </div>
  );
};
export default Fields;
