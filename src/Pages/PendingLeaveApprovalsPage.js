import { useSelector } from "react-redux";
import ApprovalTable from "../Components/Approval/ApprovalTable";
import DescriptionTable from "../Components/Approval/DescriptionTable";
import { useState } from "react";
import { useFetchStudentByIdQuery } from "../Slices/studentApiSlice";

const PendingLeaveApprovalsPage = ({ tab }) => {
  const state = useSelector((state) => state);
  const keyword = state.search.keyword || "";
  const [page, setPage] = useState(1);
  const [id, setid] = useState("");
  const [removeId, setRemoveId] = useState();
  const [data, setData] = useState({});

  const { data: StudentData, isError: isStudentDataError } =
    useFetchStudentByIdQuery(id);

  const handchange = (data) => {
    setid(data?.HTNO);
    setData(data);
  };

  const actionOnLeave = ({ htno, asnDate, token }) => {
    console.log(htno, asnDate, token);
  };

  const updateDisplayInTable = (id) => {
    setRemoveId(id);
  };

  return (
    <>
      {Object.keys(data).length > 0 && (
        <DescriptionTable
          triggerFunction={actionOnLeave}
          data={data}
          studentEmail={StudentData?.user.STUDENT_EMAIL}
          val={id}
          updateDisplayInTable={updateDisplayInTable}
        />
      )}
      <ApprovalTable change={handchange} tab={tab} removeId={removeId} />
    </>
  );
};

export default PendingLeaveApprovalsPage;
