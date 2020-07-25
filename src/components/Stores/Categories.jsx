import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  makeStyles,
  Typography,
  Snackbar,
  Slide,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@material-ui/core";
import axios from "axios";
import { Delete } from "@material-ui/icons";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 30,
    marginTop: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(1),
  },
}));
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [al, setAl] = useState(false);
  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const token = localStorage.getItem("token");

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    setLoading(true);
    axios
      .get("https://jenifa-stores.herokuapp.com/stores", {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setCategories(res.data.categories);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const deleteCategory = (cat_id) => {
    axios
      .delete(
        `https://jenifa-stores.herokuapp.com/stores/categories/${cat_id}`,
        {
          headers: { Authorization: `${token}` },
        }
      )
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

        setMessage("Category could not be deleted, try again!");
        setAl(true);
        setSeverity("error");
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        disabled={loading}
        onClick={handleClickOpen}
        style={{
          padding: 13,
          backgroundColor: "#0d47a1",
          width: 200,
        }}
      >
        View Categories
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        fullWidth
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"View Categories"}
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
          <TableContainer component={Paper} elevation={0}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.head}>Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category, index) => (
                  <TableRow key={index}>
                    {" "}
                    <TableCell>{category.title}</TableCell>
                    <TableCell>
                      <Tooltip title="Click to delete category" arrow>
                        <IconButton
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this category?"
                              )
                            );
                            deleteCategory(category._id);
                          }}
                        >
                          <Delete color="secondary" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Categories;
