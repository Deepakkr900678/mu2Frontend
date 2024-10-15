import React from "react";
import CustomDiv from "./CustomDiv";
import { useSelector } from "react-redux";
import { useUnderSuspensionQuery } from "../../Slices/dashboardApiSlice";

const TotalHostlers = () => {
  const { data, isLoading, isError, refetch } = useUnderSuspensionQuery();
  const state = useSelector((state) => state);

  if (state.refresh.refresh) {
    refetch();
  }

  return (
    <CustomDiv
      isError={isError}
      heading="Total Hostlers"
      value={data?.Student_HostlerCount}
    />
  );
};

export default TotalHostlers;
