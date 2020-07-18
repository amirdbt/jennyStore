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
} from "@material-ui/core";
import {
  AccountCircle,
  ArrowForward,
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBox from "../Utility/SearchBox";

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

const Categories = () => {
  const [patients, setPatients] = useState([]);
  const [totalPatients, setTotalPatients] = useState("");
  const [loading, setLoading] = useState(false);
  //   const token = localStorage.getItem("token");
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [searchField, setSearchField] = useState("");

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, patients.length - page * rowsPerPage);

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
  //   useEffect(() => {
  //     fetchPatients();
  //   }, []);

  //   const fetchPatients = async () => {
  //     setLoading(true);
  //     const response = await axios.get(``, {
  //       headers: { Authorization: `${token}` },
  //     });
  //     setPatients(response.data.patients);
  //     setTotalPatients(response.data.totalPatients);
  //     setLoading(false);
  //     console.log(response.data);
  //   };
  const filteredPatients = patients.filter((patient) => {
    return patient.lastName.toLowerCase().includes(searchField.toLowerCase());
  });
  return (
    <div className="content">
      {loading ? (
        <CircularProgress style={{ marginLeft: "50%" }} />
      ) : (
        <>
          <div style={{ marginBottom: "10px" }}></div>
          <Container component={Card} maxWidth="lg">
            <Grid container>
              <Grid item xs={12} sm={12}>
                <TableContainer component={Paper} elevation={0}>
                  <SearchBox
                    searchChange={searchChange}
                    place="Search customer..."
                  />

                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.head}>Name</TableCell>
                        <TableCell className={classes.head}>Location</TableCell>
                        <TableCell className={classes.head}>Email</TableCell>
                        <TableCell className={classes.head}>Orders</TableCell>
                        <TableCell className={classes.head}>Spent</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.text}>
                          Ahmed Dambatta
                        </TableCell>
                        <TableCell className={classes.text}>Abuja</TableCell>
                        <TableCell className={classes.text}>
                          amyboy32@yahoo.com
                        </TableCell>
                        <TableCell className={classes.text}>2</TableCell>
                        <TableCell className={classes.text}>#5000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>Tony Nta</TableCell>
                        <TableCell className={classes.text}>Abuja</TableCell>
                        <TableCell className={classes.text}>
                          tonynta@yahoo.com
                        </TableCell>
                        <TableCell className={classes.text}>1</TableCell>
                        <TableCell className={classes.text}>#300</TableCell>
                      </TableRow>
                      {/* {(rowsPerPage > 0
                      ? filteredPatients.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : filteredPatients
                    ).map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell>{patient.firstName}</TableCell>
                        <TableCell>{patient.lastName}</TableCell>
                        <TableCell>{patient.email}</TableCell>
                        <TableCell>{patient.gender}</TableCell>
                        <TableCell>{patient.userName}</TableCell>
                        <TableCell>{patient.phoneNumber}</TableCell>
                        <TableCell>
                          <Link to={`/all-patients/${patient.userName}`}>
                            <IconButton>
                              <ArrowForward />
                            </IconButton>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))} */}

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
                          count={filteredPatients.length}
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

export default Categories;
