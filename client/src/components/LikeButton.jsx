import React from "react";
import IconButton from "@mui/material/IconButton";
import { pink } from "@mui/material/colors";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
  const [liked, setLiked] = React.useState(false);
  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  React.useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const likeButton = user ? (
    liked ? (
      <FavoriteRoundedIcon sx={{ color: pink[500] }} />
    ) : (
      <FavoriteRoundedIcon />
    )
  ) : (
    <Link to="/login">
      <FavoriteRoundedIcon />
    </Link>
  );

  return (
    <>
      <Badge color="secondary" badgeContent={likeCount}>
        <IconButton aria-label="add to favorites" onClick={likePost}>
          {likeButton}
        </IconButton>
      </Badge>
    </>
  );
};

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
