import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useHistory, Link } from "react-router-dom";
import SearchProduct from "./SearchProduct";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "#000000",
  },
}));

const Home = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  let history = useHistory();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const logout = () => {
    localStorage.removeItem("token");

    history.push("/login");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <AppBar
        position="static"
        style={{ backgroundColor: "#2196f3" }}
        elevation={0}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Jenny's Store
          </Typography>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <Link to="/profile" className={classes.link}>
                <MenuItem>My account</MenuItem>
              </Link>

              <MenuItem onClick={logout}>Log out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <div>
        <SearchProduct />
      </div>
    </div>
  );
};

export default Home;
