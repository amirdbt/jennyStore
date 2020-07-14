import React, { useState } from "react";
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
}));

const EditProduct = () => {
  const [open, setOpen] = useState(false);
  const [al, setAl] = useState(false);
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState("success");
  const theme = useTheme();
  //   const token = localStorage.getItem("token");
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Formik
      initialValues={{
        product_name: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // setTimeout(() => {
        //   console.log("Updating Record", values);
        //   setLoading(true);
        //   axios
        //     .patch(` `, values, { headers: { Authorization: `${token}` } })
        //     .then((res) => {
        //       console.log(res);
        //       //   console.log(res.data.message);
        //       //   setMessage("Record updated successfully");
        //       //   setAl(true);
        //       //   setLoading(false);
        //       //   resetForm({});
        //       //   setTimeout(() => {
        //       //     window.location.reload(false);
        //       //   }, 1000);
        //     })
        //     .catch((err) => {
        //       console.log(err);
        //       //   setMessage("Record could not be updated, try again");
        //       //   setErr(true);
        //       //   setAl(true);
        //       //   setSeverity("error");
        //       //   setLoading(false);
        //       //   setTimeout(() => {
        //       //     window.location.reload(false);
        //       //   }, 1000);
        //     });
        //   setSubmitting(false);
        // }, 200);
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
                      name="product_name"
                      label="Product Name *"
                      fullWidth
                      variant="outlined"
                      type="text"
                      error={err}
                      value={values.product_name}
                      className={
                        errors.product_name && touched.product_name && "error"
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
                  </div>
                  <div style={{ marginBottom: "20px" }}></div>
                  <div>
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
                    <TextField
                      name="category"
                      label="Category *"
                      fullWidth
                      type="text"
                      variant="outlined"
                      error={err}
                      className={errors.category && touched.category && "error"}
                      value={values.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.category && touched.category && (
                      <div className={classes.error}> {errors.category} </div>
                    )}
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
                      className={
                        errors.categquantityory && touched.quantity && "error"
                      }
                      value={values.quantity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.quantity && touched.quantity && (
                      <div className={classes.error}> {errors.quantity} </div>
                    )}
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
                  {loading && (
                    <LinearProgress
                      variant="query"
                      style={{ marginTop: "10px" }}
                    />
                  )}
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
