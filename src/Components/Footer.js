import { Row, Col, Layout } from "antd";
import duLogo from "../Data/Logos/DD logo.jpg";

const { Footer: footer, Header } = Layout;

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        textAlign: "center",
        backgroundColor: "#fafafa",
        border: "2px solid #e6e6e6 ",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <img
          style={{ width: "120px", height: "30px" }}
          src={duLogo}
          alt="dulogo"
        />
        <p style={{ fontSize: "15px", marginTop: "15px" }}>© {year}</p>
      </div>
    </footer>
  );
};

export default Footer;
