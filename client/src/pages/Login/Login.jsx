import React from "react";
import { Input } from "@nextui-org/react";
import { MailIcon } from "./Icons/MailIcon";
import { EyeFilledIcon } from "./Icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "./Icons/EyeSlashFilledIcon";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Chip } from "@nextui-org/react";

import { AuthContext } from "../../context/authContext";
import useForm from "../../utils/hooks/useForm";

import { LOGIN_USER_MUTATION } from "../../utils/graphql/mutation/loginUserMutation";

export default function Login() {
  const context = React.useContext(AuthContext);
  const [errors, setErrors] = React.useState({});
  const navigate = useNavigate();
  const { handleChange, handleSubmit, value } = useForm(loginCallback, {
    username: "",
    password: "",
  });
  const [isVisible, setIsVisible] = React.useState(false);

  const [loginUser, { loading }] = useMutation(LOGIN_USER_MUTATION, {
    update(cache, { data: { login: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError(err) {
      setErrors(err?.graphQLErrors[0]?.extensions?.errors);
    },
    variables: value,
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  function loginCallback() {
    loginUser();
  }

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <h4 className="font-bold text-large"> Login</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <div className="flex flex-col gap-4  items-center">
          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            labelPlacement="outside"
            endContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            className="max-w-xs"
            name="username"
            value={value.username}
            color={errors.username ? "danger" : ""}
            onChange={handleChange}
          />
          <Input
            label="Password"
            labelPlacement="outside"
            placeholder="Enter your password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="max-w-xs "
            name="password"
            value={value.password}
            color={errors.password ? "danger" : ""}
            onChange={handleChange}
          />
          {Object.keys(errors).length > 0 && (
            <div className="flex flex-col gap-4">
              {Object.values(errors).map((value) => (
                <Chip color="danger">{value}</Chip>
              ))}
            </div>
          )}
          <div className="flex items-center space-x-4">
            <p
              onClick={() => navigate("/register")}
              className="text-default-500 text-center cursor-pointer"
            >
              Create An Account?
            </p>
            <Button color="primary" isLoading={loading} onClick={handleSubmit}>
              Enter
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
