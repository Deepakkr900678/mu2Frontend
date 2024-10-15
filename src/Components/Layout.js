import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, tab }) => {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Header tab={tab} />
      <div className="container mx-auto py-10 flex-grow-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
