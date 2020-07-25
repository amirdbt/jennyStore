import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
  makeStyles,
  CircularProgress,
  IconButton,
  useTheme,
  Grid,
  Card,
  Chip,
  Typography,
  Snackbar,
  Slide,
  Button,
} from "@material-ui/core";
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@material-ui/icons";
import moment from "moment";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";
import SearchBox from "../../../Utility/SearchBox";

const useStyles = makeStyles((theme) => ({
  head: {
    // backgroundColor: "#0d47a1",
    fontSize: 20,
  },
  text: {
    // padding: theme.spacing(4),
    fontSize: 18,
    fontWeight: 300,
    // color: "#fff",
  },
}));
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.0),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
      </IconButton>
    </div>
  );
}

const Orders = () => {
  const [orders, setOrders] = useState([]);
  // const [totalPatients, setTotalPatients] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [al, setAl] = useState(false);
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const [searchField, setSearchField] = useState("");

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const searchChange = (e) => {
    setSearchField(e.target.value);
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    axios
      .get(`https://jenifa-stores.herokuapp.com/bookings`, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        console.log(res);
        setOrders(res.data.userBookings);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const filteredOrders = orders.filter((order) => {
    return order.customer_user_name
      .toLowerCase()
      .includes(searchField.toLowerCase());
  });

  const checkStatus = (status) => {
    if (status === "pending") {
      return (
        <Chip variant="default" label="PENDING" style={{ color: "#ff9800" }} />
      );
    } else if (status === "confirmed") {
      return (
        <Chip
          variant="default"
          label="CONFIRMED"
          style={{ color: "#4caf50" }}
        />
      );
    } else {
      return (
        <Chip variant="default" label="REJECTED" style={{ color: "#e53935" }} />
      );
    }
  };

  const confirm = (booking_id) => {
    axios
      .put(
        `https://jenifa-stores.herokuapp.com/bookings/confirm/${booking_id}`,
        "",
        {
          headers: { Authorization: `${token}` },
        }
      )
      .then((res) => {
        console.log(res);
        setMessage("Booking confirmed successfully");
        setAl(true);
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Booking could not be confirmed, try again");
        setErr(true);
        setAl(true);
        setSeverity("error");
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      });
  };
  const reject = (booking_id) => {
    axios
      .patch(
        `https://jenifa-stores.herokuapp.com/bookings/reject/${booking_id}`,
        "",
        {
          headers: { Authorization: `${token}` },
        }
      )
      .then((res) => {
        console.log(res);
        setMessage("Booking rejected successfully");
        setAl(true);
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Booking could not be rejected, try again");
        setErr(true);
        setAl(true);
        setSeverity("error");
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      });
  };

  return (
    <div className="content">
      {loading ? (
        <CircularProgress style={{ marginLeft: "50%" }} />
      ) : (
        <>
          {al ? (
            <>
              <Alert severity={severity}>
                <AlertTitle>{severity}</AlertTitle>
                {message}
              </Alert>
              <Snackbar
                open={open}
                // autoHideDuration={3000}
                TransitionComponent={Slide}
                onClose={handleClose}
              >
                <Alert severity={severity}>{message}</Alert>
              </Snackbar>
            </>
          ) : (
            <div></div>
          )}
          <div style={{ marginBottom: "10px" }}></div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4">All Orders</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <SearchBox
                place="Search Bookings by Customer Name..."
                searchChange={searchChange}
              />
            </Grid>
          </Grid>
          <div style={{ marginBottom: "20px" }}></div>
          <Container component={Card} maxWidth="lg">
            <Grid container>
              <Grid item xs={12} sm={12}>
                <TableContainer component={Paper} elevation={0}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.head}>Ref</TableCell>
                        <TableCell className={classes.head}>Customer</TableCell>
                        <TableCell className={classes.head}>Category</TableCell>
                        <TableCell className={classes.head}>Status</TableCell>
                        <TableCell className={classes.head}>Message</TableCell>
                        <TableCell className={classes.head}>
                          Product Name
                        </TableCell>
                        <TableCell className={classes.head}>
                          Order Date
                        </TableCell>
                        <TableCell className={classes.head}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? filteredOrders.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : filteredOrders
                      ).map((order, index) => (
                        <TableRow key={index}>
                          <TableCell>{index}</TableCell>
                          <TableCell>{order.customer_user_name}</TableCell>
                          <TableCell>{order.product_category}</TableCell>

                          <TableCell>
                            {checkStatus(order.booking_status)}
                          </TableCell>
                          <TableCell>{order.booking_message}</TableCell>
                          <TableCell>{order.product_name}</TableCell>
                          <TableCell>
                            {" "}
                            {moment(order.createdA).format("DD MMM, YYYY")}
                          </TableCell>
                          <TableCell style={{ display: "flex" }}>
                            <Button
                              variant="outlined"
                              size="small"
                              style={{ color: "#4caf50", marginRight: 5 }}
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to confirm this order?"
                                  )
                                )
                                  confirm(order.booking_id);
                              }}
                            >
                              Confirm
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              color="secondary"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to reject this order?"
                                  )
                                )
                                  reject(order.booking_id);
                              }}
                            >
                              Reject
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}

                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[
                            5,
                            10,
                            25,
                            { label: "All", value: -1 },
                          ]}
                          colSpan={3}
                          count={filteredOrders.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: { "aria-label": "rows per page" },
                            native: true,
                          }}
                          onChangePage={handleChangePage}
                          onChangeRowsPerPage={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </div>
  );
};

export default Orders;
