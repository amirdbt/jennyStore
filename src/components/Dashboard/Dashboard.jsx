import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Table,
  Grid,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
} from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import { Alert, AlertTitle } from "@material-ui/lab";
import EditProfile from "./EditProfile";
import { Delete } from "@material-ui/icons";
import styles from "../Admin/Cards.module.css";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [store, setStore] = useState({});
  const [categories, setCategories] = useState("");
  const [products, setProducts] = useState("");
  const enabled = localStorage.getItem("enabled");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchStore();
  }, []);

  const fetchStore = () => {
    setLoading(true);
    axios
      .get(
        `https://jenifa-stores.herokuapp.com/stores
      `,
        {
          headers: { Authorization: `${token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        setCategories(res.data.categories.length);
        setProducts(res.data.totalProducts);
        setStore(res.data.store);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  };

  const deactivateAccount = () => {
    console.log("Delete");
  };

  return (
    <div className="content">
      {loading ? (
        <CircularProgress style={{ marginLeft: "50%" }} />
      ) : (
        <>
          {enabled === "false" ? (
            <Alert severity="warning" style={{ marginBottom: "10px" }}>
              <AlertTitle>Warning</AlertTitle>
              Account is not enabled, Please contact admin
            </Alert>
          ) : (
            <div></div>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card elevation={0} className={styles.users}>
                <CardContent>
                  <Typography>Categories </Typography>
                  <Typography variant="h4">{categories}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card elevation={0} className={styles.products}>
                <CardContent>
                  <Typography>Products </Typography>
                  <Typography variant="h4">{products}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Card elevation={0} className={styles.bookings}>
                <CardContent>
                  <Typography>Joined</Typography>
                  <Typography variant="h4">
                    {" "}
                    {moment(store.createdA).format("DD MMM, YYYY")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Card elevation={0}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TableContainer component={Paper} elevation={0}>
                        <Table aria-label="customized table">
                          <TableHead>
                            <TableRow>
                              <TableCell style={{ fontWeight: 400 }}>
                                Store Name
                              </TableCell>
                              <TableCell>{store.storeName}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell style={{ fontWeight: 400 }}>
                                Email Address
                              </TableCell>
                              <TableCell>{store.email}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell style={{ fontWeight: 400 }}>
                                Location
                              </TableCell>
                              <TableCell>{store.location}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell style={{ fontWeight: 400 }}>
                                Store Policy
                              </TableCell>
                              <TableCell>{store.store_policy}</TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TableContainer component={Paper} elevation={0}>
                        <Table aria-label="customized table">
                          <TableHead>
                            <TableRow>
                              <TableCell style={{ fontWeight: 400 }}>
                                State
                              </TableCell>
                              <TableCell>{store.state}</TableCell>
                            </TableRow>

                            <TableRow>
                              <TableCell style={{ fontWeight: 400 }}>
                                Phone Number
                              </TableCell>
                              <TableCell>{store.phoneNumber}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell style={{ fontWeight: 400 }}>
                                Phone Number 2
                              </TableCell>
                              <TableCell>{store.phone_number_two}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell style={{ fontWeight: 400 }}>
                                Phone Number 3
                              </TableCell>
                              <TableCell>{store.phone_number_three}</TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Card elevation={0}>
                        <CardContent>
                          <Typography>Other Actions</Typography>
                          <hr />
                          <div style={{ marginBottom: "20px" }}></div>
                          <div style={{ display: "flex" }}>
                            <EditProfile store={store} />

                            <Button
                              color="secondary"
                              variant="contained"
                              style={{ marginLeft: 10 }}
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to deactivate this account?"
                                  )
                                );
                                deactivateAccount();
                              }}
                            >
                              <Delete />
                              Deactivate Account
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default Dashboard;
