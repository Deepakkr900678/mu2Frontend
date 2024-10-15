import { Cascader } from "antd";
import React, { useEffect, useState } from "react";

const BlockBasedFilter = ({ onFilter }) => {
  const { SHOW_CHILD } = Cascader;

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

  const onChangeCascaderValue = (value) => {
    const childValues = value.map((item) => {
      const lastItem = item[item.length - 1];
      return lastItem.replace(/^dorms /, ""); // Remove "dorms " from the beginning of the string
    });
    onFilter(childValues);
  };

  return (
    <Cascader
      style={{ width: "150px" }}
      options={residences}
      multiple
      maxTagCount="responsive"
      showCheckedStrategy={SHOW_CHILD}
      onChange={(value) => onChangeCascaderValue(value)}
      placeholder="Select Hostel Block"
    />
  );
};

export default BlockBasedFilter;
