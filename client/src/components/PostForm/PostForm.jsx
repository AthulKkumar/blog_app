import React from "react";
import {
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import { useMutation, gql } from "@apollo/client";

import { FETCH_POSTS_QUERY } from "../../utils/graphql/fetchPostQuery";
import useForm from "../../utils/hooks/useForm";

import styles from "./PostForm.module.css";

export default function PostForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { handleChange, handleSubmit, value } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    update(cache, result) {
      const data = cache.readQuery({ query: FETCH_POSTS_QUERY });
      cache.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [result.data.createPost, ...data.getPosts] },
      });
      value.body = "";
      onOpenChange(false);
    },
    variables: value,
  });

  function createPostCallback() {
    createPost();
  }

  const modal = (
    <>
      <Input
        type="email"
        placeholder="Create Post"
        onClick={onOpen}
        endContent={<Button onPress={onOpen}>+</Button>}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Share your thoughts
              </ModalHeader>
              <ModalBody>
                <Textarea
                  placeholder="Write something..."
                  name="body"
                  value={value.body}
                  onChange={handleChange}
                  isInvalid={error ? true : false}
                  errorMessage={error ? error.graphQLErrors[0].message : ""}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>
                  Post
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );

  return modal;
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;
