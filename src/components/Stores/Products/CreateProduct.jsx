import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  LinearProgress,
  makeStyles,
  CssBaseline,
  Container,
  Grid,
  Card,
  Divider,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
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

const CreateProduct = () => {
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
        product_name: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log("Signing in", values);
          setLoading(true);
          axios
            .post(``, values)
            .then((res) => {
              console.log(res);
              localStorage.setItem("token", res.data.token);

              setLoading(false);
              // history.push("/profile");
            })
            .catch((err) => {
              console.log(err);
              console.log(err);
              // setMessage(err.response.data.error);
              setErr(true);
              setLoading(false);
            });
          setSubmitting(false);
        }, 200);
      }}
      validationSchema={Yup.object().shape({
        product_name: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        price: Yup.string().required("Required"),
        category: Yup.string().required("Required"),
        quantity: Yup.string().required("Required"),
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
            <div className="content">
              <Container component={Card} maxWidth="lg">
                <CssBaseline />
                {err ? <Alert severity="error">{message}</Alert> : <div></div>}
                <div className={classes.paper}>
                  <div className={classes.display}>
                    <Typography
                      component="h1"
                      variant="h5"
                      style={{ fontSize: 40, fontWeight: 500 }}
                    >
                      Create a new product
                    </Typography>
                  </div>

                  <form onSubmit={handleSubmit} className={classes.form}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          name="product_name"
                          label="Product Name *"
                          fullWidth
                          variant="outlined"
                          type="text"
                          error={err}
                          value={values.product_name}
                          className={
                            errors.product_name &&
                            touched.product_name &&
                            "error"
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.product_name && touched.product_name && (
                          <div className={classes.error}>
                            {" "}
                            {errors.product_name}{" "}
                          </div>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="description"
                          label="Description *"
                          fullWidth
                          type="text"
                          variant="outlined"
                          error={err}
                          className={
                            errors.description && touched.description && "error"
                          }
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.description && touched.description && (
                          <div className={classes.error}>
                            {" "}
                            {errors.description}{" "}
                          </div>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="price"
                          label="Price *"
                          fullWidth
                          type="text"
                          variant="outlined"
                          error={err}
                          className={errors.price && touched.price && "error"}
                          value={values.price}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.price && touched.price && (
                          <div className={classes.error}> {errors.price} </div>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="category"
                          label="Category *"
                          fullWidth
                          type="text"
                          variant="outlined"
                          error={err}
                          className={
                            errors.category && touched.category && "error"
                          }
                          value={values.category}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.category && touched.category && (
                          <div className={classes.error}>
                            {" "}
                            {errors.category}{" "}
                          </div>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="quantity"
                          label="Quantity *"
                          fullWidth
                          type="text"
                          variant="outlined"
                          error={err}
                          className={
                            errors.categquantityory &&
                            touched.quantity &&
                            "error"
                          }
                          value={values.quantity}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.quantity && touched.quantity && (
                          <div className={classes.error}>
                            {" "}
                            {errors.quantity}{" "}
                          </div>
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
                      style={{ padding: 15, backgroundColor: "#0d47a1" }}
                    >
                      Create Product
                    </Button>
                    {loading && (
                      <LinearProgress
                        variant="query"
                        style={{ marginTop: "10px" }}
                      />
                    )}
                    <Divider />

                    <div style={{ marginBottom: "20px" }}></div>
                  </form>
                </div>
              </Container>
            </div>
          </>
        );
      }}
    </Formik>
  );
};
export default CreateProduct;
