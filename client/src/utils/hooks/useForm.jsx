import React from "react";

export default function useForm(callback, initialState = {}) {
  const [value, setValue] = React.useState(initialState);
  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    handleChange,
    handleSubmit,
    value,
  };
}
