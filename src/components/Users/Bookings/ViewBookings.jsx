import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
  DialogContentText,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
} from "@material-ui/core";
import moment from "moment";

import { Visibility } from "@material-ui/icons";

const ViewBookings = ({ order }) => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="View more info about booking" arrow>
        <IconButton color="primary" onClick={handleClickOpen}>
          <Visibility />
        </IconButton>
      </Tooltip>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        fullWidth
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"More Info regarding Booking"}
        </DialogTitle>

        <DialogContent>
          <TableContainer component={Paper} elevation={0}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>Store Location</TableCell>
                  <TableCell>Address </TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Order Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableCell>{order.product_location}</TableCell>
                <TableCell>{order.product_address}</TableCell>

                <TableCell>{order.booking_message}</TableCell>
                <TableCell>
                  {" "}
                  {moment(order.createdA).format("DD MMM, YYYY")}
                </TableCell>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewBookings;
