import { useState } from "react";
import { DataGrid, gridColumnGroupsLookupSelector } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Button, Modal, TextField } from "@mui/material";

export default function ServiceTable(props) {
  // const rows = [
  //   { service: "Netflix", monthlyCost: 15, startDate: defaultDate },
  //   { service: "Amazon Prime", monthlyCost: 20, startDate: defaultDate },
  //   { service: "Hulu", monthlyCost: 10, startDate: defaultDate },
  // ];

  const [rowData, setRowData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceCost, setNewServiceCost] = useState(0);

  if (localStorage.getItem("rows")) {
    setRowData(localStorage.getItem("rows"));
  }

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90
    },
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
      editable: false,
    },
    {
      field: "totalCost",
      headerName: "Total Cost",
      description:
        "This column totals your expenditures for the given service.",
      sortable: false,
      headerAlign: "center",
      valueGetter: (params) => {
        let diffInTime = Date.now() - new Date(params.row.startDate).getTime()
        let monthsSubbed = Math.round(diffInTime / (1000 * 3600 * 24) / 30)
        return params.row.monthlyCost * monthsSubbed
      }
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

  function removeService() { }

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rowData}
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
              onChange={(event) => setNewServiceName({ "name": event.target.value })}
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
              onChange={(event) => setNewServiceCost({ "cost": event.target.value })}
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
                let newID = Math.max(rowData.map(x => x.id)) + 1
                let newRow = [...rowData, { "id": newID, "service": newServiceName.name, "monthlyCost": newServiceCost.cost, "startDate": new Date().toLocaleDateString() }]
                setRowData(newRow)
                handleClose()
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
