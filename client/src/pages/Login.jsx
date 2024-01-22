import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

import { AuthContext } from "../context/authContext";
import useForm from "../utils/hooks/useForm";

export default function Login(props) {
  const context = React.useContext(AuthContext);
  const [errors, setErrors] = React.useState({});
  const navigate = useNavigate();
  const { handleChange, handleSubmit, value } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { login: userData } }) {
      console.log(userData);
      context.login(userData);
      navigate("/");
    },
    onError(err) {
      setErrors(err?.graphQLErrors[0]?.extensions?.errors);
    },
    variables: value,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <>
      <h1>Login to Account</h1>
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

      <Button variant="contained" color="success" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
