import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
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
      createdAt
    }
  }
`;
