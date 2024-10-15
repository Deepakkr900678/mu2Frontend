import { useEffect, useState } from "react";
import { Modal, Input, Button } from "antd";
import { useSuspensionListQuery } from "../../Slices/dashboardApiSlice";
const SuspendListDisplayComponent = ({ onModalClose }) => {
  const {
    data: suspensionList,
    isLoading: suspensionListLoading,
    isError: suspensionListError,
    refetch,
  } = useSuspensionListQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const { Search } = Input;
  const handleSearch = (value) => {
    setIsSearchClicked(true);
    setSearchTerm(value);

    const filteredList = suspensionList?.filter((student) =>
      student.HTNO.includes(value)
    );
    setFilteredSuspensionList(filteredList);
  };
  const [filteredSuspensionList, setFilteredSuspensionList] = useState(
    suspensionList && suspensionList
  );
  useEffect(() => {
    setSearchTerm("");
  }, [onModalClose]);

  const onClickRefresh = () => {
    refetch();
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Search
          placeholder="Search by HTNO"
          onSearch={handleSearch}
          enterButton
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: "10px", width: "60%", alignSelf: "flex-end" }}
        />
        <Button onClick={onClickRefresh}>Refresh</Button>
      </div>
      <ul>
        {(searchTerm && filteredSuspensionList
          ? filteredSuspensionList
          : suspensionList
        )?.map((student) => (
          <li
            // key={student?.HTNO}
            style={{
              listStyle: "none",
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: "#f5f5f5",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <strong>HTNO:</strong> {student?.HTNO},
            <br />
            <strong>Student Name:</strong>{" "}
            {student.STUDENT_NAME && student.STUDENT_NAME},
            <br />
            <strong>Suspended Till:</strong>{" "}
            {student.SUSPENDED_TILL && student.SUSPENDED_TILL}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuspendListDisplayComponent;
