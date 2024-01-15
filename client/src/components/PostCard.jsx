import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";

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
}) {
  const [expanded, setExpanded] = React.useState(false);

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
        <Badge color="secondary" badgeContent={likeCount}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </Badge>
        <Badge color="primary" badgeContent={commentCount}>
          <IconButton aria-label="share">
            <CommentIcon />
          </IconButton>
        </Badge>
      </CardActions>
    </Card>
  );
}
