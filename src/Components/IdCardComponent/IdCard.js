import React, { useEffect, useState } from "react";

import "./style.css";
import Logo from "./logo.png";
import Rectangle8 from "./Rectangle 8.png";
import Rectangle6 from "./Rectangle 6.png";
import Reactangle7 from "./Rectangle 7.png";
import StudentLogo from "./studentLogo.png";
import { GetScreenSizes } from "../ScreenSizes";
import styled from "styled-components";

const CustomPara = styled.p`
  font-size: 15px;
  font-weight: 600;
`;

const IdCard = (props) => {
  const studentData = props.data;
  const [imageError, setImageError] = useState(false);
  const [image, setImage] = useState(StudentLogo);
  const smallCaseHtno = studentData?.HTNO?.toLowerCase();
  const imageLink = `https://musecportal.s3.ap-south-1.amazonaws.com/${studentData.BATCH}/${smallCaseHtno}.jpg`;

  console.log(imageLink);

  const handleImageError = () => {
    setImageError(true);
    setImage(StudentLogo);
  };

  useEffect(() => {
    setImageError(false);
    setImage(imageLink);
  }, [props.data, imageLink]);

  const { isSmallScreen } = GetScreenSizes();

  return (
    <div className={isSmallScreen ? "componentMobile" : "component"}>
      <img className="logo" alt="Logo" src={Logo} />
      <img className="rectangle" alt="Rectangle" src={Rectangle6} />
      {!isSmallScreen && (
        <img className="img" alt="Rectangle" src={Reactangle7} />
      )}
      <img className="rectangle-2" alt="Rectangle" src={Rectangle8} />
      <div className="rectangle-3">
        <CustomPara>Name</CustomPara>
      </div>
      <div className="div">
        <CustomPara>ID No.</CustomPara>
      </div>
      <div className="rectangle-4">
        <CustomPara>Batch</CustomPara>
      </div>
      <div className="rectangle-5">
        <CustomPara>School</CustomPara>
      </div>
      <CustomPara className="p">
        Ecole Centrale School of Engineering
      </CustomPara>
      <div className="text-wrapper-4">
        <CustomPara>{studentData?.STUDENT_NAME}</CustomPara>
      </div>
      <div className="text-wrapper-5">
        <CustomPara>{studentData?.HTNO}</CustomPara>
      </div>

      <div className="text-wrapper-6">
        <CustomPara>{studentData?.BATCH}</CustomPara>
      </div>

      {!isSmallScreen && (
        <img
          src={imageError ? StudentLogo : image}
          onError={handleImageError}
          className="rectangle-6"
          alt="std-logo"
        />
      )}
    </div>
  );
};

export default IdCard;
