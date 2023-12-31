import React, { useState, useEffect } from "react";
import { DateRangePicker } from "rsuite";
import {
  DataGrid,
  GridToolbarContainer,
  GridCsvExportMenuItem,
  GridToolbarExportContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { API } from "../constants/time";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import "./DataTable.css";
import Logo from "../assets/Logo.png";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const fetchData = async () => {
    try {
      const request = new Request(`${API}/contact`);

      const response = await fetch(request);
      const data = await response.json();
      // console.log(data);
      setData(data);
      setFilteredData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const csvOptions = { fileName: "contacts" };
  function CustomExportButton(props) {
    return (
      <GridToolbarExportContainer {...props}>
        <GridCsvExportMenuItem options={csvOptions} />
      </GridToolbarExportContainer>
    );
  }

  function CustomToolbar(props) {
    // const handleDateRangePickerChange = (event) => {
    //   setSelectedDateRange(event.target.value);
    // };
    return (
      <GridToolbarContainer {...props}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <CustomExportButton />
        <div>
          <DateRangePicker
            placeholder="Select Date Range"
            onChange={handleDateRangePickerChange}
          />
        </div>
      </GridToolbarContainer>
    );
  }

  const handleDateRangePickerChange = (event) => {
    // console.log(event," : 1");
    setStartDate(event[0]);
    setEndDate(event[1]);
  };

  const filterData = data.filter((row) => {
    // console.log(row.Id);
    // console.log(startDate," : SD");
    // console.log(endDate," : ED");
    const timestamp = new Date(row.TimeStamp);
    // console.log(timestamp," : 1");
    return timestamp >= startDate && timestamp <= endDate;
  });

  useEffect(() => {
    // console.log(filteredData," : FD");
    // eslint-disable-next-line
    setFilteredData(filterData);
    // eslint-disable-next-line
  }, [startDate, endDate]);
  // const filteredData = data.filter((row) => {
  //   const timestamp = new Date(row.Timestamp);
  //   return timestamp >= selectedDateRange[0] && timestamp <= selectedDateRange[1];
  // });

  function logout() {
    // Clear the user's authentication token
    // setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", false);

    // Redirect the user to the login page
    window.location.href = "/";
  }

  const columns = [
    { field: "Id", headerName: "ID", width: 70 },
    { field: "Name", headerName: "Name", width: 130 },
    { field: "Email", headerName: "Email", width: 130 },
    { field: "PhoneNumber", headerName: "Phone Number", width: 150 },
    {
      field: "PreferredMethodOfContact",
      headerName: "Preferred Method Of Contact",
      width: 200,
    },
    {
      field: "InterestedServices",
      headerName: "Interested Services",
      width: 200,
    },
    {
      field: "InvestmentExperience",
      headerName: "Investment Experience",
      width: 200,
    },
    { field: "City", headerName: "City", width: 100 },
    { field: "Subject", headerName: "Subject", width: 200 },
    { field: "Message", headerName: "Message", width: 500 },
    { field: "TimeStamp", headerName: "TimeStamp", width: 200 },
    {
      field: "Delete",
      headerName: "Delete",
      width: 70,
      renderCell: (params) => {
        return (
          <button
            className="css-1rtnrqa MuiButtonBase-root logout-button"
            onClick={() => deleteRow(params.row.Id)}
          >
            Delete
          </button>
        );
      },
    },
  ];

  const deleteRow = async (id) => {
    // Make an API call to delete the row from the database
    const response = await fetch(`${API}/deleteContact/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("The row was deleted successfully");
      fetchData();
      // Update the DataTable to reflect the change
    } else {
      alert("An error occurred. Please try again later.");
      // An error occurred while deleting the row
      // Handle the error
    }
  };

  if (isLoading) {
    return (
      <div className="scene">
        <div className="shadow"></div>
        <div className="jumper">
          <div className="spinner">
            <div className="scaler">
              <div className="loader">
                <div className="cuboid">
                  <div className="cuboid__side"></div>
                  <div className="cuboid__side"></div>
                  <div className="cuboid__side"></div>
                  <div className="cuboid__side"></div>
                  <div className="cuboid__side"></div>
                  <div className="cuboid__side"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const StyledGridOverlay = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    "& .ant-empty-img-1": {
      fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
    },
    "& .ant-empty-img-2": {
      fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
    },
    "& .ant-empty-img-3": {
      fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
    },
    "& .ant-empty-img-4": {
      fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
    },
    "& .ant-empty-img-5": {
      fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
      fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
    },
  }));

  function CustomNoRowsOverlay() {
    return (
      <StyledGridOverlay>
        <svg
          width="120"
          height="100"
          viewBox="0 0 184 152"
          aria-hidden
          focusable="false"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(24 31.67)">
              <ellipse
                className="ant-empty-img-5"
                cx="67.797"
                cy="106.89"
                rx="67.797"
                ry="12.668"
              />
              <path
                className="ant-empty-img-1"
                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
              />
              <path
                className="ant-empty-img-2"
                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
              />
              <path
                className="ant-empty-img-3"
                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
              />
            </g>
            <path
              className="ant-empty-img-3"
              d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
            />
            <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
              <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
              <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
            </g>
          </g>
        </svg>
        <Box sx={{ mt: 1 }}>No Rows</Box>
      </StyledGridOverlay>
    );
  }
  const getRowId = (row) => {
    // Return a unique identifier for the row
    return row.Id;
  };

  return (
    <div>
      <header>
        <img src={Logo} alt="Logo" />
        <div className="logout-button-container">
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </div>
        <br></br>
        <br></br>
        <style>@import "./DataTable.css";</style>
      </header>
      <DataGrid
        getRowId={getRowId}
        rows={filteredData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        checkboxSelection
        width="100%"
        autoHeight
        slots={{ toolbar: CustomToolbar, noRowsOverlay: CustomNoRowsOverlay }}
      />
    </div>
  );
};

export default DataTable;
