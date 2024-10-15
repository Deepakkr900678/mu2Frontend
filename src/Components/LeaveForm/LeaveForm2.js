import React, { useState } from "react";
import { useFetchStudentByIdQuery } from "../../Slices/studentApiSlice";
import { useApplyLeaveMutation } from "../../Slices/appliedLeavesApiSlice";
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  Space,
  DatePicker,
  Statistic,
  message,
  Modal,
} from "antd";
import moment from "moment";

const modalContentStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px", // Add padding for better spacing
};

const titleStyle = {
  fontFamily: "Lato, serif", // Custom font-family for the title
  fontSize: "24px",
  marginBottom: "20px", // Add some margin at the bottom for spacing
};

const LeaveForm2 = ({ htno }) => {
  const [applyLeave] = useApplyLeaveMutation();
  const {
    data: studentInfo,
    isloading,
    isError,
  } = useFetchStudentByIdQuery(htno);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [studentData, setStudentData] = useState({});
  const [form] = Form.useForm();
  const [dateVal, setDateVal] = useState();
  const [toVal, setToVal] = useState();
  const { RangePicker } = DatePicker;

  // Form Structure
  // Form Structure
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8, offset: 0 }, // Decrease span for large screens
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 8, offset: 0 }, // Decrease span for large screens
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 8 }, // Adjust offset for large screens
    },
  };

  const dateFormat = "YYYY/MM/DD";

  const onFinish = async (values) => {
    var data = {
      HTNO: values.htno,
      STUDENT_NAME: values.fullName,
      BLOCK: values.residence,
      ROOM: values.room_no,
      FROM: dateVal._d,
      TO: toVal._d,
      REASON: values.reason,
      BATCH: studentInfo.user.BATCH,
    };
    const result = await applyLeave(data);
    if (result.data?.updatedOutpass?.TOKEN) {
      setToken(result?.data?.updatedOutpass?.TOKEN);
    } else {
      setToken(result?.data?.newOutpass?.TOKEN);
    }
    // setToken(result.data.updatedOutpass.TOKEN);
    setIsModalOpen(true);
    // message.success(
    //   "Leave applied Succesfully , Please wait for the response through mail"
    // );

    // Get current form values
    const currentValues = form.getFieldsValue();

    // Reset all fields except for room_no and residence
    Object.keys(currentValues).forEach((field) => {
      if (
        field !== "room_no" &&
        field !== "residence" &&
        field !== "fullName" &&
        field !== "htno"
      ) {
        currentValues[field] = undefined;
      }
    });

    form.setFieldsValue(currentValues);
  };

  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };

  return (
    <>
      <Modal footer={null} closable={false} open={isModalOpen}>
        <div style={modalContentStyle}>
          <h4 style={titleStyle}>Leave applied Successfully</h4>
          <h4 style={{ marginTop: "10px", textAlign: "left" }}>
            {" "}
            Token : <span style={{ fontWeight: 600 }}>{token}</span>
          </h4>
          <Button
            style={{ marginTop: "10px" }}
            onClick={() => setIsModalOpen(false)}
            type="primary"
            ghost
          >
            Ok
          </Button>
        </div>
      </Modal>

      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          fullName: studentInfo?.user.STUDENT_NAME,
          htno: studentInfo?.user.HTNO,
          residence: studentInfo?.user.BLOCK,
          room_no: studentInfo?.user.ROOM,
          prefix: "86",
        }}
        scrollToFirstError
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "middle", // Center items vertically
          flexDirection: "column",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <Form.Item name="fullName" label="Full Name">
          <Input readOnly />
        </Form.Item>

        <Form.Item name="htno" label="Hall Ticket Number">
          <Input readOnly />
        </Form.Item>

        <Form.Item name="residence" label="Hostel Block" readOnly>
          <InputNumber
            readOnly
            value={studentInfo?.user?.BLOCK}
            style={{ width: "100%" }}
          />
          {/* <Cascader options={residences} /> */}
        </Form.Item>

        <Form.Item
          name="room_no"
          label="Room number"
          readOnly
          rules={[
            {
              required: true,
              message: "Please input Room number!",
            },
          ]}
        >
          <Input readOnly style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="From"
          label="Duration (From)"
          rules={[
            {
              required: true,
              message: "Please select a From date",
            },
          ]}
        >
          <DatePicker
            disabledDate={disabledDate}
            format={dateFormat}
            onChange={(val) => setDateVal(val)}
          />
        </Form.Item>

        <Form.Item
          name="To"
          label="Duration (To)"
          rules={[
            {
              validator: (_, value) => {
                if (!value || !dateVal) {
                  return Promise.resolve();
                }
                return value.isAfter(dateVal)
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("To date must be after From date")
                    );
              },
            },
            {
              required: true,
              message: "Please select a To date",
            },
          ]}
        >
          <DatePicker format={dateFormat} onChange={(val) => setToVal(val)} />
        </Form.Item>

        <Form.Item
          name="reason"
          label="Reason for Leave"
          rules={[
            {
              message: "Please enter reason",
              required: true,
            },
          ]}
        >
          <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>I have read the instructions below.</Checkbox>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LeaveForm2;
