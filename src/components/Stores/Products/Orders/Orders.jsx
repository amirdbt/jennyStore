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
  TextField,
  MenuItem,
  Typography,
  Button,
} from "@material-ui/core";
import {
  AccountCircle,
  ArrowForward,
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
  Image,
  Edit,
  AddCircle,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
// import SearchBox from "../../Utility/SearchBox";
import EditOrder from "./EditOrder";

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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [searchField, setSearchField] = useState("");

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
        setOrders(res.data.bookings);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const filteredOrders = orders.filter((order) => {
    return order.lastName.toLowerCase().includes(searchField.toLowerCase());
  });
  return (
    <div className="content">
      {loading ? (
        <CircularProgress style={{ marginLeft: "50%" }} />
      ) : (
        <>
          <div style={{ marginBottom: "10px" }}></div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h4">All Orders</Typography>
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
                      ).map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>{order.firstName}</TableCell>
                          <TableCell>{order.userName}</TableCell>
                          <TableCell>{order.category}</TableCell>
                          <TableCell>{order.message}</TableCell>
                          <TableCell>
                            {" "}
                            {moment(order.createdA).format("DD MMM, YYYY")}
                          </TableCell>
                          <TableCell>
                            {" "}
                            <EditOrder />
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
