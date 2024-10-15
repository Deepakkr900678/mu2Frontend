import React, { useState, useEffect } from "react";
import mu from "../Components/NavBar/logo.png";
import { Container, Navbar, Nav, Tab, Tabs } from "react-bootstrap";
import ApprovalTableSec from "../Components/SecurityOutpass/ApprovalTableSec";
import DescriptionTableSec from "../Components/SecurityOutpass/DescriptionTableSec";

import { connect, useSelector, useDispatch } from "react-redux";

const ApprovalPage = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    props.fetchApprovedLeaves();
    // dispatch(fetchAppliedLeaves)
    var int = setInterval(() => {
      props.fetchApprovedLeaves();
    }, 1000);
  }, []);

  const [ids, setids] = useState("");
  const [records, setRecords] = useState("");
  const [dt, setDt] = useState("");

  let x;

  const leaves = useSelector((state) => state.approved_leaves);

  const handchange = (value, rec, asn) => {
    setids(value);
    setRecords(rec);
    setDt(asn);

    props.fetchStudentById(value);
    props.fetchStudentVacStatus(value);
  };

  for (let val of props.approved_leaves) {
    if (val.HTNO === ids && val.TOKEN === records && val.ASN_DATE === dt) {
      x = val;
    }
  }

  const desc = !x ? null : (
    <DescriptionTableSec
      data={x}
      student={props.student}
      vac={props.vac}
      val={ids}
    />
  );

  //  Subscribe to messages on channel

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={mu}
              width={160}
              height={50}
              style={{ marginLeft: 20 }}
              alt="mu-logo"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-center">
              {/* <Nav.Link href="#home">Sign Out</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="pending" title=" Leaves Approved">
          {desc}
          <ApprovalTableSec data={leaves} change={handchange} />
        </Tab>
        <Tab eventKey="pending1" title=" Visitor Pass "></Tab>
      </Tabs>
    </div>
  );
};

export default ApprovalPage;

// const mapStateToProps = (state) => {
//   // console.log(state);

//   return {
//     leave: state.leave,
//     approved_leaves: state.approved_leaves,
//     student: state.student,
//     vac: state.vaccination,
//   };
// };

// export default connect(mapStateToProps, {
//   fetchApprovedLeaves,
//   fetchStudentById: fetchStudentById,
//   fetchStudentVacStatus: fetchStudentVacStatus,
// })(ApprovalPage);
