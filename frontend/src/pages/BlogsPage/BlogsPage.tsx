import { useEffect, useState } from "react";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import BlogList from "../../components/Blogs/BlogList";
import Filters from "../../components/BlogsFilter/Filters";
import { BlogHeader } from "../../components/Blogs/BlogHeader";
import { useDispatch } from "react-redux";
import { loadBlogs } from "../../store/blogs";
import { useSelector } from "react-redux";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router-dom";
import PaginationContainer from "../../components/PaginationContainer/PaginationContainer";
import { getAllUsers } from "../../store/users";

interface FilterState {
  Last7Days: boolean;
  PostGreaterThan10upvotes: boolean;
  SortByTitle: boolean;
  ResetFilters: boolean;
}

const BlogsPage = (props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Initial state with at least two blog objects
  const blogs = useSelector((state: any) => state.entities.blogs.list);

  useEffect(() => {
    console.log("Dispatching");
    dispatch(loadBlogs());
  }, []);

  const handleClick = () => {
    // Navigate to /blogs/new
    navigate("/blogs/new");
  };

  // Fetch Users
  const users = useSelector((state: any) => state.entities.users.list);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  // Filter
  // Filtering
  const [filters, setFilters] = useState<FilterState>({
    Last7Days: false,
    SortByTitle: false,
    PostGreaterThan10upvotes: false,
    ResetFilters: false,
  });

  const handleFilterChange = (filterName: string, value: boolean) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
    console.log(filters, value);
  };

  return (
    <>
      <BlogHeader />
      <Container>
        <Stack
          direction="row"
          spacing={2}
          marginTop={5}
          justifyContent="space-between"
        >
          <Stack direction={"column"}>
            <BlogList blogs={blogs} users={users} />
          </Stack>

          <Stack
            direction="column"
            spacing={5}
            sx={{ padding: "40px", borderLeft: "1px solid #F2F2F2" }}
          >
            <Button
              variant="contained"
              sx={{
                fontWeight: "bold",
                borderRadius: "25px",
                height: "50px",
                width: "180px",
                position: "sticky",
                top: 100,
              }}
              onClick={handleClick}
            >
              <EditNoteIcon />
              <Typography
                sx={{
                  marginLeft: 1,
                  fontSize: "17px",
                  fontWeight: "bold",
                }}
              >
                Write
              </Typography>
            </Button>
            {/* <Grid>Top 3 Authors</Grid> */}
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default BlogsPage;
