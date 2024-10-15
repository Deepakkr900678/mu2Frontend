import { useEffect, useState } from "react";
import SearchComponent from "../SearchComponent/SearchComponent";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import { useFetchStudentProfilesQuery } from "../../Slices/studentApiSlice";
import {
  useFetchPastApprovedLeavesQuery,
  useGetLatestLeaveQuery,
} from "../../Slices/appliedLeavesApiSlice";
import StudentLogo from "../IdCardComponent/studentLogo.png";
import { useCheckInOrOutUserMutation } from "../../Slices/securityApiSlice";

const ManualCheckInOut = () => {
  const state = useSelector((state) => state);
  const searchTerm = state.search.keyword;
  const activeTab = state.key.activekey;
  const [user, setUser] = useState(null);
  const [checkInDone, setCheckInDone] = useState(false);
  const [checkOutDone, setCheckOutDone] = useState(false);
  const [suspended, setSuspended] = useState(false);
  const [hostlerCheckOutFailed, setCheckHostlerCheckoutFailed] =
    useState(false);

  const [keyword, setKeyword] = useState();

  const { data, isLoading, isError, refetch } = useFetchStudentProfilesQuery(
    {
      keyword,
    },
    {
      cacheTime: 0,
    }
  );
  const { data: latestLeave, refetch: refetchLatestLeave } =
    useGetLatestLeaveQuery({ keyword: searchTerm });

  const [checkInOrOutUser, { isLoading: checkInOrOutLoading, isSuccess }] =
    useCheckInOrOutUserMutation();

  const handleRefetch = (searchTerm) => {
    setKeyword(searchTerm);
    refetch();
  };

  useEffect(() => {
    setUser(data?.usersWithHostelData[0]);
  }, [data]);

  //check-in 1-3
  //check-out 2-3

  const checkOutUser = async () => {
    const device = "2";
    const htno = user.HTNO;
    const data = { device, htno };
    const res = await checkInOrOutUser(data);
    if (res?.data?.A_TYPE === "DayScholar") {
      setCheckOutDone(true);
    } else if (res?.data?.A_TYPE === "Hostler") {
      if (res?.data?.LEAVE_APPROVED === "Yes") {
        setCheckOutDone(true);
        setCheckHostlerCheckoutFailed(false);
      } else if (res?.data?.LEAVE_APPROVED === "No") {
        setCheckOutDone(true);
        setCheckHostlerCheckoutFailed(true);
      }
    }
    refetch();
  };

  const checkInUser = async () => {
    const device = "1";
    const htno = user.HTNO;
    const data = { device, htno };
    const res = await checkInOrOutUser(data);
    console.log(res);
    if (res.data.SUSPEND === "Yes") {
      setCheckInDone(true);
      setSuspended(true);
    } else {
      setCheckInDone(true);
      setSuspended(false);
    }
    refetch();
  };

  return (
    <div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <SearchComponent onSearch={handleRefetch} activeTab={activeTab} />
      </div>
      <Modal
        open={checkInDone}
        onOk={() => setCheckInDone(false)}
        onCancel={() => setCheckInDone(false)}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          {suspended ? (
            <h3 style={{ color: "red" }}>User Suspended </h3>
          ) : (
            <h3 style={{ color: "green" }}>Check-In Successful</h3>
          )}
        </div>
      </Modal>
      <Modal
        open={checkOutDone}
        onOk={() => setCheckOutDone(false)}
        onCancel={() => setCheckOutDone(false)}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          {hostlerCheckOutFailed ? (
            <h3 style={{ color: "red" }}>Check-Out Failed</h3>
          ) : (
            <h3 style={{ color: "green" }}>Check-Out Successful</h3>
          )}
        </div>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        {keyword?.length > 0 && data?.usersWithHostelData?.length > 0 && (
          <div
            style={{ width: "50%", display: "flex", flexDirection: "column" }}
          >
            <div style={{ display: "flex", marginBottom: "20px" }}>
              <div style={{ flex: 1, paddingRight: "20px" }}>
                <h2 style={{ marginBottom: "20px", fontWeight: 800 }}>
                  {user.STUDENT_NAME}
                </h2>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "75%",
                  }}
                >
                  <strong style={{ marginRight: "15px" }}>HTNO:</strong>{" "}
                  {user.HTNO}
                </p>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "75%",
                  }}
                >
                  <strong style={{ marginRight: "15px" }}>Email:</strong>{" "}
                  {user.STUDENT_EMAIL}
                </p>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "75%",
                  }}
                >
                  <strong style={{ marginRight: "15px" }}>
                    Father's Name:
                  </strong>{" "}
                  {user.FATHER_NAME}
                </p>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "75%",
                  }}
                >
                  <strong style={{ marginRight: "15px" }}>
                    Accomidation Type:
                  </strong>{" "}
                  {user.A_TYPE}
                </p>
                <button
                  onClick={user.MOVING === "IN" ? checkOutUser : checkInUser}
                >
                  {user.MOVING === "IN"
                    ? "Check Out"
                    : user.MOVING === "OUT"
                    ? "Check In"
                    : ""}
                </button>
              </div>
              <div style={{ width: "150px" }}>
                <img
                  src={user.IMAGE}
                  alt={user.STUDENT_NAME}
                  style={{ width: "100%", height: "auto" }}
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = StudentLogo; // Set student logo on error
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManualCheckInOut;
