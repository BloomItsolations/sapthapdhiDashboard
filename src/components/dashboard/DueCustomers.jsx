import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Dialog, Button, Typography } from "@mui/material";
import DetailsModel from "./DetailsModel";
import { getColorForDueAmount } from "../../utils/helper";
import { RemoveRedEyeRounded } from "@mui/icons-material";
const DueCustomers = ({ rowData }) => {
  const [open, setOpen] = useState(false);
  const [selectedId, setselectedId] = useState("");
  const handleClickOpen = (id) => {
    setOpen(true);
    setselectedId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  const columns = [
    {
      field: "view",
      headerName: "View",
      width: 100,
      editable: false,
      renderCell: (params) => {
        return (
          <Button
            size="small"
            color="secondary"
            onClick={() => handleClickOpen(params.row.id)}
          >
            <RemoveRedEyeRounded />
          </Button>
        );
      },
    },
    {
      field: "s.no",
      width: 100,
      headerName: "S.No.",
      filterable: false,
      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
    },
    {
      field: "name",
      headerName: "Customer Name",
      width: 200,
      editable: false,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
      editable: false,
    },
    {
      field: "totalDueAmount",
      headerName: "Total Due Amount",
      width: 200,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <Typography>
              {params.row?.totalDueAmount !== null
                ? parseFloat(params.row?.totalDueAmount).toFixed(3)
                : "0"}
            </Typography>
          </>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <Typography>
              {new Date(params.row?.createdAt).toLocaleDateString()}
            </Typography>
          </>
        );
      },
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 120,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            {params.row.isActive ? (
              <Box sx={{ color: "green" }}>
                <Typography>Active</Typography>
              </Box>
            ) : (
              <Box sx={{ color: "red" }}>
                <Typography>Inactive</Typography>
              </Box>
            )}
          </>
        );
      },
    },
    {
      field: "DueStatus",
      headerName: "Due Status",
      width: 120,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <Typography
              sx={{
                backgroundColor: getColorForDueAmount(params.row),
                boxShadow: 1,
                paddingX: 4,
                paddingY: 1,
                borderRadius: 1,
                color:"#ffffff"
              }}
            >
              {getColorForDueAmount(params.row) === "#FF0000"
                ? "Alert"
                : getColorForDueAmount(params.row) === "#FFFF00"
                ? "Warning"
                : "Ok"}
            </Typography>
          </>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#F4F6F8",
        boxShadow: 1,
        padding: 2,
        borderRadius: 1,
      }}
    >
      <Typography variant="h5" gutterBottom textTransform={"uppercase"}>
        Due Customer
      </Typography>
      {rowData === null ? null : (
        <Box sx={{ height: "40vh", width: "100%" }}>
          <DataGrid
            getRowId={(row) => row.id}
            rows={rowData}
            density="standard"
            columns={columns}
            initialState={{
              ...rowData.initialState,
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 20, 30, 40, 50, 75, 100]}
            slots={{
              toolbar: GridToolbar,
            }}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: false }}
          />
        </Box>
      )}
      <Dialog maxWidth={"lg"} fullWidth open={open} onClose={handleClose}>
        <DetailsModel
          onClose={handleClose}
          selectedId={selectedId}
          allCustomerList={rowData}
        />
      </Dialog>
    </Box>
  );
};

export default DueCustomers;
