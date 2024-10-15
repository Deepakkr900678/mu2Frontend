import { useState } from "react";
import styled from "styled-components";
import Room from "../Components/HostelComponents/Room";

const Component1Child = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  left: 0%;
  background-color: #cfcece;
`;
const Component1Item = styled.div`
  position: absolute;
  height: 34.77%;
  width: 79.94%;
  top: 32.7%;
  right: 20.06%;
  bottom: 32.54%;
  left: 0%;
  background-color: #fff;
`;
const Component1Inner = styled.div`
  position: absolute;
  height: 10.85%;
  width: 9.82%;
  top: -0.16%;
  right: 90.25%;
  bottom: 89.31%;
  left: -0.07%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
`;
const RectangleDiv = styled.div`
  position: absolute;
  height: 10.85%;
  width: 9.82%;
  top: 22.01%;
  right: 37.57%;
  bottom: 67.15%;
  left: 52.61%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
`;
const Component1Child1 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 9.82%;
  top: 22.01%;
  right: 72.67%;
  bottom: 67.15%;
  left: 17.51%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
`;
const Component1Child2 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 9.82%;
  top: -0.16%;
  right: 37.57%;
  bottom: 89.31%;
  left: 52.61%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
`;
const Component1Child3 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 9.82%;
  top: -0.16%;
  right: 72.67%;
  bottom: 89.31%;
  left: 17.51%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
`;
const Component1Child4 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 9.82%;
  top: -0.16%;
  right: 55.08%;
  bottom: 89.31%;
  left: 35.1%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
`;
const Component1Child5 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 9.82%;
  top: 22.01%;
  right: 55.08%;
  bottom: 67.15%;
  left: 35.1%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
`;
const Component1Child6 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 9.82%;
  top: -0.16%;
  right: 19.99%;
  bottom: 89.31%;
  left: 70.2%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
`;
const Component1Child7 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 9.82%;
  top: 22.01%;
  right: 19.99%;
  bottom: 67.15%;
  left: 70.2%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
`;
const Component1Child8 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 9.82%;
  top: 22.01%;
  right: 90.25%;
  bottom: 67.15%;
  left: -0.07%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
`;
const Component1Child9 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 9.82%;
  top: 89.31%;
  right: 19.99%;
  bottom: -0.16%;
  left: 70.2%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
`;
const Component1Child10 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 9.82%;
  top: 67.3%;
  right: 90.25%;
  bottom: 21.85%;
  left: -0.07%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
`;
const Component1Child11 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 9%;
  top: 99.84%;
  right: -3.75%;
  bottom: -10.69%;
  left: 94.75%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
  transform: rotate(179.89deg);
  transform-origin: 0 0;
`;
const Component1Child12 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 9%;
  top: 10.37%;
  right: -3.75%;
  bottom: 78.79%;
  left: 94.75%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
  transform: rotate(179.89deg);
  transform-origin: 0 0;
`;
const Component1Child13 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 9.82%;
  top: 67.3%;
  right: 19.99%;
  bottom: 21.85%;
  left: 70.2%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
`;
const Component1Child14 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 9.82%;
  top: 89.31%;
  right: 37.57%;
  bottom: -0.16%;
  left: 52.61%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
`;
const Component1Child15 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 9.82%;
  top: 67.3%;
  right: 37.57%;
  bottom: 21.85%;
  left: 52.61%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
`;
const Component1Child16 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 9.82%;
  top: 89.47%;
  right: 55.08%;
  bottom: -0.32%;
  left: 35.1%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
`;
const Component1Child17 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 9.82%;
  top: 67.3%;
  right: 55.08%;
  bottom: 21.85%;
  left: 35.1%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
`;
const Component1Child18 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 9.82%;
  top: 89.47%;
  right: 72.67%;
  bottom: -0.32%;
  left: 17.51%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
`;
const Component1Child19 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 9.82%;
  top: 67.3%;
  right: 72.67%;
  bottom: 21.85%;
  left: 17.51%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
`;
const Component1Child20 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 9.82%;
  top: 89.47%;
  right: 90.25%;
  bottom: -0.32%;
  left: -0.07%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
`;
const Component1Child21 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 6.63%;
  top: 32.58%;
  right: 8.8%;
  bottom: 56.57%;
  left: 84.57%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
  transform: rotate(90.22deg);
  transform-origin: 0 0;
`;
const Component1Child22 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 6.63%;
  top: 52.68%;
  right: -6.59%;
  bottom: 36.48%;
  left: 99.96%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
  transform: rotate(90.22deg);
  transform-origin: 0 0;
`;
const Component1Child23 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 6.63%;
  top: 52.68%;
  right: 8.81%;
  bottom: 36.48%;
  left: 84.56%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
  transform: rotate(90.22deg);
  transform-origin: 0 0;
`;
const Component1Child24 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 6.63%;
  top: 32.58%;
  right: -6.52%;
  bottom: 56.57%;
  left: 99.89%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
  transform: rotate(90.22deg);
  transform-origin: 0 0;
`;
const Component1Child25 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 6.63%;
  top: 12.65%;
  right: -6.59%;
  bottom: 76.51%;
  left: 99.96%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
  transform: rotate(90.22deg);
  transform-origin: 0 0;
`;
const Component1Child26 = styled.div`
  position: absolute;
  height: 10.85%;
  width: 6.63%;
  top: 72.62%;
  right: -6.59%;
  bottom: 16.54%;
  left: 99.96%;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
  transform: rotate(90.22deg);
  transform-origin: 0 0;
`;
const Component1 = styled.div`
  position: absolute;
  top: 283px;
  left: 156px;
  width: 1416px;
  height: 627px;
`;
const MacbookPro161Root = styled.div`
  position: relative;
  background-color: #fff;
  width: 100%;
  height: 1117px;
  overflow: hidden;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2; /* Ensure modal is above other content */
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border: 1px solid #000;
  width: 50%;
`;

const HostelView = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openRoom = () => {
    setModalOpen(true);
  };

  const closeRoom = () => {
    setModalOpen(false);
  };
  return (
    <>
      <MacbookPro161Root>
        <Component1>
          <Component1Child />
          <Component1Item />
          <Component1Inner />
          <RectangleDiv />
          <Component1Child1 onClick={openRoom}>Room1</Component1Child1>
          <Component1Child2 />
          <Component1Child3 />
          <Component1Child4 />
          <Component1Child5 />
          <Component1Child6 />
          <Component1Child7 />
          <Component1Child8 />
          <Component1Child9 />
          <Component1Child10 />
          <Component1Child11 />
          <Component1Child12 />
          <Component1Child13 />
          <Component1Child14 />
          <Component1Child15 />
          <Component1Child16 />
          <Component1Child17 />
          <Component1Child18 />
          <Component1Child19 />
          <Component1Child20 />
          <Component1Child21 />
          <Component1Child22 />
          <Component1Child23 />
          <Component1Child24 />
          <Component1Child25 />
          <Component1Child26 />
        </Component1>
      </MacbookPro161Root>
      {isModalOpen && (
        <ModalOverlay onClick={closeRoom}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <Room onClose={closeRoom} />
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default HostelView;
