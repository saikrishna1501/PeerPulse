import {
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  CardActions,
  Stack,
  Chip,
  Box,
} from "@mui/material";
import Blog from "../../models/blogs";

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <>
      <Card
        sx={{
          marginBottom: "40px",
          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
        }}
      >
        <CardHeader
          sx={{ padding: "0px", marginBottom: "15px" }}
          avatar={
            <>
              <Avatar
                alt="Author Avatar"
                src={blog.author.avatarUrl}
                sx={{ width: 26, height: 26 }}
              />
              <Typography
                variant="h5"
                fontWeight="500"
                sx={{ padding: "0px", marginLeft: 1, color: "#242424" }}
              >
                {blog.author.name || "Raveena"}
              </Typography>
            </>
          }
        />

        <CardContent sx={{ padding: "0px" }}>
          <Typography
            sx={{ marginBottom: "10px" }}
            variant="h3"
            fontWeight="bold"
          >
            {blog.title}
          </Typography>

          <Typography
            sx={{ marginBottom: "10px", fontSize: "20px" }}
            variant="inherit"
            color="text.secondary"
          >
            {blog.content.length > 150
              ? `${blog.content.slice(0, 150)}...`
              : blog.content}
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: 0 }}>
          <Typography sx={{ fontSize: "15px", marginRight: "2px" }}>
            {new Date(blog!.createdAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </Typography>
          <Box /> {/* Added Box with flexGrow to push the Chip to the right */}
          <Stack direction="row" spacing={1}>
            {blog.tag?.map((t) => (
              <Chip label={t} />
            ))}
          </Stack>
        </CardActions>
      </Card>
    </>
  );
};

export default BlogCard;
