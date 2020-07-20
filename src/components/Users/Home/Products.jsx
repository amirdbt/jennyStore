import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardMedia,
  makeStyles,
  CircularProgress,
  CardHeader,
  IconButton,
  Table,
  Grid,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  CardContent,
  Typography,
  Button,
  Chip,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import axios from "axios";
import SearchBox from "../../Utility/SearchBox";

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: "20px",
    marginTop: "20px",
    maxWidth: 345,
    width: "17%",
    [theme.breakpoints.down("sm")]: {
      width: "55%",
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
}));

const Products = ({ products, productLength }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const [searchField, setSearchField] = useState("");

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
                        Quantity
                      </TableCell>
                      <TableCell>{products.quantity}</TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </CardContent>

              <CardActions>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#2196f3" }}
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
