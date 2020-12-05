import { useState } from "react";

const useForm = (initialState = {}, onSubmit) => {
  const [formData, setFormData] = useState(initialState);

  const handleOnSubmit = event => {
    if (event) event.preventDefault();

    if (onSubmit && typeof onSubmit === "function") {
      onSubmit();
    }
  };

  const handleOnChange = event => {
    event.persist();
    setFormData(formData => ({
      ...formData,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
    }));
  };

  return {
    formData,
    handleOnChange,
    handleOnSubmit
  };
};

export default useForm;
