import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import styles from "./Cards.module.css";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState("");
  const [stores, setStores] = useState("");
  const [bookings, setBookings] = useState("");
  const [products, setProducts] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`https://jenifa-stores.herokuapp.com/admin`, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        console.log(res);
        setUsers(res.data.totalUsers);
        setStores(res.data.totalStores);
        setBookings(res.data.totalBookings);
        setProducts(res.data.totalProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="content">
      {loading ? (
        <CircularProgress style={{ marginLeft: "50%" }} />
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item component={Card} xs={12} sm={6} className={styles.users}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Users
                </Typography>
                <Typography variant="h5">{users}</Typography>
                <Typography variant="body2">Number of Users</Typography>
              </CardContent>
            </Grid>
            <Grid
              item
              component={Card}
              xs={12}
              sm={6}
              className={styles.stores}
            >
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Stores
                </Typography>
                <Typography variant="h5">{stores}</Typography>
                <Typography variant="body2">Number of Stores</Typography>
              </CardContent>
            </Grid>
            <Grid
              item
              component={Card}
              xs={12}
              sm={6}
              className={styles.bookings}
            >
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Bookings
                </Typography>
                <Typography variant="h5">{bookings}</Typography>
                <Typography variant="body2">Number of Bookings</Typography>
              </CardContent>
            </Grid>
            <Grid
              item
              component={Card}
              xs={12}
              sm={6}
              className={styles.products}
            >
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Products
                </Typography>
                <Typography variant="h5">{products}</Typography>
                <Typography variant="body2">Number of Products</Typography>
              </CardContent>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
