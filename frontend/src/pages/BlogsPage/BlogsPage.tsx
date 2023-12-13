import { useEffect, useState } from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
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

  const [currentPage, setCurrentPage] = useState(1);
  const noOfPages = useSelector(
    (state: any) => state.entities.users.numberOfPages
  );

  const onPageChange = (clickedPage: number) => {
    // const newUsers = [...listOfUsers, {
    //     _id: "656a9421c56c68861c127ac",
    //     email: "gaddam.sai@northeastern.edu",
    //     firstName: "Dummy",
    //     lastName: "User",
    //     role: "student"
    // }]
    // // setListOfUsers(newUsers);
    // dispatch(loadUsers(clickedPage,pageSize));
    // setCurrentPage(clickedPage);
    // setTotalNoOfPages(users.numberOfPages);
  };

  // Fetch Users
  const users = useSelector((state: any) => state.entities.users.list);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

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
            <PaginationContainer
              onPageChange={onPageChange}
              currentPage={currentPage}
              noOfPages={noOfPages}
            ></PaginationContainer>
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
            <Filters />
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default BlogsPage;
