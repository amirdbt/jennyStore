import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField, 
  makeStyles,
  CssBaseline,
  Container,
  Grid,
  InputAdornment,
  Card,  
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { Search, Map } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Products from "./Products";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "rgb(235, 54, 54)",
  },
  title: {
    fontSize: 35,
    fontWeight: 300,
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const SearchProduct = () => {
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productLength, setProductLength] = useState("");
  const token = localStorage.getItem("token");
  const classes = useStyles();

  const locations = [
    "Apo",
    "Apo resettlement",
    "Apo-Dutse",
    "Asokoro",
    "Central Area",
    "Dakibiyu",
    "Dawaki",
    "Duboyi",
    "Durumi",
    "Gaduwa",
    "Galadimawa",
    "Garki",
    "Gudu",
    "Guzape",
    "Gwagwalada",
    "Gwarinpa",
    "Idu",
    "Industrial Area",
    "Jabi",
    "Jahi",
    "Kabusa",
    "Kado",
    "Kafe",
    "Karmo",
    "Karu",
    "Katampe",
    "Kaura",
    "Kubwa",
    "Kuje",
    "Kukwaba",
    "Kyami",
    "Life Camp",
    "Lokogoma",
    "Lugbe",
    "Mabushi",
    "Maitama",
    "Mpape",
    "Nbora",
    "Nyanya",
    "Utako",
    "Wuse 1",
    "Wuse 2",
    "Wuse Zone 2",
    "Wuse Zone 3",
    "Wuse Zone 4",
    "Wuse Zone 5",
    "Wuse Zone 7",
    "Wuye",
  ];
  return (
    <Formik
      initialValues={{
        name: "",
        location: "",
        state: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log("Searching Product in", values);
          setLoading(true);
          axios
            .post(
              `https://jenifa-stores.herokuapp.com/users/search/product`,
              values,
              {
                headers: { Authorization: `${token}` },
              }
            )
            .then((res) => {
              console.log(res);
              setProducts(res.data.products);
              setProductLength(res.data.productsLength);
              setLoading(false);
            })
            .catch((err) => {
              console.log(err.response);
              setErr(true);
              setLoading(false);
            });
          setSubmitting(false);
        }, 200);
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Product name is required"),
        location: Yup.string().required("Location is neeeded"),
        state: Yup.string().required("State is required"),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <>
            <div style={{ marginBottom: "20px" }}></div>
            <Container component={Card} maxWidth="xl" elevation={1}>
              <CssBaseline />
              {err ? <Alert severity="error">{message}</Alert> : <div></div>}
              {productLength === 0 ? (
                <Alert severity="info">No Product</Alert>
              ) : (
                <div></div>
              )}
              <div className={classes.paper}>
                <div className={classes.display}>
                  <Typography
                    component="h1"
                    variant="h5"
                    className={classes.title}
                  >
                    Search for a product by entering product name, location and
                    state of your choice!
                  </Typography>
                </div>

                <form onSubmit={handleSubmit} className={classes.form}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        name="name"
                        label="Product name..."
                        fullWidth
                        type="text"
                        variant="outlined"
                        error={err}
                        className={errors.name && touched.name && "error"}
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputProps={{
                          // <-- This is where the toggle button is added.
                          startAdornment: (
                            <InputAdornment position="start">
                              <Search />
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errors.name && touched.name && (
                        <div className={classes.error}> {errors.name} </div>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel id="demo-simple-select-outlined-label">
                          Location
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          fullWidth
                          label="location"
                          name="location"
                          error={err}
                          value={values.location || ""}
                          className={
                            errors.location && touched.location && "error"
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={{
                            // <-- This is where the toggle button is added.
                            startAdornment: (
                              <InputAdornment position="start">
                                <Map />
                              </InputAdornment>
                            ),
                          }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {locations.map((location) => (
                            <MenuItem value={location}>{location}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {errors.location && touched.location && (
                        <div className={classes.error}> {errors.location} </div>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel id="demo-simple-select-outlined-label">
                          State
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          fullWidth
                          label="state"
                          name="state"
                          error={err}
                          value={values.state || ""}
                          className={errors.state && touched.state && "error"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="Abuja FCT">Abuja FCT</MenuItem>
                          <MenuItem value="Abia">Abia</MenuItem>
                          <MenuItem value="Adamawa">Adamawa</MenuItem>
                          <MenuItem value="Akwa Ibom">Akwa Ibom</MenuItem>
                          <MenuItem value="Anambra">Anambra</MenuItem>
                          <MenuItem value="Bauchi">Bauchi</MenuItem>
                          <MenuItem value="Bayelsa">Bayelsa</MenuItem>
                          <MenuItem value="Benue">Benue</MenuItem>
                          <MenuItem value="Borno">Borno</MenuItem>
                          <MenuItem value="Cross River">Cross River</MenuItem>
                          <MenuItem value="Delta">Delta</MenuItem>
                          <MenuItem value="Ebonyi">Ebonyi</MenuItem>
                          <MenuItem value="Edo">Edo</MenuItem>
                          <MenuItem value="Ekiti">Ekiti</MenuItem>
                          <MenuItem value="Enugu">Enugu</MenuItem>
                          <MenuItem value="Gombe">Gombe</MenuItem>
                          <MenuItem value="Imo">Imo</MenuItem>
                          <MenuItem value="Jigawa">Jigawa</MenuItem>
                          <MenuItem value="Kaduna">Kaduna</MenuItem>
                          <MenuItem value="Kano">Kano</MenuItem>
                          <MenuItem value="Katsina">Katsina</MenuItem>
                          <MenuItem value="Kebbi">Kebbi</MenuItem>
                          <MenuItem value="Kogi">Kogi</MenuItem>
                          <MenuItem value="Kwara">Kwara</MenuItem>
                          <MenuItem value="Lagos">Lagos</MenuItem>
                          <MenuItem value="Nassarawa">Nassarawa</MenuItem>
                          <MenuItem value="Niger">Niger</MenuItem>
                          <MenuItem value="Ogun">Ogun</MenuItem>
                          <MenuItem value="Ondo">Ondo</MenuItem>
                          <MenuItem value="Osun">Osun</MenuItem>
                          <MenuItem value="Oyo">Oyo</MenuItem>
                          <MenuItem value="Plateau">Plateau</MenuItem>
                          <MenuItem value="Rivers">Rivers</MenuItem>
                          <MenuItem value="Sokoto">Sokoto</MenuItem>
                          <MenuItem value="Taraba">Taraba</MenuItem>
                          <MenuItem value="Yobe">Yobe</MenuItem>
                          <MenuItem value="Zamfara">Zamfara</MenuItem>
                        </Select>
                      </FormControl>
                      {errors.state && touched.state && (
                        <div className={classes.error}> {errors.state} </div>
                      )}
                    </Grid>
                  </Grid>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    className={classes.submit}
                    onClick={handleSubmit}
                    style={{ padding: 15, backgroundColor: "#2196f3" }}
                  >
                    Search Product
                  </Button>
                  <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="inherit" />
                  </Backdrop>

                  <div style={{ marginBottom: "20px" }}></div>
                </form>
              </div>
              <div style={{ marginBottom: "20px" }}></div>
            </Container>
            <Container component={Card} maxWidth="xl" elevation={1}>
              <Products products={products} productLength={productLength} />
              <div style={{ marginBottom: "40px" }}></div>
            </Container>
          </>
        );
      }}
    </Formik>
  );
};
export default SearchProduct;
