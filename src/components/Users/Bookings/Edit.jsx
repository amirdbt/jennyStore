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
  Tooltip,
} from "@material-ui/core";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Edit } from "@material-ui/icons";

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

const EditMessage = ({ booking_id, booking_message }) => {
  const [open, setOpen] = useState(false);
  const [al, setAl] = useState(false);
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState("success");
  const theme = useTheme();
  const token = localStorage.getItem("token");
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
        message: booking_message,
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          console.log("Updating Message", values);
          setLoading(true);
          axios
            .patch(
              `https://jenifa-stores.herokuapp.com/bookings/${booking_id} `,
              values,
              { headers: { Authorization: `${token}` } }
            )
            .then((res) => {
              console.log(res);
              //   console.log(res.data.message);
              setMessage("Message updated successfully");
              setAl(true);
              setLoading(false);
              resetForm({});
              setTimeout(() => {
                window.location.reload(false);
              }, 1000);
            })
            .catch((err) => {
              console.log(err);
              setMessage("Message could not be updated, try again");
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
        message: Yup.string().required("Required"),
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
            <Tooltip title="Edit booking" arrow>
              <IconButton onClick={handleClickOpen}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              fullWidth
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"UPDATE MESSAGE"}
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
                      name="message"
                      label="Message *"
                      fullWidth
                      type="text"
                      variant="outlined"
                      error={err}
                      className={errors.message && touched.message && "error"}
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.message && touched.message && (
                      <div className={classes.error}> {errors.message} </div>
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

export default EditMessage;
