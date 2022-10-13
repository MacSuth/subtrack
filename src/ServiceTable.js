import { useState } from "react"
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Button } from "@mui/material";


export default function ServiceTable() {
  const defaultDate = new Date().toLocaleDateString();

  const rows = [
    { id: 1, service: 'Netflix', monthlyCost: 15, startDate: defaultDate },
    { id: 2, service: 'Amazon Prime', monthlyCost: 20, startDate: defaultDate },
    { id: 3, service: 'Hulu', monthlyCost: 10, startDate: defaultDate },
  ];

  const [data, setData] = useState(rows);

  const columns = [
    { 
      field: 'id',
      headerName: 'ID',
      flex: 1,
      maxWidth: 100,
      headerAlign: 'center',
      textAlign: 'center',
    },
    {
      field: 'service',
      headerName: 'Service',
      flex: 1,
      headerAlign: 'center',
      editable: true,
    },
    {
      field: 'monthlyCost',
      headerName: 'Monthly Cost ($)',
      flex: 1,
      headerAlign: 'center',
      type: 'number',
      editable: true,
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      flex: 1,
      headerAlign: 'center',
      type: 'date',
      editable: true,
    },
    {
      field: 'totalCost',
      headerName: 'Total Cost',
      description: 'This column totals your expenditures for the given service.',
      sortable: false,
      headerAlign: 'center',
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

  function addService() {

  }

  function removeService() {

  }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
      <div style={{textAlign: 'right', marginTop: '5px', width: '100%'}}>
        <Button onClick={() => addService()} variant="contained" color="success" sx={{ marginRight: '5px', fontWeight: 'bold'}}>Add Service</Button>
        <Button onClick={() => removeService()} variant="outlined" color="error" sx={{ marginLeft: '5px'}}>Remove Service</Button>
      </div>
    </Box>
  )
}
