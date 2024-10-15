import styled from "styled-components";
import Rectangle8 from "./Rectangle 8.png";
import Rectangle6 from "./Rectangle 6.png";
import Reactangle7 from "./Rectangle 7.png";
const Component1Child = styled.div`
  position: absolute;
  height: 99.91%;
  width: 100%;
  top: 0%;
  right: 0%;
  bottom: 0.09%;
  left: 0%;
  background-color: var(--color-gainsboro);
`;
const T = styled.div`
  position: absolute;
  top: 32.53%;
  left: 50%;
`;
const Applied = styled.div`
  position: absolute;
  top: 11.15%;
  left: 50%;
`;
const Reason = styled.div`
  position: absolute;
  top: 53.44%;
  left: 5.2%;
`;
const Rean = styled.div`
  position: absolute;
  top: 53.44%;
  left: 50%;
`;
const Component1Item = styled.img`
  position: absolute;
  height: 7.99%;
  width: isSmallScreen ? 20% : 36%;
  top: 81.78%;
  right: 64%;
  bottom: 10.22%;
  left: 0%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
`;

const Component1Inner = styled.img`
  position: absolute;
  height: 7.99%;
  width: 73.6%;
  top: 92.01%;
  right: 26.4%;
  bottom: 0%;
  left: 0%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
`;
const RectangleIcon = styled.img`
  position: absolute;
  height: 7.99%;
  width: 19.4%;
  top: 92.01%;
  right: 0%;
  bottom: 0%;
  left: 80.6%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
`;
const AppliedAt = styled.div`
  position: absolute;
  top: 11.15%;
  left: 5.2%;
`;
const From = styled.div`
  position: absolute;
  top: 21.84%;
  left: 5.2%;
`;
const Fro = styled.div`
  position: absolute;
  top: 20.45%;
  left: 50%;
`;
const To = styled.div`
  position: absolute;
  top: 32.53%;
  left: 5.2%;
`;
const TokenId = styled.div`
  position: absolute;
  top: 42.75%;
  left: 5.2%;
`;
const TokId = styled.div`
  position: absolute;
  top: 42.75%;
  left: 50%;
`;
const HostelBlock = styled.div`
  position: absolute;
  top: 64.13%;
  left: 5.2%;
`;
const HostelBloc = styled.div`
  position: absolute;
  top: 64.13%;
  left: 50%;
`;
const Component1 = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 215.2px;
`;
const A41Root = styled.div`
  position: relative;
  background-color: #f3f3f3;
  width:isSmallScreen? 400px : 500px;
  height: 215px;
  overflow: hidden;
  text-align: left;
  font-size: var(--font-size-xs);
  color: var(--color-black);
  font-family: var(--font-inter);
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
const IdBack = (props) => {
  const { data } = props;
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
  function formatDate(dateTimeString) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    const formattedDate = new Date(dateTimeString).toLocaleString(
      undefined,
      options
    );
    return formattedDate;
  }
  return (
    <A41Root>
      <Component1>
        <Component1Child />
        <T>{formatDate(data?.TO)}</T>
        <Applied>{formatDateTime(data?.ASN_DATE)}</Applied>
        <Reason>Reason</Reason>
        <Rean>{data?.REASON.slice(0, 25) + "..."}</Rean>
        <Component1Item alt="" src={Rectangle8} />
        <Component1Inner alt="" src={Rectangle6} />
        <RectangleIcon alt="" src={Reactangle7} />
        <AppliedAt>Applied At</AppliedAt>
        <From>From</From>
        <Fro>{formatDate(data?.FROM)}</Fro>
        <To>To</To>
        <TokenId>Token ID</TokenId>
        <TokId>{data?.TOKEN}</TokId>
        <HostelBlock>{`Hostel Block & Room`}</HostelBlock>
        <HostelBloc>
          {data?.BLOCK}&{data?.ROOM}
        </HostelBloc>
      </Component1>
    </A41Root>
  );
};

export default IdBack;
