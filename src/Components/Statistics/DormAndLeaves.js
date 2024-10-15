import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Checkbox, DatePicker } from "antd";
import { format } from "date-fns";
import { useBlockWiseLeaveQuery } from "../../Slices/dashboardApiSlice";
import { useSelector } from "react-redux";

const LeavesChart = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartData, setChartData] = useState([]);
  const {
    data: fetchedData,
    isLoading,
    isError,
    refetch,
  } = useBlockWiseLeaveQuery({ startDate, endDate });

  const state = useSelector((state) => state);

  if (state.refresh.refresh) {
    refetch();
  }
  useEffect(() => {
    // Check if fetchedData exists and has Leaves_Granted property
    if (fetchedData && fetchedData.Leaves_Granted) {
      setChartData(fetchedData.Leaves_Granted);
    }
  }, [fetchedData]);

  const { RangePicker } = DatePicker;

  const onCheckboxChecked = () => {
    setShowDatePicker(true);
  };

  const onSelectDate = (value) => {
    if (value && value[0]?._d && value[1]?._d) {
      const startDay = format(value[0]._d, "yyyy-MM-dd");
      const endDay = format(value[1]._d, "yyyy-MM-dd");

      setStartDate(startDay);
      setEndDate(endDay);
      refetch();
    }
  };

  return (
    <div
      style={{
        width: "100%",
        margin: "20px auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2>Leaves Granted</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="leavesGranted"
            fill="#68ed53"
            label={{ position: "top" }}
            name="Leaves Accepted"
            style={{ color: "black" }}
          />
          <Bar
            dataKey="leavesRejected"
            fill="#ed5353"
            label={{ position: "top" }}
            name="Leaves Rejected"
          />
        </BarChart>
      </ResponsiveContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!showDatePicker && (
          <p>
            Customize Data <Checkbox onChange={onCheckboxChecked} />
          </p>
        )}

        {showDatePicker && <RangePicker onChange={onSelectDate} />}
      </div>
    </div>
  );
};

export default LeavesChart;
