import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Link,
  LinearProgress,
  makeStyles,
  CssBaseline,
  Container,
  Grid,
  InputAdornment,
  IconButton,
  Card,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

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
}));

const Signup = () => {
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  let history = useHistory();
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
        storeName: "",
        address: "",
        location: "",
        state: "",
        email: "",
        password: "",
        phoneNumber: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log("Signing up", values);
          setLoading(true);
          axios
            .post(`https://jenifa-stores.herokuapp.com/stores/signUp`, values)
            .then((res) => {
              console.log(res);
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("storeName", res.data.store.storeName);
              localStorage.setItem("role", res.data.store.role);
              localStorage.setItem("enabled", res.data.store.enabled);

              setLoading(false);
              history.push("/");
            })
            .catch((err) => {
              console.log(err.response.data.error);
              setMessage(err.response.data.error);
              setErr(true);
              setLoading(false);
            });
          setSubmitting(false);
        }, 200);
      }}
      validationSchema={Yup.object().shape({
        storeName: Yup.string()
          .required("Required")
          .min(2, "The first name can not be less than 2"),
        address: Yup.string().required("Required"),
        location: Yup.string().required("Required"),
        state: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        phoneNumber: Yup.string().required("Required"),
        password: Yup.string()
          .required("No password provided")
          .min(8)
          .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters,one lowercase, one uppercase, one number and one special case character"
          ),
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
            <Container component={Card} maxWidth="sm">
              <CssBaseline />
              {err ? <Alert severity="error">{message}</Alert> : <div></div>}
              <div className={classes.paper}>
                <div className={classes.display}>
                  <Typography
                    component="h1"
                    variant="h5"
                    style={{ fontSize: 40, fontWeight: 500 }}
                  >
                    Welcome to Jenny Store
                  </Typography>
                  <Typography
                    component="h4"
                    variant="subtitle1"
                    style={{ fontSize: 20, fontWeight: 300 }}
                  >
                    Sign up now as a Store
                  </Typography>
                </div>

                <form onSubmit={handleSubmit} className={classes.form}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        name="storeName"
                        label="Store Name *"
                        fullWidth
                        variant="outlined"
                        type="text"
                        error={err}
                        value={values.storeName}
                        className={
                          errors.storeName && touched.storeName && "error"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.storeName && touched.storeName && (
                        <div className={classes.error}>
                          {" "}
                          {errors.storeName}{" "}
                        </div>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="address"
                        label="Address *"
                        fullWidth
                        variant="outlined"
                        type="text"
                        multiline
                        error={err}
                        value={values.address}
                        className={errors.address && touched.address && "error"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.address && touched.address && (
                        <div className={classes.error}> {errors.address} </div>
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
                    <Grid item xs={12}>
                      <TextField
                        name="email"
                        label="Email Address *"
                        fullWidth
                        variant="outlined"
                        type="email"
                        error={err}
                        value={values.email}
                        className={errors.email && touched.email && "error"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.email && touched.email && (
                        <div className={classes.error}> {errors.email} </div>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="phoneNumber"
                        label="Phone Number *"
                        fullWidth
                        type="text"
                        variant="outlined"
                        error={err}
                        value={values.phoneNumber}
                        className={
                          errors.phoneNumber && touched.phoneNumber && "error"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.phoneNumber && touched.phoneNumber && (
                        <div className={classes.error}>
                          {errors.phoneNumber}
                        </div>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="password"
                        label="Password *"
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        error={err}
                        className={
                          errors.password && touched.password && "error"
                        }
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputProps={{
                          // <-- This is where the toggle button is added.
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errors.password && touched.password && (
                        <div className={classes.error}> {errors.password} </div>
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
                    Sign Up
                  </Button>
                  {loading && (
                    <LinearProgress
                      variant="query"
                      style={{ marginTop: "10px" }}
                    />
                  )}
                  <Divider />
                  <div style={{ marginBottom: "20px" }}></div>
                  <Grid container>
                    <Grid item xs>
                      <Link
                        href="/signin"
                        variant="body2"
                        style={{ fontSize: 17, color: "#9e9e9e" }}
                      >
                        Have an account?
                      </Link>
                    </Grid>
                    <Grid item xs>
                      <Link
                        href="/register"
                        variant="body2"
                        style={{ fontSize: 17, color: "#9e9e9e" }}
                      >
                        User? Register
                      </Link>
                    </Grid>
                  </Grid>
                  <div style={{ marginBottom: "20px" }}></div>
                </form>
              </div>
            </Container>
          </>
        );
      }}
    </Formik>
  );
};
export default Signup;
