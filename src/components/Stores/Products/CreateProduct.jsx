import React, { useState, useEffect } from "react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";

import { Alert } from "@material-ui/lab";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import CreateCategory from "./CreateCategory";

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
  display: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(3),
  },
  input: {
    display: "none",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const CreateProduct = () => {
  const [err, setErr] = useState(false);
  const [al, setAl] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [categories, setCategories] = useState([]);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const classes = useStyles();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    setLoading2(true);
    axios
      .get("https://jenifa-stores.herokuapp.com/stores", {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        console.log(res.data.categoryArray);
        setCategories(res.data.categoryArray);
        setLoading2(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading2(false);
      });
  };
  return (
    <Formik
      initialValues={{
        name: "",
        price: "",
        category: "",
        description: "",
        quantity: "",

        image: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log("Creating product", values);
          setLoading(true);
          axios
            .post(`https://jenifa-stores.herokuapp.com/products/new`, values, {
              headers: { Authorization: `${token}` },
            })
            .then((res) => {
              console.log(res);
              setMessage("Product created successfully");
              setAl(true);
              setLoading(false);
              setTimeout(() => {
                window.location.reload(false);
              }, 1000);
            })
            .catch((err) => {
              console.log(err.response.data);

              setMessage(err.response.data);
              setSeverity("error");
              setErr(true);
              setLoading(false);
              setTimeout(() => {
                window.location.reload(false);
              }, 1000);
            });
          setSubmitting(false);
        }, 200);
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Required"),
        description: Yup.string(),
        price: Yup.string().required("Required"),
        category: Yup.string().required("Required"),
        quantity: Yup.string(),

        image: Yup.string(),
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
                {al ? (
                  <Alert severity={severity}>{message}</Alert>
                ) : (
                  <div></div>
                )}
                <Backdrop className={classes.backdrop} open={loading2}>
                  <CircularProgress color="inherit" />
                </Backdrop>
                <div className="">
                  <div className={classes.display}>
                    <Typography
                      component="h1"
                      variant="h5"
                      style={{ fontSize: 40, fontWeight: 500 }}
                    >
                      Create a new product
                    </Typography>
                    <CreateCategory />
                  </div>

                  <form onSubmit={handleSubmit} className={classes.form}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          name="name"
                          label="Product Name *"
                          fullWidth
                          variant="outlined"
                          type="text"
                          error={err}
                          value={values.name}
                          className={errors.name && touched.name && "error"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.name && touched.name && (
                          <div className={classes.error}> {errors.name} </div>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="description"
                          label="Description"
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
                        <FormControl fullWidth variant="outlined">
                          <InputLabel id="demo-simple-select-outlined-label">
                            Category
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={values.category}
                            onChange={handleChange}
                            error={err}
                            onBlur={handleBlur}
                            className={
                              errors.category && touched.category && "error"
                            }
                            label="Category"
                            name="category"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {categories.map((category) => {
                              return (
                                <MenuItem value={category}>{category}</MenuItem>
                              );
                            })}
                          </Select>
                          {errors.category && touched.category && (
                            <div className={classes.error}>
                              {" "}
                              {errors.category}{" "}
                            </div>
                          )}
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <input
                          accept="image/*"
                          className={classes.input}
                          id="contained-button-file"
                          multiple
                          type="file"
                        />
                        <label htmlFor="contained-button-file">
                          <Button
                            variant="contained"
                            color="primary"
                            component="span"
                          >
                            Upload Image
                          </Button>
                        </label>
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
