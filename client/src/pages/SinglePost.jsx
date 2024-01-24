import React from "react";
import { useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import gql from "graphql-tag";

import Loader from "../components/Loader/Loader";
import { AuthContext } from "../context/authContext";
import PostCard from "../components/PostCard";

const SinglePost = (props) => {
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const { postId } = useParams();
  const { data, loading } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });

  function deleteButtonCallback() {
    navigate("/");
  }

  let postMarkup;
  if (loading) {
    postMarkup = <Loader />;
  } else {
    const post = data?.getPost;

    if (!post) {
      postMarkup = <p>No post found</p>;
    } else {
      postMarkup = <PostCard post={post} callback={deleteButtonCallback} />;
    }
  }

  return postMarkup;
};

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      comments {
        id
        body
        username
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
      likeCount
      commentCount
    }
  }
`;

export default SinglePost;
