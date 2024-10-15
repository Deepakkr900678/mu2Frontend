import React, { useState } from "react";
import BlockBasedFilter from "./BlockBasedFilter";
import { Cascader } from "antd";

const AtypeFilter = ({ onFilter }) => {
  const { SHOW_CHILD } = Cascader;
  const aTypes = [
    {
      value: "Hostler",
      label: "View only Hostlers",
    },
    {
      value: "DayScholar",
      label: "View only DayScholar",
    },
  ];

  const onChangeCascaderValue = (value) => {
    onFilter(value.flat());
  };

  return (
    <Cascader
      style={{
        marginBottom: "10px",
        width: "50%",
      }}
      options={aTypes}
      multiple
      maxTagCount="responsive"
      showCheckedStrategy={SHOW_CHILD}
      onChange={(value) => onChangeCascaderValue(value)}
      placeholder="Select Accomidation Type"
    />
  );
};

export default AtypeFilter;
