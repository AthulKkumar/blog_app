import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";

import { AuthContext } from "../context/authContext";
import LikeButton from "./LikeButton";
import DeleteButton from "./Button/DeleteButton";

export default function PostCard({
  post: {
    body,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    likes,
    comments,
  },
  callback,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const { user } = React.useContext(AuthContext);

  return (
    <Card sx={{ maxWidth: 345, marginTop: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={username}
        subheader={createdAt}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://picsum.photos/200/300?grayscale"
        alt="Paella dish"
      />
      <CardContent>
        <Link to={`/posts/${id}`}>
          <Typography variant="body2" color="text.secondary">
            {body}
          </Typography>
        </Link>
      </CardContent>
      <CardActions disableSpacing>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <Link to={`/posts/${id}`}>
          <Badge color="primary" badgeContent={commentCount}>
            <IconButton aria-label="share">
              <CommentIcon />
            </IconButton>
          </Badge>
        </Link>
        {user && user.username === username && (
          <DeleteButton postId={id} callback={callback} />
        )}
      </CardActions>
    </Card>
  );
}
