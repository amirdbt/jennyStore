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

const Register = () => {
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  let history = useHistory();
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        fullName: "",
        gender: "",
        email: "",
        password: "",
        userName: "",
        phoneNumber: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log("Signing up", values);
          setLoading(true);
          axios
            .post(
              `https://jenifa-stores.herokuapp.com/users/signUp
            `,
              values
            )
            .then((res) => {
              console.log(res);
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("userName", res.data.user.userName);
              localStorage.setItem("role", res.data.user.role);
              setLoading(false);
              history.push("/home");
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
        fullName: Yup.string()
          .required("Required")
          .min(2, "The full name can not be less than 2"),
        gender: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        userName: Yup.string()
          .required("Required")
          .min(3, "The user name can not be less than 3"),
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
                    Sign up now as a User
                  </Typography>
                </div>

                <form onSubmit={handleSubmit} className={classes.form}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        name="fullName"
                        label="Full Name *"
                        fullWidth
                        variant="outlined"
                        type="text"
                        error={err}
                        value={values.fullName}
                        className={
                          errors.fullName && touched.fullName && "error"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.fullName && touched.fullName && (
                        <div className={classes.error}> {errors.fullName} </div>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="email"
                        label="Email *"
                        fullWidth
                        variant="outlined"
                        type="email"
                        multiline
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
                      <FormControl fullWidth variant="outlined">
                        <InputLabel id="demo-simple-select-outlined-label">
                          Gender
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          fullWidth
                          label="gender"
                          name="gender"
                          error={err}
                          value={values.gender || ""}
                          className={errors.gender && touched.gender && "error"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                        </Select>
                      </FormControl>
                      {errors.gender && touched.gender && (
                        <div className={classes.error}> {errors.gender} </div>
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        name="userName"
                        label="Username *"
                        fullWidth
                        variant="outlined"
                        type="text"
                        error={err}
                        value={values.userName}
                        className={
                          errors.userName && touched.userName && "error"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.userName && touched.userName && (
                        <div className={classes.error}> {errors.userName} </div>
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
                        href="/login"
                        variant="body2"
                        style={{ fontSize: 17, color: "#9e9e9e" }}
                      >
                        Have an account?
                      </Link>
                    </Grid>
                    <Grid item xs>
                      <Link
                        href="/signup"
                        variant="body2"
                        style={{ fontSize: 17, color: "#9e9e9e" }}
                      >
                        Store? Register
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
export default Register;
