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
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
  Image,
  Delete,
  AddCircle,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBox from "../../Utility/SearchBox";
import EditProduct from "./EditProduct";
import { Alert } from "@material-ui/lab";
import Categories from "../Categories";

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
  display: {
    display: "flex",
    justifyContent: "space-between",
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

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [error, setError] = useState(false);
  const token = localStorage.getItem("token");
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [searchField, setSearchField] = useState("");

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

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
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    axios
      .get(`https://jenifa-stores.herokuapp.com/products`, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchField.toLowerCase());
  });

  const deleteProduct = (product_id) => {
    axios
      .delete(`https://jenifa-stores.herokuapp.com/products/${product_id}`, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        console.log(res);
        setMessage(res.data);
        setError(true);
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setMessage("Record could not be deleted, Try again");
        setError(true);
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
          {error ? (
            <Alert style={{ marginTop: "20px" }} severity={severity}>
              {message}
            </Alert>
          ) : (
            <div></div>
          )}
          <div style={{ marginBottom: "10px" }}></div>

          <div className={classes.display}>
            <Typography variant="h4">All Products</Typography>
            <Link to="/create" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  padding: 13,
                  backgroundColor: "#0d47a1",
                  width: 200,
                }}
              >
                <AddCircle style={{ marginRight: 5 }} />
                NEW PRODUCT
              </Button>
            </Link>
          </div>
          <Categories />
          <div style={{ marginBottom: "20px" }}></div>
          <Container component={Card} maxWidth="lg">
            <Grid container>
              <Grid item xs={12} sm={12}>
                <TableContainer component={Paper} elevation={0}>
                  <SearchBox
                    searchChange={searchChange}
                    place="Search product..."
                  />

                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Category"
                    variant="outlined"
                    style={{ width: 180, marginRight: 10 }}
                  >
                    <MenuItem selected value="All">
                      All
                    </MenuItem>
                    <MenuItem value="Beverages">Beverages</MenuItem>
                    <MenuItem value="Drinks">Drinks</MenuItem>
                  </TextField>

                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Availablity"
                    variant="outlined"
                    style={{ width: 180 }}
                  >
                    <MenuItem selected value="All">
                      All
                    </MenuItem>
                    <MenuItem value="Available">Available</MenuItem>
                    <MenuItem value="Unavailable">Unavailable</MenuItem>
                  </TextField>

                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell className={classes.head}>Name</TableCell>
                        <TableCell className={classes.head}>
                          Inventory
                        </TableCell>
                        <TableCell className={classes.head}>
                          Description
                        </TableCell>
                        <TableCell className={classes.head}>Category</TableCell>
                        <TableCell className={classes.head}>Quantity</TableCell>
                        <TableCell className={classes.head}>Price</TableCell>
                        <TableCell colSpan="2" className={classes.head}>
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? filteredProducts.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : filteredProducts
                      ).map((product) => (
                        <TableRow key={product._id}>
                          <TableCell>
                            <Image
                              style={{
                                backgroundColor: "#f5f5f5",
                                padding: 10,
                              }}
                            />
                          </TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>
                            {product.inStock ? (
                              <Chip
                                variant="default"
                                label="IN STOCK"
                                style={{ color: "#4caf50" }}
                              />
                            ) : (
                              <Chip
                                variant="default"
                                label="OUT OF STOCK"
                                style={{ color: "#f57c00" }}
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            {product.description === ""
                              ? "No description"
                              : product.description}
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>
                            {product.quantity === ""
                              ? "Unknown"
                              : product.quantity}
                          </TableCell>
                          <TableCell>{product.price}</TableCell>

                          <TableCell style={{ display: "flex" }}>
                            <EditProduct product={product} />

                            <IconButton
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to delete this product?"
                                  )
                                );
                                deleteProduct(product._id);
                              }}
                            >
                              <Delete style={{ color: "#d32f2f" }} />
                            </IconButton>
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
                          count={filteredProducts.length}
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

export default Products;
