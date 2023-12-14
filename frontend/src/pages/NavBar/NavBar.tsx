import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import theme from "../../theme/theme";

import getLanguageObject from "../../utils/getLanguageObject";




const Navbar: React.FC = () => {
  let isAuthenticated = true;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    // Perform the logout logic here
    //dispatch(setAuthenticated(false));
    isAuthenticated = false;
    handleMenuClose();
    navigate("/");
  };

  const languageSelector = useSelector((state:any)=> state.language.selectedLanguage);
  const choosenLanguage: any = getLanguageObject(languageSelector);

  return (
    <AppBar position="static" className="navbar-color">
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          component={Link}
          to="/"
          sx={{ flexGrow: 1 }}
        >
          {choosenLanguage.logo}
        </Typography>
        <div>
          <Button color="inherit" component={Link} to="/events">
          {choosenLanguage.events}
          </Button>
          <Button color="inherit" component={Link} to="/housing">
          {choosenLanguage.Housing}
          </Button>
          <Button color="inherit" component={Link} to="/blogs">
          {choosenLanguage.Blogs}
          </Button>
          {!isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/login">
              {choosenLanguage.Login}
              </Button>
              <Button color="inherit" component={Link} to="/signup">
              {choosenLanguage.Signup}
              </Button>
            </>
          ) : (
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          )}
        </div>
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
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => navigate("/dashboard")}>Dashboard</MenuItem>
          <MenuItem onClick={handleLogout}>{choosenLanguage.Logout}</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
