import * as React from "react";
import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Grow from "@mui/material/Grow";

import { FETCH_POSTS_QUERY } from "../utils/graphql/fetchPostQuery";
import { AuthContext } from "../context/authContext";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm/PostForm.jsx";
import Loader from "../components/Loader/Loader";

const Home = () => {
  const { user } = React.useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const posts = data?.getPosts;

  return (
    <>
      {user && (
        <div className="mt-2">
          <PostForm />
        </div>
      )}

      {loading ? (
        <Loader />
      ) : (
        posts &&
        posts.map((post, indx) => {
          return (
            <div className="w-full p-2" key={indx}>
              <PostCard post={post} />
            </div>
          );
        })
      )}
    </>
  );
};

export default Home;
