import * as React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import PostCard from "../components/PostCard";

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const posts = data?.getPosts;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {loading ? (
          <h3>Loading the posts....</h3>
        ) : (
          posts &&
          posts.map((post) => {
            return (
              <Grid item xs={2} sm={4} md={4} key={post.id}>
                <PostCard post={post} />
              </Grid>
            );
          })
        )}
      </Grid>
    </Box>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      username
      likeCount
      likes {
        username
        createdAt
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Home;
