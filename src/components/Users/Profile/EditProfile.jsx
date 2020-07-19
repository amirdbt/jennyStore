import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
  makeStyles,
  LinearProgress,
  Snackbar,
  Slide,
  MenuItem,
  FormControl,
  Grid,
  InputLabel,
  TextField,
  Tooltip,
  Select,
} from "@material-ui/core";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Create } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  dialog: {
    width: "100%",
  },
  error: {
    color: "rgb(235, 54, 54)",
    marginTop: "20px",
    marginBottom: "10px",
  },
}));

const EditProfile = ({ user }) => {
  console.log(user);
  const [open, setOpen] = useState(false);
  const [al, setAl] = useState(false);
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState("success");
  const theme = useTheme();
  const token = localStorage.getItem("token");

  const { fullName, gender, email, phoneNumber, phone_number_two } = user;

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
      enableReinitialize={true}
      initialValues={{
        fullName,
        gender,
        email,
        phoneNumber,
        phone_number_two,
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          console.log("Editing profile", values);
          setLoading(true);
          axios
            .patch(
              `https://jenifa-stores.herokuapp.com/users/edit

          `,
              values,
              { headers: { Authorization: `${token}` } }
            )
            .then((res) => {
              console.log(res);
              console.log(res.data.message);
              setMessage(res.data.message);
              setAl(true);
              setLoading(false);
              resetForm({});
              setTimeout(() => {
                window.location.reload(false);
              }, 1000);
            })
            .catch((err) => {
              console.log(err.response.data.error);
              setMessage(err.response.data.error);
              setErr(true);
              setAl(true);
              setSeverity("error");
              setLoading(false);
            });
          setSubmitting(false);
        }, 200);
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string()
          .required("Required")
          .min(2, "The full name can not be less than 2"),

        gender: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        phoneNumber: Yup.string().required("Required"),

        phone_number_two: Yup.string().nullable(),
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
            <Tooltip title="Click to edit your profile" arrow>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
              >
                <Create style={{ marginRight: "5px" }} /> Edit Profile
              </Button>
            </Tooltip>
            <Dialog
              fullScreen={fullScreen}
              open={open}
              maxWidth="md"
              onClose={handleClose}
              fullWidth
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"Edit Profile"}
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
                  <Grid item xs={12}>
                    <div>
                      <TextField
                        name="fullName"
                        label="Full name"
                        variant="outlined"
                        fullWidth
                        type="text"
                        error={err}
                        value={values.fullName || ""}
                        className={
                          errors.fullName && touched.fullName && "error"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ marginBottom: "20px", marginRight: "10px" }}
                      />

                      {errors.fullName && touched.fullName && (
                        <div className={classes.error}> {errors.fullName} </div>
                      )}
                    </div>
                    <div>
                      <TextField
                        name="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        type="text"
                        error={err}
                        value={values.email || ""}
                        className={errors.email && touched.email && "error"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ marginBottom: "20px" }}
                      />
                      {errors.email && touched.email && (
                        <div className={classes.error}> {errors.email} </div>
                      )}
                    </div>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      style={{ marginBottom: "20px", marginRight: "10px" }}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Gender
                      </InputLabel>
                      <Select
                        label="Gender"
                        name="gender"
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        fullWidth
                        value={values.gender || ""}
                        onChange={handleChange}
                        error={err}
                        onBlur={handleBlur}
                        className={errors.gender && touched.gender && "error"}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </Select>
                      {errors.gender && touched.gender && (
                        <div className={classes.error}> {errors.gender} </div>
                      )}
                    </FormControl>

                    <div>
                      <TextField
                        name="phoneNumber"
                        label="Phone Number"
                        fullWidth
                        type="text"
                        variant="outlined"
                        error={err}
                        value={values.phoneNumber || ""}
                        className={
                          errors.phoneNumber && touched.phoneNumber && "error"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ marginBottom: "20px" }}
                      />
                      {errors.phoneNumber && touched.phoneNumber && (
                        <div className={classes.error}>
                          {errors.phoneNumber}
                        </div>
                      )}
                    </div>
                    <div>
                      <TextField
                        name="phone_number_two"
                        label="Phone Number"
                        fullWidth
                        type="text"
                        variant="outlined"
                        error={err}
                        value={values.phone_number_two || ""}
                        className={
                          errors.phone_number_two &&
                          touched.phone_number_two &&
                          "error"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ marginBottom: "20px" }}
                      />
                      {errors.phone_number_two && touched.phone_number_two && (
                        <div className={classes.error}>
                          {errors.phone_number_two}
                        </div>
                      )}
                    </div>
                  </Grid>
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

export default EditProfile;
