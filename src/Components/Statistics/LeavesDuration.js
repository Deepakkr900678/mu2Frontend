import React from "react";
import CustomDiv from "./CustomDiv";
import { useAverageLeaveDurationQuery } from "../../Slices/dashboardApiSlice";
import { useSelector } from "react-redux";
const LeavesDuration = () => {
  const { data, isLoading, isError, refetch } = useAverageLeaveDurationQuery();
  const state = useSelector((state) => state);

  if (state.refresh.refresh) {
    refetch();
  }
  const roundedValue = Math.round(data?.avg_leave_duration);
  return (
    <CustomDiv
      isError={isError}
      heading="Avg Leave Duration (in Days)"
      value={`${roundedValue}`}
    />
  );
};

export default LeavesDuration;
