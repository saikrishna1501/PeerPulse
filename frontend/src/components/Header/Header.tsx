import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import {
  AppBar,
  Button,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  AUTH_ROUTE,
  BLOGS_ROUTE,
  EVENTS_ROUTE,
  HOME_ROUTE,
  HOUSING_ROUTE,
  REGISTER_ROUTE,
} from "../../constants/routes";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  // navigator function
  const navigateTo = (route: string) => () => navigate(route);

  return (
    <React.Fragment>
      <AppBar
        position="sticky"
        sx={{
          background: "#063970",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <LocalActivityIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            className="logo"
            onClick={navigateTo(HOME_ROUTE)}
          >
            Peer Pulse
          </Typography>
          <Tabs
            sx={{
              flexGrow: 1,
              margin: "auto",
            }}
            textColor="inherit"
            centered
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
            indicatorColor="secondary"
          >
            <Tab label="Home" onClick={navigateTo(HOME_ROUTE)} />
            <Tab label="Events" onClick={navigateTo(EVENTS_ROUTE)} />
            <Tab label="Housing" onClick={navigateTo(HOUSING_ROUTE)} />
            <Tab label="Blogs" onClick={navigateTo(BLOGS_ROUTE)} />
          </Tabs>

          <Button
            variant="contained"
            onClick={navigateTo(AUTH_ROUTE)}
            sx={{ marginRight: 2 }}
          >
            Login
          </Button>
          <Button variant="contained" onClick={navigateTo(REGISTER_ROUTE)}>
            SignUp
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
