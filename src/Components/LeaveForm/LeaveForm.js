import React, { useEffect, useState } from "react";
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

import { useHistory } from "react-router-dom";
import { useFetchStudentByIdQuery } from "../../Slices/studentApiSlice";
import { useApplyLeaveMutation } from "../../Slices/appliedLeavesApiSlice";
import moment from "moment";

const { Option } = Select;
const { RangePicker } = DatePicker;

const residences = [
  {
    value: "dorms",
    label: "Dormitories",
    children: [
      {
        value: "Satpura",
        label: "Satpura",
      },
      {
        value: "Niligiri",
        label: "Niligiri",
      },
      {
        value: "Aravali",
        label: "Aravali",
      },
      {
        value: "Ajanta",
        label: "Ajanta",
      },
      {
        value: "Himalaya",
        label: "Himalaya",
      },
      {
        value: "Shivalik",
        label: "Shivalik",
      },
      {
        value: "Vindhya",
        label: "Vindhya",
      },
      {
        value: "Kailash",
        label: "Kailash",
      },
    ],
  },
  {
    value: "Phase-1",
    label: "Hostel block phase-1",
  },
  {
    value: "Phase-2",
    label: "Hostel block phase-2",
  },
  {
    value: "Phase-3",
    label: "Hostel block phase-3",
  },
];

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const LeaveForm = (props) => {
  const [applyLeave] = useApplyLeaveMutation();
  const {
    data: studentInfo,
    isloading,
    isError,
  } = useFetchStudentByIdQuery(props.htno);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [studentData, setStudentData] = useState({});
  const [form] = Form.useForm();
  const [dateVal, setDateVal] = useState();
  const [toVal, setToVal] = useState();

  const history = useHistory();
  let names;
  let id;
  let batch;
  useEffect(() => {
    const name = isloading ? [] : isError ? [] : studentInfo?.user;
    if (name) {
      names = name.STUDENT_NAME;
      id = name.HTNO;
      batch = name.BATCH;
      setStudentData({ names, id, batch });
    }
  }, [isloading, isError, studentInfo]);

  const onFinish = async (values) => {
    var p;
    if (values.residence[1] === undefined) {
      p = values.residence[0];
    } else {
      p = values.residence[0] + " " + values.residence[1];
    }
    var data = {
      HTNO: id,
      STUDENT_NAME: names,
      BLOCK: p,
      ROOM: values.room_no,
      FROM: dateVal._d,
      TO: toVal._d,
      REASON: values.reason,
      BATCH: batch,
    };
    const result = await applyLeave(data);
    setToken(result.data.updatedOutpass.TOKEN);
    setIsModalOpen(true);
    // message.success(
    //   "Leave applied Succesfully , Please wait for the response through mail"
    // );

    // Get current form values
    const currentValues = form.getFieldsValue();

    // Reset all fields except for room_no and residence
    Object.keys(currentValues).forEach((field) => {
      if (field !== "room_no" && field !== "residence") {
        currentValues[field] = undefined;
      }
    });

    // Set the updated values back to the form
    form.setFieldsValue(currentValues);
  };

  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      {/* <Select
        style={{
          width: 70,
        }}
      >
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select> */}
    </Form.Item>
  );

  const dateFormat = "YYYY/MM/DD";

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  const studentName = studentData.names;

  useEffect(() => {
    // Update form fields when data is available
    if (studentInfo) {
      form.setFieldsValue({
        Student_name: studentData.name,
        residence: [studentInfo.user.BLOCK],
        room_no: studentInfo.user.ROOM,
      });
    }
  }, [studentInfo, form]);

  const disabledDate = (current) => {
    // Disable dates before today
    return current && current < moment().startOf("day");
  };

  return (
    <>
      <Modal footer={null} closable={false} open={isModalOpen}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h4>
            Leave applied Succesfully <br /> Token : {token}
          </h4>
          <Button onClick={() => setIsModalOpen(false)} type="primary" ghost>
            Ok
          </Button>
        </div>
      </Modal>
      <Row
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "20px",
        }}
        md={16}
        gutter={[16, 16]}
      >
        <Col style={{ paddingLeft: "20px" }} md={9} sm={24}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <Input
              type="text"
              id="fullName"
              value={studentData.names}
              readOnly
            />
          </div>
        </Col>
        <Col style={{ paddingLeft: "20px" }} md={9} sm={24}>
          <div className="form-group">
            <label htmlFor="idNumber">Id number</label>
            <Input type="text" id="idNumber" value={String(id)} readOnly />
          </div>
        </Col>
      </Row>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: [],
          prefix: "86",
        }}
        scrollToFirstError
        style={{
          width: "80%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          paddingLeft: "20px",
        }}
      >
        <Form.Item name="fullName" label="Full Name">
          <Input readOnly value={studentData.names} />
        </Form.Item>

        <Form.Item
          name="residence"
          label="Hostel Block"
          rules={[
            {
              type: "array",
              required: true,
              message: "Please select your Block name!",
            },
          ]}
        >
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
          rules={[
            {
              required: true,
              message: "Please input Room number!",
            },
          ]}
        >
          <Input readOnly style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="From" label="Duration (From)">
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
export default LeaveForm;
