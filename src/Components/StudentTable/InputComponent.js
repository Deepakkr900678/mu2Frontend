import React from "react";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Tooltip } from "antd";

const InputComponent = (props) => {
  const { placeHolder, prefixIcon, value, handleInputChange } = props;
  return (
    <>
      <Input
        placeholder={placeHolder}
        prefix={prefixIcon}
        value={value}
        onChange={handleInputChange}
      />
      <br />
      <br />
    </>
  );
};

export default InputComponent;
