import React from "react";
import styled from "styled-components";
import { GetScreenSizes } from "../ScreenSizes";
function MyComponent({ data }) {
  const { isSmallScreen } = GetScreenSizes();
  return (
    <Container style={{ width: "100%" }}>
      <Content>
        <BackgroundImage
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/35667e0b62f53f34b55b74c2fbdd4daa395f0574a3f2d064ac7131c918e95c11?"
          style={{ borderRadius: "15px" }}
        />
        <Info>
          <InfoRow>
            <Label>Branch</Label>
            <Value style={{ marginLeft: "40px" }}>{data.BRANCH}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Parent’s Email</Label>
            <Value style={{ marginLeft: "2px" }}>{data.PARENTS_EMAIL}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Parent’s Mobile</Label>
            <Value>{data.PARENTS_MOBILE}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Student Email</Label>
            <Value style={{ marginLeft: "5px" }}>{data.STUDENT_EMAIL}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Student Mobile</Label>
            <Value>{data.STUDENT_MOBILE}</Value>
          </InfoRow>
        </Info>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 500px;
  height: 215px;
  flex-direction: column;
  justify-content: center;
  transition: transform 0.2s, box-shadow 0.2s;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(15px);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  display: flex;
  height: 215px;
  width: 100%;
  align-items: start;
  border-radius: 15px;
  padding: 32px 80px 50px 10px;

  @media (max-width: 991px) {
    max-width: 100%;
    padding-right: 20px;
  }
`;

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

const Info = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 11px;
`;

const InfoRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: start;
  gap: 20px;
`;

const Label = styled.div`
  color: #000;
  font: 400 12px Inter, sans-serif;
`;

const Value = styled.div`
  color: #000;
  font: 400 12px Inter, sans-serif;
  text-align: left;
`;

export default MyComponent;
