import { Card, Col, Row } from "antd";
import { useSelector, useDispatch } from "react-redux";
import IdCard from "../IdCardComponent/IdCard";
import lines from "../IdCardComponent/lines.jpg";
import DetailsDisplayCard from "./DetailsDisplayCard";
import { GetScreenSizes } from "../ScreenSizes";
import { setVisible } from "../../Slices/visibleSlice";
import { useCheckInOrOutUserMutation} from "../../Slices/securityApiSlice";

const { Meta } = Card;

const InOutDescriptionTable = (props) => {
  const isVisible = useSelector((state) => state.visible.isVisible);
  const dispatch = useDispatch();
  const [checkInOrOutUser] = useCheckInOrOutUserMutation();
  const { isSmallScreen, isMediumScreen, isLargeScreen } = GetScreenSizes();
  if (props.val === "") {
    return <div>click view more</div>;
  } else {
    var x = props.data;
    var st = props.student;

    // var vac = props.vac[0];
    // if (!vac) return null;
    // if (!student[0]) return null;
    // var st = student[0];


    async function handleClick(device) {
      try {
        
        // Call the mutation with necessary parameters, e.g., device and htno
        const response = await checkInOrOutUser({
          device: device, // Replace with actual device
          htno: st.HTNO,     // Replace with actual htno
        }).unwrap(); // .unwrap() will handle error cases more easily
  
        console.log("User check-in/out successful:", response);
        // Handle further logic here, e.g., updating the UI or calling other functions
        // props.updateDisplayInTable(x._id);
        dispatch(setVisible(false));
  
      } catch (error) {
        console.error("Error checking in/out user:", error);
        // Handle the error appropriately, e.g., show an error message to the user
      }
    }


    // function handleClick(status) {
    //   props.updateAppliedLeave({
    //     token: x.TOKEN,
    //     status: status,
    //     htno: x.HTNO,
    //     asn: x.ASN_DATE,
    //   });
    //   // props.sendMail({
    //   //   type: status,
    //   //   desc: x.REASON,
    //   //   mail: student[0].STUDENT_EMAIL,
    //   //   from: x.FROM,
    //   //   to: x.TO,
    //   //   token: x.TOKEN,
    //   //   warden: "qqq",
    //   // });

    //   status === "approved"
    //     ? message.success(`Leave approved for ${x.HTNO}`)
    //     : message.warning(`Leave rejected for ${x.HTNO}`);
    //   props.fetchVisible(false);
    // }

    function cov(ts_ms) {
      var date_ob = new Date(ts_ms / 1000);

      // year as 4 digits (YYYY)
      var year = date_ob.getFullYear();

      // month as 2 digits (MM)
      var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

      // date as 2 digits (DD)
      var date = ("0" + date_ob.getDate()).slice(-2);

      // hours as 2 digits (hh)
      return date + "/" + month + "/" + year;
    }

    function formatDateTime(dateTimeString) {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };

      const formattedDate = new Date(dateTimeString).toLocaleString(
        undefined,
        options
      );
      return formattedDate;
    }


    return (
      <div style={{ marginBottom: "20px" }}>
        {isVisible && !isSmallScreen && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div>{isVisible && <IdCard data={st} />}</div>
            {isVisible && (
              <div>
                {/* <div style={{ marginTop: 20 }}>
                    <div>
                      <strong>BRANCH:</strong>
                      {st.BRANCH}
                    </div>

                    <div>
                      <strong>PARENTS_EMAIL:</strong>
                      {st.PARENTS_EMAIL}
                    </div>
                    <div>
                      <strong>PARENTS_MOBILE:</strong>
                      {st.PARENTS_MOBILE}
                    </div>

                    <div>
                      <strong>STUDENT_EMAIL:</strong>
                      {st.STUDENT_EMAIL}
                    </div>
                    <div>
                      <strong>STUDENT_MOBILE:</strong>
                      {st.STUDENT_MOBILE}
                    </div>
                    <div>
                      <img style={{ width: "100%" }} src={lines} alt="lines" />{" "}
                    </div>
                  </div> */}
                <DetailsDisplayCard data={st} />
              </div>
            )}

      

            {/* <div style={{ marginBottom: 40 }}>
          <Descriptions
            title="Details of Student "
            bordered
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }} */}
            {/* > */}
            {/* <Descriptions.Item label="Applied At">
              {" "}
              {visible ? "hrlo" : ""}{" "}
            </Descriptions.Item> */}
            {/* <Descriptions.Item label="Token ID">
              {visible ? "heelo" : ""}
            </Descriptions.Item> */}
            {/* <Descriptions.Item label="HTNO">
              {visible ? x : ""}
            </Descriptions.Item>
            <Descriptions.Item label="STUDENT NAME">
              {visible ? st.STUDENT_NAME : ""}
            </Descriptions.Item> */}
            {/* <Descriptions.Item label="From">
              {visible ? "time" : ""}
            </Descriptions.Item>
            <Descriptions.Item label="TO">
              {" "}
              {visible ? "tto" : ""}
            </Descriptions.Item> */}
            {/* <Descriptions.Item label="Vaccination status">
              <strong>
                {" "}
                {visible ? vac.VAC_NAME : ""}
                {`( ${visible ? vac.DOSE : ""} Doses)`}
              </strong>
            </Descriptions.Item> */}
            {/* <Descriptions.Item label="Hostel Block and Room ">
              {" "}
              {visible ? x.BLOCK : ""} , {visible ? x.ROOM : ""}{" "}
            </Descriptions.Item> */}
            {/* <Descriptions.Item label="Student's contact">
              {" "}
              {visible ? st.STUDENT_MOBILE : ""}{" "}
            </Descriptions.Item>
            <Descriptions.Item label="Student's email">
              {" "}
              {visible ? st.STUDENT_EMAIL : ""}{" "}
            </Descriptions.Item>
            <Descriptions.Item label="Parent's Contact / Email">
              {visible ? st.PARENTS_MOBILE : ""} ,{" "}
              {visible ? st.PARENTS_EMAIL : ""}{" "}
            </Descriptions.Item> */}
            {/* <Descriptions.Item label="Reason">
              {" "}
              {visible ? "dvf" : ""}{" "}
            </Descriptions.Item> */}
            {/* <Descriptions.Item label="Picture">
              {visible ? (
                <img
                  width={150}
                  src={`https://musecportal.s3.ap-south-1.amazonaws.com/2018/18XJ1A0502.JPG`}
                  alt="new"
                />
              ) : (
                ""
              )}
            </Descriptions.Item>
          </Descriptions>
        </div> */}

          </div>
        )}
        {isVisible && isSmallScreen && (
          <Row style={{ gap: "10px" }}>
            <Col xs={24}>
              <IdCard data={st} />
            </Col>
            <Col xs={24}>
              <DetailsDisplayCard data={st} />
            </Col>
          </Row>
        )}

{isVisible && (
  <div className="flex justify-between w-full">
<div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 120px',
      borderRadius: '10px',
      backgroundColor: '#f5f5f5',
      marginTop:"20px"
    }}>
      <button style={{
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '18px',
        cursor: 'pointer',
        backgroundColor: '#f42d2d',
        color: 'white'
      }} 
      onClick={() => handleClick("2")}
      >Manual Out</button>
      <button style={{
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '18px',
        cursor: 'pointer',
        backgroundColor: '#1fae1f',
        color: 'white'
      }}
      onClick={() => handleClick("1")}
      >Manual In</button>
    </div>
  </div>
)}
      </div>
    );
  }
};

export default InOutDescriptionTable;
