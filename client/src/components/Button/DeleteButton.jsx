import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import Modal from "@mui/material/Modal";

import { FETCH_POSTS_QUERY } from "../../utils/graphql/fetchPostQuery";
import styles from "./Button.module.css";

const DeleteButton = ({ postId, callback }) => {
  const [open, setOpen] = React.useState(false);
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setOpen(false);
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      const newData = data.getPosts.filter((post) => post.id !== postId);
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [...newData] },
      });

      if (callback) callback();
    },
    variables: { postId },
  });

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        onClick={() => setOpen(true)}
        startIcon={<DeleteIcon />}
      >
        Delete Post
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className={styles.modalContent}>
          Are you sure you want to delete this post?
          <Button
            variant="outlined"
            onClick={deletePost}
            color="error"
            startIcon={<DeleteIcon />}
          >
            Delete Post
          </Button>
        </div>
      </Modal>
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;
