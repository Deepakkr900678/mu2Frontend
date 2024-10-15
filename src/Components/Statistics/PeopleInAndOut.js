import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useFetchSecuritiesDayWiseQuery } from "../../Slices/securityApiSlice";
import { useSelector } from "react-redux";
import { useSchoolWiseDataQuery } from "../../Slices/dashboardApiSlice";
import { Checkbox, DatePicker, Result } from "antd";
import { format } from "date-fns";

const tableData1 = {
  DayScholar: {
    Monday: { IN: 30, OUT: 10 },
    Tuesday: { IN: 45, OUT: 15 },
    Wednesday: { IN: 60, OUT: 20 },
    Thursday: { IN: 25, OUT: 15 },
    Friday: { IN: 70, OUT: 30 },
    Saturday: { IN: 20, OUT: 20 },
    Sunday: { IN: 40, OUT: 30 },
  },
  Hostler: {
    Monday: { IN: 25, OUT: 5 },
    Tuesday: { IN: 40, OUT: 10 },
    Wednesday: { IN: 55, OUT: 15 },
    Thursday: { IN: 30, OUT: 10 },
    Friday: { IN: 65, OUT: 25 },
    Saturday: { IN: 30, OUT: 20 },
    Sunday: { IN: 35, OUT: 25 },
  },
};

const BarGraph = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartData, setChartData] = useState();
  const { RangePicker } = DatePicker;
  // const {
  //   data: dataForTable,
  //   isLoading,
  //   isError,
  // } = useFetchSecuritiesDayWiseQuery();
  const {
    data: dataSchoolWise,
    refetch,
    isError,
  } = useSchoolWiseDataQuery({
    startDate,
    endDate,
  });

  /* Lokesh Replace "tableData = dataForTable?.daywise_data" while using actual Data */
  const tableData = useSelector((state) => state.daywise_data);

  const [selectedOption, setSelectedOption] = useState("DayScholar");
  const state = useSelector((state) => state);
  if (state.refresh.refresh) {
    refetch();
  }
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  function getdata(inoutdata, option) {
    if (option === "DayScholar") {
      const movingdata = inoutdata?.School_Counts?.DayScholar;
      return movingdata;
    } else if (option === "Hostler") {
      const movingdata = inoutdata?.School_Counts?.Hostler;
      return movingdata;
    }
  }
  const data = getdata(dataSchoolWise, selectedOption) || [];

  const transformedData = Object.keys(data).map((day) => ({
    day,
    in: data[day].IN,
    out: data[day].OUT,
  }));

  // const onCheckboxChecked = () => {
  //   setShowDatePicker(true);
  // };

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
    <>
      {data && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>People In and Out</h2>
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="DayScholar">Day Scholars</option>
            <option value="Hostler">Hostlers</option>
          </select>

          <BarChart
            width={800}
            height={400}
            data={transformedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="in" stackId="a" fill="#68ed53" name="In" />
            <Bar dataKey="out" stackId="a" fill="#ed5353" name="Out" />
          </BarChart>
          {/* <div
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
          </div> */}
        </div>
      )}
    </>
  );
};

export default BarGraph;
