import React, { useState, useEffect } from "react";
import { Result, Spin } from "antd";
import { useATypeWiseDataQuery } from "../Slices/dashboardApiSlice";

const TotalInAndOut = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalDayScholarsIn, setTotalDayScholarsIn] = useState(0);
  const [totalHostelersIn, setTotalHostelersIn] = useState(0);
  const [totalIn, setTotalIn] = useState(0);
  const [totalDayScholarsOut, setTotalDayScholarsOut] = useState(0);
  const [totalHostelersOut, setTotalHostelersOut] = useState(0);
  const [totalOut, setTotalOut] = useState(0);

  const { data, isLoading, isError } = useATypeWiseDataQuery({});

  useEffect(() => {
    const calculateValues = (data) => {
      setTotalIn(
        data?.AType_Counts?.DayScholar?.IN + data?.AType_Counts?.Hostler?.IN
      );
      setTotalOut(
        data?.AType_Counts?.DayScholar?.OUT + data?.AType_Counts?.Hostler?.OUT
      );
      setTotalDayScholarsIn(data?.AType_Counts?.DayScholar?.IN);
      setTotalHostelersIn(data?.AType_Counts?.Hostler?.IN);
      setTotalDayScholarsOut(data?.AType_Counts?.DayScholar?.OUT);
      setTotalHostelersOut(data?.AType_Counts?.Hostler?.OUT);
    };
    calculateValues(data);
  }, [data]);

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        width: "100%",
        padding:"1.5rem 2rem"

      }}
    >
      <div>
        <p style={{ color: "#008000", fontWeight: "bold" }}>
          Total In: {totalIn}
        </p>
        <p style={{ color: "red", fontWeight: "bold" }}>
          Total Out: {totalOut}
        </p>
      </div>
      <div>
        <p style={{ color: "#008000", fontWeight: "bold" }}>
          Total Day Scholars In: {totalDayScholarsIn}
        </p>
        <p style={{ color: "red", fontWeight: "bold" }}>
          Total Day Scholars Out: {totalDayScholarsOut}
        </p>
      </div>

      <div>
        <p style={{ color: "#008000", fontWeight: "bold" }}>
          Total Hostelers In: {totalHostelersIn}
        </p>
        <p style={{ color: "red", fontWeight: "bold" }}>
          Total Hostelers Out: {totalHostelersOut}
        </p>
      </div>
    </div>
  );
};

export default TotalInAndOut;
