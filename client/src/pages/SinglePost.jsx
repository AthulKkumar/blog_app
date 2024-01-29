import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import gql from "graphql-tag";
import { Textarea, Button } from "@nextui-org/react";

import Loader from "../components/Loader/Loader";
import { AuthContext } from "../context/authContext";
import PostCard from "../components/PostCard";
import DeleteButton from "../components/Button/DeleteButton";

const SinglePost = (props) => {
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const { postId } = useParams();
  const [comment, setComment] = React.useState("");

  const { data, loading } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update() {
      setComment("");
    },
    variables: { postId, body: comment },
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
      const {
        id,
        body,
        createdAt,
        username,
        comments,
        likes,
        likeCount,
        commentCount,
      } = post;
      postMarkup = (
        <>
          <PostCard post={post} callback={deleteButtonCallback} />
          {user && (
            <>
              <Textarea
                label="Comment here"
                placeholder="Write something here..."
                className="max-w-xs"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                name="comment"
              />
              <Button
                color="success"
                className="mt-4"
                isDisabled={comment.trim() === ""}
                onClick={createComment}
              >
                Submit
              </Button>
            </>
          )}
          {comments.map((comment) => {
            return (
              <>
                <div key={comment.id}>
                  <p>{comment.body}</p>
                  <p>{comment.username}</p>
                  <p>{comment.createdAt}</p>
                </div>
                {user && user.username === comment.username && (
                  <DeleteButton postId={id} commentId={comment.id} />
                )}
              </>
            );
          })}
        </>
      );
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

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

export default SinglePost;
