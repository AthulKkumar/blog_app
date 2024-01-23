import * as React from "react";
import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Grow from "@mui/material/Grow";

import { FETCH_POSTS_QUERY } from "../utils/graphql/fetchPostQuery";
import { AuthContext } from "../context/authContext";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

const Home = () => {
  const { user } = React.useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const posts = data?.getPosts;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <h1>Recent Posts</h1>
      {user && <PostForm />}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          posts &&
          posts.map((post) => {
            return (
              <Grow in={true} timeout={1000} key={post.id}>
                <Grid item xs={2} sm={4} md={4} key={post.id}>
                  <PostCard post={post} />
                </Grid>
              </Grow>
            );
          })
        )}
      </Grid>
    </Box>
  );
};

export default Home;
