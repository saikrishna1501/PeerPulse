import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import { toast } from "react-toastify";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import {
  AUTH_ROUTE,
  BLOGS_ROUTE,
  EVENTS_ROUTE,
  HOME_ROUTE,
  HOUSING_ROUTE,
  REGISTER_ROUTE,
  USER_DASHBOARD_ROUTE,
} from "../../constants/routes";
import theme from "../../theme/theme";
import { useSelector } from "react-redux";
import { AccountCircle } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { apiCallForLogout, updateAuthDetails } from "../../store/auth";
import { changeLanguage } from "../../store/language";
import Language from "../../models/language";

const Header: React.FC = () => {
  const location = useLocation();
  const currentLanguage = useSelector((state: any) => state.language.selectedLanguage)
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const user = useSelector((state: any) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [languageAnchorEl, setLanguageAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) =>{
    // console.log("Executing");
    setLanguageAnchorEl(event.currentTarget);
}

  const handleMenuClose = () => setAnchorEl(null);

  const handleLanguageMenuClose = () => setLanguageAnchorEl(null);

  const handleLogout = () => {
    //dispatch(updateAuthDetails())
    // console.log("Executing");
    handleMenuClose();
    navigateTo(HOME_ROUTE)();
    localStorage.clear();
    if (user) {
      dispatch(apiCallForLogout(user.email));
    }
    toast.success("Successfully logged out!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleDashboardClick = () => {
    navigateTo(USER_DASHBOARD_ROUTE)();
    handleMenuClose();
  };

  const languageChangeHandler = (language: Language) => {
    dispatch(changeLanguage({ language: language }))
    handleLanguageMenuClose();
  }

  const navigateTo = (route: string) => () => navigate(route);

  // const StyledToolbar = styled(Toolbar)({
  //   display: "flex",
  //   justifyContent: "space-between",
  // });

  const checkStartsWith = (stringToCheck: string, prefix: string) => {
    return stringToCheck.startsWith(prefix);
  };

  const CustomTab = styled(Tab)({
    fontFamily: theme.typography.fontFamily,
    fontSize: "1.2rem",
  });

  return (
    <React.Fragment>
      <AppBar position="sticky">
        <Container>
          <Toolbar>
            <Typography
              variant="h2"
              sx={{
                display: { xs: "none", sm: "block" },
                color: "#fff",
                fontFamily: theme.typography.fontFamily,
              }}
            >
              Peer Pulse
            </Typography>
            <LaptopChromebookIcon
              sx={{ display: { xs: "block", sm: "none" } }}
            />
            <Tabs
              sx={{
                flexGrow: 1,
                margin: "auto",
                color: "#fff", // Update with your desired color
              }}
              textColor="inherit"
              centered
              value={value}
              onChange={(e, newValue) => setValue(newValue)}
            >
              <CustomTab
                label="Home"
                onClick={navigateTo(HOME_ROUTE)}
                style={{ opacity: location.pathname === "/" ? 1 : 0.6 }}
              />
              <CustomTab
                label="Events"
                onClick={navigateTo(EVENTS_ROUTE)}
                style={{
                  opacity: checkStartsWith(location.pathname, "/event")
                    ? 1
                    : 0.6,
                }}
              />
              <CustomTab
                label="Housing"
                onClick={navigateTo(HOUSING_ROUTE)}
                style={{
                  opacity: checkStartsWith(location.pathname, "/housing")
                    ? 1
                    : 0.6,
                }}
              />
              <CustomTab
                label="Blogs"
                onClick={navigateTo(BLOGS_ROUTE)}
                style={{
                  opacity: checkStartsWith(location.pathname, "/blog")
                    ? 1
                    : 0.6,
                }}
              />
            </Tabs>
            <div>
            <IconButton
                size="large"
                edge="end"
                aria-label="language options"
                aria-controls="more-language-options-menu"
                aria-haspopup="true"
                onClick={handleLanguageMenuOpen}
                color="inherit"
                >
                  <LanguageIcon
                    sx={{
                      marginRight: 1,
                      width: 50,
                      height: 35,
                    }}
                  />
              </IconButton>
              <Menu
                    id="more-language-options-menu"
                    anchorEl={languageAnchorEl}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={Boolean(languageAnchorEl)}
                    onClose={handleLanguageMenuClose}
                    >
                    <MenuItem onClick={()=> {languageChangeHandler(Language.ENGLISH)}}><ListItemText>English</ListItemText></MenuItem>
                    <MenuItem onClick={()=> {languageChangeHandler(Language.SPANISH)}}><ListItemText>Spanish</ListItemText></MenuItem>
                </Menu>
              </div>
            <Button
              variant="contained"
              onClick={navigateTo(AUTH_ROUTE)}
              sx={{
                marginRight: 2,
                backgroundColor: "#fff", // Update with your desired color
                color: "#333", // Update with your desired color
                fontFamily: theme.typography.fontFamily,
                display: isAuthenticated ? "none" : "inline-flex",
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              onClick={navigateTo(REGISTER_ROUTE)}
              sx={{
                backgroundColor: "#fff", // Update with your desired color
                color: "#333", // Update with your desired color
                fontFamily: theme.typography.fontFamily,
                display: isAuthenticated ? "none" : "inline-flex",
              }}
            >
              SignUp
            </Button>
            <div>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{ display: isAuthenticated ? "inline-flex" : "none" }}
              >
                <AccountCircle
                  sx={{
                    marginRight: 1,
                    width: 50,
                    height: 35,
                  }}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
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
                <MenuItem onClick={handleDashboardClick}>Dashboard</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
