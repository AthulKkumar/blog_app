import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Avatar,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/authContext";
import LikeButton from "./LikeButton";
import DeleteButton from "./Button/DeleteButton";

export default function PostCard({
  post: { body, createdAt, id, username, likeCount, likes },
  callback,
}) {
  const { user } = React.useContext(AuthContext);

  return (
    <Card className="py-4 w-full">
      <CardHeader className="pb-0 pt-2  flex ">
        <Avatar
          isBordered
          radius="md"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
        <div className="ml-2">
          <h4 className="font-bold text-medium">{username}</h4>
          <small className="text-default-500">{createdAt}</small>
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <p>{body}</p>
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://picsum.photos/200/300?grayscale"
          // width={270}
        />
      </CardBody>
      <Divider />
      <CardFooter>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <Link to={`/posts/${id}`}>Commetn</Link>
        {user && user.username === username && (
          <DeleteButton postId={id} callback={callback} />
        )}
      </CardFooter>
    </Card>
  );
}
