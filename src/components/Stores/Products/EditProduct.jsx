import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  TextField,
  useTheme,
  makeStyles,
  LinearProgress,
  Snackbar,
  Slide,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Update, Edit } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  dialog: {
    width: "100%",
  },
  error: {
    color: "rgb(235, 54, 54)",
    // marginTop: "-20px",
    marginBottom: "10px",
  },
  input: {
    display: "none",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const EditProduct = ({ product }) => {
  console.log(product);
  const {
    name,
    price,
    description,
    category,
    quantity,
    image,
    inStock,
    _id,
  } = product;
  const [open, setOpen] = useState(false);
  const [al, setAl] = useState(false);
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [categories, setCategories] = useState([]);
  const theme = useTheme();
  const token = localStorage.getItem("token");
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get("https://jenifa-stores.herokuapp.com/stores", {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        console.log(res.data.categoryArray);
        setCategories(res.data.categoryArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Formik
      initialValues={{
        name,
        price,
        category,
        description,
        quantity,
        inStock,
        image,
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          console.log("Updating Record", values);
          setLoading(true);
          axios
            .patch(
              `https://jenifa-stores.herokuapp.com/products/${_id} `,
              values,
              { headers: { Authorization: `${token}` } }
            )
            .then((res) => {
              console.log(res);
              console.log(res.data.message);
              setMessage("Product updated successfully");
              setAl(true);
              setLoading(false);
              //   resetForm({});
              setTimeout(() => {
                window.location.reload(false);
              }, 1000);
            })
            .catch((err) => {
              console.log(err);
              setMessage("Product could not be updated, try again");
              setErr(true);
              setAl(true);
              setSeverity("error");
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
        inStock: Yup.string(),
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
          <div>
            <IconButton onClick={handleClickOpen}>
              <Edit />
            </IconButton>
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              fullWidth
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"UPDATE RECORD"}
              </DialogTitle>

              {al ? (
                <>
                  <Alert severity={severity}>
                    <AlertTitle>{severity}</AlertTitle>
                    {message}
                  </Alert>
                  <Snackbar
                    open={open}
                    // autoHideDuration={3000}
                    TransitionComponent={Slide}
                    onClose={handleClose}
                  >
                    <Alert severity={severity}>{message}</Alert>
                  </Snackbar>
                </>
              ) : (
                <div></div>
              )}
              <form onSubmit={handleSubmit}>
                <DialogContent>
                  <div>
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
                  </div>
                  <div style={{ marginBottom: "20px" }}></div>
                  <div>
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
                  </div>
                  <div style={{ marginBottom: "20px" }}></div>
                  <div>
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
                  </div>
                  <div style={{ marginBottom: "20px" }}></div>
                  <div>
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
                        <div className={classes.error}> {errors.category} </div>
                      )}
                    </FormControl>
                  </div>
                  <div style={{ marginBottom: "20px" }}></div>
                  <div>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="demo-simple-select-outlined-label">
                        In Stock
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={values.inStock}
                        onChange={handleChange}
                        error={err}
                        onBlur={handleBlur}
                        className={errors.inStock && touched.inStock && "error"}
                        label="In Stock"
                        name="inStock"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="true">True</MenuItem>
                        <MenuItem vale="false">False</MenuItem>
                      </Select>
                      {errors.inStock && touched.inStock && (
                        <div className={classes.error}> {errors.inStock} </div>
                      )}
                    </FormControl>
                  </div>

                  <div style={{ marginBottom: "20px" }}></div>
                  <div>
                    <TextField
                      name="quantity"
                      label="Quantity *"
                      fullWidth
                      type="text"
                      variant="outlined"
                      error={err}
                      className={errors.quantity && touched.quantity && "error"}
                      value={values.quantity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.quantity && touched.quantity && (
                      <div className={classes.error}> {errors.quantity} </div>
                    )}
                  </div>
                  <div style={{ marginBottom: "20px" }}></div>
                  <div>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="outlined"
                        color="primary"
                        component="span"
                      >
                        Upload Image
                      </Button>
                    </label>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClose} color="secondary">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    color="primary"
                    autoFocus
                  >
                    Submit
                  </Button>
                  <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </DialogActions>
              </form>
            </Dialog>
          </div>
        );
      }}
    </Formik>
  );
};

export default EditProduct;
