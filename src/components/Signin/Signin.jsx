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

const Signin = () => {
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
        storeName: "",
        password: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log("Signing in", values);
          setLoading(true);
          axios
            .post(`https://jenifa-stores.herokuapp.com/stores/login`, values)
            .then((res) => {
              console.log(res);
              localStorage.setItem("token", res.data.storeToken);
              localStorage.setItem("storeName", res.data.store.storeName);
              localStorage.setItem("role", res.data.store.role);

              setLoading(false);
              history.push("/");
            })
            .catch((err) => {
              console.log(err);

              setMessage(err.response.data.message);
              setErr(true);
              setLoading(false);
            });
          setSubmitting(false);
        }, 200);
      }}
      validationSchema={Yup.object().shape({
        storeName: Yup.string().required("Required"),
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
            <Container component={Card} maxWidth="md">
              <CssBaseline />
              {err ? <Alert severity="error">{message}</Alert> : <div></div>}
              <div className={classes.paper}>
                <div className={classes.display}>
                  <Typography
                    component="h1"
                    variant="h5"
                    style={{ fontSize: 40, fontWeight: 500 }}
                  >
                    Welcome Back!
                  </Typography>
                  <Typography
                    component="h4"
                    variant="subtitle1"
                    style={{
                      fontSize: 20,
                      fontWeight: 300,
                      textAlign: "center",
                    }}
                  >
                    Sign in
                  </Typography>
                </div>

                <form onSubmit={handleSubmit} className={classes.form}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
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
                    Sign In
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
                        href="/signup"
                        variant="body2"
                        style={{ fontSize: 18, color: "#9e9e9e" }}
                      >
                        Create new account
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
export default Signin;
