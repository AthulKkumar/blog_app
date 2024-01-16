import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

import useForm from "../utils/hooks/useForm";

export default function Register(props) {
  const [errors, setErrors] = React.useState({});
  const navigate = useNavigate();
  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { handleChange, handleSubmit, value } = useForm(
    registerUser,
    initialState
  );

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
      navigate("/");
    },
    onError(err) {
      console.log(
        "Register user error : ",
        err?.graphQLErrors[0]?.extensions?.exception?.errors
      );
      setErrors(err?.graphQLErrors[0]?.extensions?.errors);
    },
    variables: value,
  });

  function registerUser() {
    addUser();
  }

  return (
    <>
      <h1>Create An Account</h1>
      {Object.keys(errors).length > 0 && (
        <div>
          {Object.values(errors).map((value) => (
            <Alert severity="error">{value}</Alert>
          ))}
        </div>
      )}
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          label="Username"
          variant="standard"
          name="username"
          value={value.username}
          error={errors.username ? true : false}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          label="Email"
          variant="standard"
          name="email"
          value={value.email}
          error={errors.email ? true : false}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <KeyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          label="Password"
          variant="standard"
          name="password"
          value={value.password}
          error={errors.password ? true : false}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          label="Confirm Password"
          variant="standard"
          name="confirmPassword"
          error={errors.confirmPassword ? true : false}
          value={value.confirmPassword}
          onChange={handleChange}
        />
      </Box>
      <Button variant="contained" color="success" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
