import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Spin, Result, Button, Modal } from "antd";
import { useFetchStudentProfilesQuery } from "../Slices/studentApiSlice";
import "../Components/Approval/ApprovalTable.css";
import SearchComponent from "../Components/SearchComponent/SearchComponent";
import StudentTable from "../Components/StudentTable/StudentTable";
import BlockBasedFilter from "../Components/BlockBasedFilter";
import AtypeFilter from "../Components/AtypeFilter";
import { useSuspensionListQuery } from "./../Slices/dashboardApiSlice";
import BatchWiseFilter from "../Components/BacthWiseFilter";
import { GetScreenSizes } from "../Components/ScreenSizes";
import Footer from "../Components/Footer";

const AdminPage = (props) => {
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: susList,
    isLoading: isSusDataLoading,
    isError: isSusDataError,
  } = useSuspensionListQuery();
  const [openFilterationModal, setOpenFilterationModal] = useState(false);
  const [blocksForFilteration, setBlocksForFilteration] = useState([]);
  const [aTypesForFilteration, setATyesForFilteration] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const isWarden = props.isWarden;
  const [spinning, setSpinning] = useState(true);
  const globalColor = "#e31138";
  const activeKey = useSelector((state) => state.key.activeKey);
  const [suspendedArray, setSuspendedArray] = useState([]);
  const [checkForSuspension, setCheckForSuspension] = useState(false);
  const { isSmallScreen, isMediumScreen, isLargeScreen } = GetScreenSizes();
  const [seletedBatches, setSeletedBatches] = useState([]);
  const filters = {
    A_TYPE: aTypesForFilteration,
    BATCH: seletedBatches || [],
    BLOCK: blocksForFilteration || [],
    SUSPEND: checkForSuspension ? "Yes" : "No",
  };
  const { data, isLoading, isError, refetch } = useFetchStudentProfilesQuery({
    keyword,
    currentPage,
    aTypesForFilteration,
    seletedBatches,
    blocksForFilteration,
    suspend: checkForSuspension ? "Yes" : "No",
  });

  const handleRefetch = (searchTerm) => {
    setKeyword(searchTerm);
    refetch();
  };

  const onUpdate = () => {
    !isError && refetch();
  };

  useEffect(() => {
    setFilteredData(data?.usersWithHostelData || []);
  }, [data]);

  useEffect(() => {
    const suspendedUsersArray = susList?.map((item) => item.HTNO);
    setSuspendedArray(suspendedUsersArray);
  }, [susList]);

  const blockSetterFunction = (selectedBlocks) => {
    setBlocksForFilteration(selectedBlocks);
  };

  const aTypeSetterFunction = (aType) => {
    setATyesForFilteration(aType);
  };

  const batchesSetterFunction = (batches) => {
    setSeletedBatches(batches);
  };

  const onCheckCheckbox = () => {
    setCheckForSuspension((prevState) => !prevState);
  };

  const onClickApplyFilters = () => {
    setOpenFilterationModal(true);
  };

  const closeModal = () => {
    setOpenFilterationModal(false);
  };

  const onFilteration = () => {
    // let res = data?.usersWithHostelData;

    // // Blockwise filteration
    // if (blocksForFilteration?.length !== 0) {
    //   res = res.filter((item) => blocksForFilteration.includes(item.BLOCK));
    // }

    // // A_type filteration
    // if (aTypesForFilteration?.length !== 0) {
    //   res = res.filter((item) => aTypesForFilteration.includes(item.A_TYPE));
    // }

    // //BACTH filteration
    // if (seletedBatches?.length !== 0) {
    //   res = res.filter((item) => seletedBatches.includes(item.BATCH));
    // }

    // //  suspension filteration
    // if (checkForSuspension) {
    //   res = res.filter((item) => suspendedArray.includes(item.HTNO));
    // }

    // // Update filteredData state
    // setFilteredData(res);

    refetch();
    setOpenFilterationModal(false);
  };

  const onClickClearFilters = () => {
    setBlocksForFilteration(null);
    setATyesForFilteration(null);
    setSeletedBatches(null);
    setCheckForSuspension(false);
    setFilteredData(data);
  };

  const onPageChange = (pageNo) => {
    if (currentPage !== pageNo) {
      setCurrentPage(pageNo);
      refetch();
    }
  };

  return (
    <>
      {isLoading && (
        <div
          style={{
            height: "80vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin spinning={spinning} size="large" colorPrimary={globalColor} />
        </div>
      )}
      {isError && (
        <div
          style={{
            height: "80vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
          />
        </div>
      )}
      {data && (
        <div className="approval-table-container">
          <Modal
            title="Filters"
            open={openFilterationModal}
            contentLabel="Edit Modal"
            footer={null}
            closable={false}
            onCancel={closeModal}
            centered
          >
            <div
              style={{
                width: "400px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Block Based Filter</p>
                <BlockBasedFilter onFilter={blockSetterFunction} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Accomidation Based Filter</p>
                <AtypeFilter onFilter={aTypeSetterFunction} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Check for suspended students</p>
                <input
                  type="checkbox"
                  onChange={onCheckCheckbox}
                  checked={checkForSuspension}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Batch Based Filter</p>
                <BatchWiseFilter onFilter={batchesSetterFunction} />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                {/* <Button
                  style={{ color: "red", border: "2px solid red" }}
                  onClick={onClickClearFilters}
                >
                  Clear Filters
                </Button> */}
                <Button
                  style={{ color: "green", border: "2px solid green" }}
                  onClick={onFilteration}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </Modal>
          <Row
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <Col xs={24} md={7} lg={8}>
              <h2
                style={{
                  textAlign: isSmallScreen ? "center" : "left",
                  fontFamily: "Montserrat",
                }}
              >
                Student Info
              </h2>
            </Col>

            <Col xs={24} md={10} lg={8}>
              <div
                style={{
                  display: "flex",
                  justifyContent: isWarden ? "space-between" : "flex-end",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                {isWarden && !isLoading && !isError && (
                  <Button onClick={onClickApplyFilters}> Filters</Button>
                )}
                <SearchComponent
                  onSearch={handleRefetch}
                  activeTab={activeKey}
                />
              </div>
            </Col>
          </Row>

          <StudentTable
            onPageChange={onPageChange}
            data={isWarden ? filteredData : data.usersWithHostelData}
            totalPages={data.totalPages}
            isWarden={isWarden}
            onUpdate={onUpdate}
            keyword={keyword}
          />
          <Footer />
        </div>
      )}
    </>
  );
};

export default AdminPage;
