// Room.js
import React from "react";
import styled from "styled-components";

const Component1 = styled.div`
  position: relative;
  background-color: #fff;
  width: 100%;
  height: 500px;
  overflow: hidden;
  border: 2px solid black;
`;

const Component1Child = styled.div`
  position: absolute;
  height: 99.41%;
  width: 99.81%;
  top: 0.59%;
  right: 0.19%;
  bottom: 0%;
  left: 0%;
  background-color: #d9d9d9;
  transform: rotate(-0.19deg);
  transform-origin: 0 0;
`;

const Component1Item = styled.div`
  position: absolute;
  height: 44.77%;
  width: 56.56%;
  top: -0.31%;
  right: 43.61%;
  bottom: 55.54%;
  left: -0.17%;
  background-color: #fff;
  border: 1px solid black;
  box-sizing: border-box;
`;

const Component1Inner = styled.div`
  position: absolute;
  height: 44.77%;
  width: 56.56%;
  top: 54.96%;
  right: 43.61%;
  bottom: 0.28%;
  left: -0.17%;
  background-color: #fff;
  border: 1px solid black;
  box-sizing: border-box;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #fff;
  border: 1px solid black;
  padding: 5px 10px;
  cursor: pointer;
`;

const Room = ({ onClose }) => {
  return (
    <Component1>
      <Component1Child />
      <Component1Item />
      <Component1Inner />
      <CloseButton onClick={onClose}>Close</CloseButton>
    </Component1>
  );
};

export default Room;
