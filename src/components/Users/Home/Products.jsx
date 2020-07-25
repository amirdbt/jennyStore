import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  makeStyles,
  CircularProgress,
  CardHeader,
  Table,
  Grid,
  TableCell,
  TableHead,
  TableRow,
  CardContent,
  Typography,
  Button,
  Chip,
  Backdrop,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import axios from "axios";
import SearchBox from "../../Utility/SearchBox";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: "20px",
    marginTop: "20px",
    maxWidth: 345,
    width: "25%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginRight: "5px",
      marginLeft: "5px",
    },
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  cards: {
    display: "flex",
    flexWrap: "wrap",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Products = ({ products, productLength }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const token = localStorage.getItem("token");
  const [searchField, setSearchField] = useState("");
  const [message, setMessage] = useState("");
  const [al, setAl] = useState(false);
  const [severity, setSeverity] = useState("success");

  const book = (storeId, productId, category) => {
    setLoading2(true);
    axios
      .post(
        `https://jenifa-stores.herokuapp.com/bookings/new
      `,
        { storeId, productId, category },
        { headers: { Authorization: `${token}` } }
      )
      .then((res) => {
        console.log(res);
        setMessage("Booking successfully done");
        setAl(true);
        setLoading2(false);
      })
      .catch((error) => {
        console.log(error);
        setMessage("Booking unsuccessful");
        setAl(true);
        setSeverity("error");
        setLoading2(false);
      });
  };

  const searchChange = (e) => {
    setSearchField(e.target.value);
  };
  const filteredProducts = products.filter((product) => {
    return product.price.toLowerCase().includes(searchField.toLowerCase());
  });
  return (
    <div className={classes.cards}>
      {loading ? (
        <CircularProgress style={{ marginLeft: "50%" }} />
      ) : filteredProducts.length ? (
        <>
          {al ? <Alert severity={severity}>{message}</Alert> : <div></div>}
          <Backdrop className={classes.backdrop} open={loading2}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <Card elevation={0}>
                <CardContent>
                  <Typography variant="h5">
                    Total Number of Products: {productLength}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <SearchBox searchChange={searchChange} place="Search Record..." />
            </Grid> */}
          </Grid>
          {filteredProducts.map((products) => (
            <Card className={classes.root} elevation={1} key={products._id}>
              <CardHeader subheader={`Name: ${products.name.toUpperCase()}`} />
              <CardContent>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: 400 }}>Price</TableCell>
                      <TableCell> {products.price}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: 400 }}>Store</TableCell>
                      <TableCell>{products.storeName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: 400 }}>Address</TableCell>
                      <TableCell>{products.address}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: 400 }}>
                        Location
                      </TableCell>
                      <TableCell>{products.location}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: 400 }}>
                        In stock
                      </TableCell>
                      <TableCell>
                        {" "}
                        {products.inStock ? (
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
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: 400 }}>
                        Store Contact
                      </TableCell>
                      <TableCell>{products.storeContact}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: 400 }}>
                        Store Email
                      </TableCell>
                      <TableCell>{products.store_email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: 400 }}>
                        Store Policy
                      </TableCell>
                      <TableCell>{products.store_policy}</TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </CardContent>

              <CardActions>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#2196f3", color: "#fff" }}
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to book this product?"
                      )
                    )
                      book(products.store_id, products._id, products.category);
                  }}
                >
                  Book
                </Button>
              </CardActions>
            </Card>
          ))}
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Products;
