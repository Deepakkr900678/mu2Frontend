import React, { useEffect, useState } from "react";
import { Card, Descriptions, message } from "antd";
import { useSelector } from "react-redux";
import moment from "moment";

import { Button } from "react-bootstrap";

const { Meta } = Card;

const DescriptionTable = (props) => {
  const visible = useSelector((state) => state.visible);

  if (props.val === "") {
    return <div>click view more</div>;
  } else {
    var x = props.data;
    var student = props.student;
    var vac = props.vac[0];
    if (!vac) return null;

    function handleClick(status) {
      props.updateApprovedLeave({
        token: x.TOKEN,
        status: status,
        htno: x.HTNO,
        asn: x.ASN_DATE,
      });
      console.log({
        type: status,
        desc: x.REASON,
        mail: student[0].STUDENT_EMAIL,
        from: x.FROM,
        to: x.TO,
        token: x.TOKEN,
        warden: "qqq",
      });

      // props.sendMail({
      //   type: status,
      //   desc: x.REASON,
      //   mail: student[0].STUDENT_EMAIL,
      //   from: x.FROM,
      //   to: x.TO,
      //   token: x.TOKEN,
      //   warden: "qqq",
      // });

      status === "exited"
        ? message.success(` ${x.HTNO} Exited`)
        : message.warning(`hello`);
      props.fetchVisible(false);
    }

    return (
      <>
        <div style={{ marginBottom: 40 }}>
          <Descriptions
            title="Details of Student "
            bordered
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="Applied At">
              {" "}
              {visible ? moment(x.ASN_DATE).format("LLLL") : ""}{" "}
            </Descriptions.Item>
            <Descriptions.Item label="Token ID">
              {visible ? x.TOKEN : ""}
            </Descriptions.Item>
            <Descriptions.Item label="HTNO">
              {visible ? x.HTNO : ""}
            </Descriptions.Item>
            <Descriptions.Item label="STUDENT NAME">
              {visible ? x.STUDENT_NAME : ""}
            </Descriptions.Item>

            <Descriptions.Item label="From">
              {visible ? moment(x.FROM).format("LLLL") : ""}
            </Descriptions.Item>
            <Descriptions.Item label="TO">
              {" "}
              {visible ? moment(x.TO).format("LLLL") : ""}
            </Descriptions.Item>
            <Descriptions.Item label="Vaccination status">
              <strong>
                {" "}
                {visible ? vac.VAC_NAME : ""}
                {`( ${visible ? vac.DOSE : ""} Doses)`}
              </strong>
            </Descriptions.Item>

            <Descriptions.Item label="Hostel Block and Room ">
              {" "}
              {visible ? x.BLOCK : ""} , {visible ? x.ROOM : ""}{" "}
            </Descriptions.Item>
            <Descriptions.Item label="Student's contact">
              {" "}
              {visible ? student[0].STUDENT_MOBILE : ""}{" "}
            </Descriptions.Item>
            <Descriptions.Item label="Parent's Contact / Email">
              {visible ? student[0].PARENTS_MOBILE : ""} ,{" "}
              {visible ? student[0].PARENTS_EMAIL : ""}{" "}
            </Descriptions.Item>
            <Descriptions.Item label="Reason">
              {" "}
              {visible ? x.REASON : ""}{" "}
            </Descriptions.Item>
            <Descriptions.Item label="Picture">
              {visible ? (
                <img
                  width={150}
                  src={`https://musecportal.s3.ap-south-1.amazonaws.com/${x.BACTH}/${x.HTNO}.JPG`}
                  alt="new"
                />
              ) : (
                ""
              )}
            </Descriptions.Item>
          </Descriptions>
        </div>
        <div>
          <Button variant="success" onClick={() => handleClick("exited")}>
            Exited
          </Button>{" "}
        </div>
        <hr />
      </>
    );
  }
};

export default DescriptionTable;
