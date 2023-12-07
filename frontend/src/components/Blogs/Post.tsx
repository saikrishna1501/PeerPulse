import React from "react";

import {
  Typography,
  IconButton,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  CardActions,
  Checkbox,
} from "@mui/material";
import { Favorite, FavoriteBorder, MoreVert } from "@mui/icons-material";

// Import the local image
import paellaImage from "../../assets/ezgif.com-gif-maker.png";

const Post = () => {
  return (
    <>
      <Card
        sx={{ marginBottom: "20px", boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)" }}
      >
        <CardHeader
          avatar={
            <>
              <Avatar
                alt="Author Avatar"
                src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=56&ixid=MnwxfDB8MXxyYW5kb218MHx8YXZhdGFyfHx8fHx8MTcwMTk5Mjc3NA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=56" // Use the avatarUrl from your author object
                sx={{ width: 26, height: 26 }}
              />
              <Typography variant="h4" component="div" sx={{ marginLeft: 1 }}>
                Lin
              </Typography>
            </>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
        />

        <CardContent>
          <Typography variant="h4" fontWeight="bold">
            Shrimp and Chorizo Paella
          </Typography>

          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            color="primary" // Add color prop to make the checkbox color primary
          />
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
