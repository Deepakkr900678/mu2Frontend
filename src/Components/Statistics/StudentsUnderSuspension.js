import React from "react";
import CustomDiv from "./CustomDiv";
import { useSelector } from "react-redux";
import {
  useSuspensionListQuery,
  useUnderSuspensionQuery,
} from "../../Slices/dashboardApiSlice";
const StudentsUnderSuspension = (props) => {
  const { data, isLoading, isError, refetch } = useUnderSuspensionQuery();
  const state = useSelector((state) => state);

  if (state.refresh.refresh) {
    refetch();
  }
  return (
    <CustomDiv
      isError={isError}
      heading="Student Under Suspension"
      value={data?.Student_Under_Suspension}
    />
  );
};

export default StudentsUnderSuspension;
