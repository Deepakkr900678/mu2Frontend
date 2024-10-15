import React from "react";
import styled from "styled-components";

const TopDiv = styled.div`
  ${
    "" /* &:hover {
    border: 1px solid #e31138;
  } */
  }
`;

const HeadingDiv = styled.div`
  &:hover {
    box-shadow: 0 4px 8px rgba(227, 17, 56, 0.3);
  }
`;

const CustomDiv = (props) => {
  return (
    <>
      {props.isError && (
        <TopDiv
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "20px",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: "80%",
          }}
        >
          <div
            style={{
              height: "50px",
              width: "100%",
              backgroundColor: "#e31138",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            {props.heading}
          </div>
          <div
            style={{
              height: "150px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "4.5rem",
              fontWeight: "bold",
            }}
          >
            <p style={{ fontSize: "20px" }}>Error Occured</p>
          </div>
        </TopDiv>
      )}
      {!props.isError && (
        <TopDiv
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "20px",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: "80%",
          }}
        >
          <div
            style={{
              height: "50px",
              width: "100%",
              backgroundColor: "#e31138",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            {props.heading}
          </div>
          <div
            style={{
              height: "150px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "4.5rem",
              fontWeight: "bold",
            }}
          >
            {props.value}
          </div>
        </TopDiv>
      )}
    </>
  );
};

export default CustomDiv;
