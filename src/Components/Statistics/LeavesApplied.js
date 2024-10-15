import React, { useEffect, useState } from "react";
import CustomDiv from "./CustomDiv";
import { Checkbox, Col, DatePicker, Row } from "antd";
import { format } from "date-fns";
import { useCurrentAppliedLeavesQuery } from "../../Slices/dashboardApiSlice";
import { baseURL } from "../../apis/web";
import { useSelector } from "react-redux";

const LeavesApplied = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [count, setCount] = useState();
  const { data, isLoading, isError, refetch } = useCurrentAppliedLeavesQuery({
    startDate,
    endDate,
  });
  const state = useSelector((state) => state);

  if (state.refresh.refresh) {
    refetch();
  }
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    refetch();
  }, [startDate, endDate, refetch]);

  const onCheckBoxChecked = () => {
    setShowDatePicker(true);
  };

  const { RangePicker } = DatePicker;

  const onDateSelection = (value) => {
    if (value && value[0]?._d && value[1]?._d) {
      const startDay = format(value[0]._d, "yyyy-MM-dd");
      const endDay = format(value[1]._d, "yyyy-MM-dd");

      setStartDate(startDay);
      setEndDate(endDay);
      refetch();
    }
  };

  const refetchData = () => {
    refetch();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CustomDiv
        isError={isError}
        heading="Current Applied Leaves"
        value={data?.Leaves_Count}
      />
      <Col>
        {showDatePicker && (
          <Row lg={6}>
            <RangePicker onChange={onDateSelection} />
          </Row>
        )}
        {!showDatePicker && (
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
            }}
          >
            Customize Data
            <Checkbox onChange={onCheckBoxChecked} style={{ color: "red" }} />
          </Row>
        )}
      </Col>
      {/* <button onClick={refetchData}>Refresh</button> */}
    </div>
  );
};

export default LeavesApplied;
