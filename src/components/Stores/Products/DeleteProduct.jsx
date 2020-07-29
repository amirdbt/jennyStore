import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
  LinearProgress,
  Snackbar,
  Slide,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Delete } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const DeleteProduct = ({ product_id }) => {
  const [open, setOpen] = useState(false);
  const [al, setAl] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState("success");
  const theme = useTheme();
  const token = localStorage.getItem("token");

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let history = useHistory();

  const deleteProduct = () => {
    axios
      .delete(`https://jenifa-stores.herokuapp.com/products/${product_id}`, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        console.log(res);
        setMessage(res.data);
        setAl(true);
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setMessage("Product could not be deleted, Try again");
        setAl(true);
        setSeverity("error");
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      });
  };

  return (
    <div>
      <Tooltip title="Click to delete product" arrow>
        <IconButton
          variant="contained"
          color="secondary"
          onClick={handleClickOpen}
        >
          <Delete style={{ marginRight: "5px" }} />
        </IconButton>
      </Tooltip>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        maxWidth="sm"
        onClose={handleClose}
        fullWidth
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Delete product"}
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

        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deleteProduct}
            disabled={loading}
            color="secondary"
            autoFocus
            variant="contained"
          >
            Delete
          </Button>
          {loading && (
            <LinearProgress variant="query" style={{ marginTop: "10px" }} />
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteProduct;
