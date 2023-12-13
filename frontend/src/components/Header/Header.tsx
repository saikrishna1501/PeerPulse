import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
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
  USER_DASHBOARD_ROUTE
} from "../../constants/routes";
import theme from "../../theme/theme";
import { useSelector } from "react-redux";
import { AccountCircle } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { updateAuthDetails } from "../../store/auth";

const Header: React.FC = () => {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) =>{
      setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    //dispatch(updateAuthDetails())
    handleMenuClose();
    navigateTo(HOME_ROUTE);
  };

  const navigateTo = (route: string) => () => navigate(route);

  // const StyledToolbar = styled(Toolbar)({
  //   display: "flex",
  //   justifyContent: "space-between",
  // });

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
              <CustomTab label="Home" onClick={navigateTo(HOME_ROUTE)} />
              <CustomTab label="Events" onClick={navigateTo(EVENTS_ROUTE)} />
              <CustomTab label="Housing" onClick={navigateTo(HOUSING_ROUTE)} />
              <CustomTab label="Blogs" onClick={navigateTo(BLOGS_ROUTE)} />
              <CustomTab label="Users" onClick={navigateTo(USER_DASHBOARD_ROUTE)} />
            </Tabs>
            <LanguageIcon
              sx={{
                marginRight: 1,
                width: 50,
                height: 35,
              }}
            />
            <Button
              variant="contained"
              onClick={navigateTo(AUTH_ROUTE)}
              sx={{
                marginRight: 2,
                backgroundColor: "#fff", // Update with your desired color
                color: "#333", // Update with your desired color
                fontFamily: theme.typography.fontFamily,
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
            >
              <AccountCircle sx={{
                marginRight: 1,
                width: 50,
                height: 35,
              }}/>
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
              <MenuItem onClick={() => navigateTo(USER_DASHBOARD_ROUTE)}>Dashboard</MenuItem>
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
