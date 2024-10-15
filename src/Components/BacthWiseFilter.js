import React, { useState } from "react";
import BlockBasedFilter from "./BlockBasedFilter";
import { Cascader } from "antd";

const BatchWiseFilter = ({ onFilter }) => {
  const { SHOW_CHILD } = Cascader;
  const years = [
    {
      value: "2016",
      label: "2016",
    },
    {
      value: "2017",
      label: "2017",
    },
    {
      value: "2018",
      label: "2018",
    },
    {
      value: "2019",
      label: "2019",
    },
    {
      value: "2020",
      label: "2020",
    },
    {
      value: "2021",
      label: "2021",
    },
    {
      value: "2022",
      label: "2022",
    },
    {
      value: "2023",
      label: "2023",
    },
    {
      value: "2024",
      label: "2024",
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
      options={years}
      multiple
      maxTagCount="responsive"
      showCheckedStrategy={SHOW_CHILD}
      onChange={(value) => onChangeCascaderValue(value)}
      placeholder="Select Batch"
    />
  );
};

export default BatchWiseFilter;
