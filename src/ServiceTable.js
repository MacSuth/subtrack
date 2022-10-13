import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Button, Modal, TextField } from "@mui/material";

export default function ServiceTable(props) {
  const defaultDate = new Date().toLocaleDateString();

  // const rows = [
  //   { id: 1, service: "Netflix", monthlyCost: 15, startDate: defaultDate },
  //   { id: 2, service: "Amazon Prime", monthlyCost: 20, startDate: defaultDate },
  //   { id: 3, service: "Hulu", monthlyCost: 10, startDate: defaultDate },
  // ];

  if (localStorage.getItem("rows")) {
    setData(localStorage.getItem("rows"));
  }

  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const columns = [
    {
      field: "service",
      headerName: "Service",
      flex: 1,
      headerAlign: "center",
      editable: true,
    },
    {
      field: "monthlyCost",
      headerName: "Monthly Cost ($)",
      flex: 1,
      headerAlign: "center",
      type: "number",
      editable: true,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
      headerAlign: "center",
      type: "date",
      editable: true,
    },
    {
      field: "totalCost",
      headerName: "Total Cost",
      description:
        "This column totals your expenditures for the given service.",
      sortable: false,
      headerAlign: "center",
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // function addService() {
  //   localStorage.clear();
  //   localStorage.setItem("rows", JSON.stringify(rows));
  //   let test = localStorage.getItem("rows");
  //   console.log(JSON.parse(test));
  // }

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  function removeService() {}

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
      <div style={{ textAlign: "right", marginTop: "5px", width: "100%" }}>
        <Button
          onClick={() => handleOpen()}
          variant="contained"
          color="success"
          sx={{ marginRight: "5px", fontWeight: "bold" }}
        >
          Add Service
        </Button>
        <Button
          onClick={() => removeService()}
          variant="outlined"
          color="error"
          sx={{ marginLeft: "5px" }}
        >
          Remove Service
        </Button>
      </div>
      <Modal open={openModal} onClose={handleClose}>
        <Box sx={style}>
          <h1 className="header">New Subscription</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              id="serviceName"
              label="Service Name"
              variant="standard"
              required
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              id="serviceCost"
              label="Service Cost"
              variant="standard"
              required
            />
          </div>
          <div
            style={{
              marginTop: "25px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => {
                console.log("Test");
              }}
              variant="contained"
              color="success"
              sx={{ marginRight: "5px", fontWeight: "bold" }}
            >
              Add Service
            </Button>
            <Button
              onClick={() => handleClose()}
              variant="outlined"
              color="error"
              sx={{ marginLeft: "5px" }}
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </Box>
  );
}
