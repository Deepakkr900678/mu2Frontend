import React from "react";
import CustomDiv from "./CustomDiv";
import { useSelector } from "react-redux";
import { useUnderSuspensionQuery } from "../../Slices/dashboardApiSlice";

const TotalDayScholar = () => {
  const { data, isLoading, isError, refetch } = useUnderSuspensionQuery();
  const state = useSelector((state) => state);

  if (state.refresh.refresh) {
    refetch();
  }

  return (
    <CustomDiv
      isError={isError}
      heading="Total Day Scholars"
      value={data?.Student_DayScholarCount}
    />
  );
};

export default TotalDayScholar;
