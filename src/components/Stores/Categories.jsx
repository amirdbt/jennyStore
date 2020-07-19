import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Chip,
  CircularProgress,
  makeStyles,
  Typography,
  Snackbar,
  Slide,
} from "@material-ui/core";
import axios from "axios";
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
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      {loading ? (
        <CircularProgress style={{ marginLeft: "50%" }} />
      ) : (
        <>
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
          <Container component={Card} maxWidth="lg" className={classes.root}>
            <Typography variant="caption" style={{ fontSize: 20 }}>
              All Categories
            </Typography>
            {categories.map((category) => (
              <Chip
                label={category.title}
                className={classes.chip}
                onDelete={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this category?"
                    )
                  );
                  deleteCategory(category._id);
                }}
              />
            ))}
          </Container>
        </>
      )}
    </div>
  );
};

export default Categories;
