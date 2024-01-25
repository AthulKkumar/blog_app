import React from "react";
import { Input } from "@nextui-org/react";
import { MailIcon } from "../../assets/Icons/MailIcon";
import { EyeFilledIcon } from "../../assets/Icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../assets/Icons/EyeSlashFilledIcon";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../../context/authContext";
import { REGISTER_USER_MUTATION } from "../../utils/graphql/mutation/registerUserMutation";
import useForm from "../../utils/hooks/useForm";

export default function Register() {
  const [isVisible, setIsVisible] = React.useState(false);
  const context = React.useContext(AuthContext);
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
  const [addUser, { loading }] = useMutation(REGISTER_USER_MUTATION, {
    update(cache, { data: { register: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError(err) {
      setErrors(err?.graphQLErrors[0]?.extensions?.errors);
    },
    variables: value,
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  function registerUser() {
    addUser();
  }

  return (
    <Card className="py-4 w-1/4 m-auto mt-16">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <h4 className="font-bold text-large"> Create An Account</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <div className="flex flex-col gap-4  items-center">
          <Input
            type="text"
            label="Username"
            placeholder="Enter your username"
            labelPlacement="outside"
            endContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            className="max-w-xs"
            name="username"
            value={value.username}
            color={errors.username ? "danger" : ""}
            onChange={handleChange}
            errorMessage={errors.username}
          />
          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            labelPlacement="outside"
            endContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            className="max-w-xs"
            name="email"
            value={value.email}
            color={errors.email ? "danger" : ""}
            onChange={handleChange}
            errorMessage={errors.email}
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
            errorMessage={errors.password}
          />
          <Input
            label="Confirm Password"
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
            name="confirmPassword"
            value={value.confirmPassword}
            color={errors.confirmPassword ? "danger" : ""}
            onChange={handleChange}
            errorMessage={errors.confirmPassword}
          />

          <div className="flex items-center space-x-4">
            <p
              onClick={() => navigate("/login")}
              className="text-default-500 text-center cursor-pointer"
            >
              Already have an Account?
            </p>
            <Button color="primary" onClick={handleSubmit} isLoading={loading}>
              Join Now
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
