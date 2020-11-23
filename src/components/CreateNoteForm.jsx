import Title from "./Title";
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import { Option, Select } from "./index";
import until from "../utils/until";
import AuthService from "../services/AuthService";
import { handleLogin, isLoggedIn } from "../utils/auth";
import { useForm } from "../hooks";
import { Redirect } from "react-router-dom";

const CreateNoteForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const createNote = async () => {
    setIsLoading(true);
    setError(null);

    const note = {
      title: values.title,
      user: ,
      template: values.template
    };

    const [err, result] = await until(NoteService.create(note));

    if (err) {
      setError({ message: err.message });
      setIsLoading(false);
    }

    if (result && result.data.errors) {
      setError({ message: "Invalid credentials provided" });
      setIsLoading(false);
    }

    const { data = {} } = result.data || {};

    if (data && data.user && data.token) {
      handleLogin({
        ...data.user,
        token: data.token
      });
      setIsLoading(false);
    }
  };

  const { values, handleChange, handleSubmit } = useForm(auth, {
    email: "",
    password: ""
  });

  if (!isLoggedIn()) {
    return <Redirect to="/login" />;
  }
  return (
   <>
     <Title level={2}>New note</Title>
     <Form className="inner-form">
       <Input
        name="title"
        type="text"
        placeholder={"New note"}
        label={"New note title"}
        required
       />
       <Select>
         <Option value="blank">Blank</Option>
       </Select>
       {error ? <p className="error">{error.message}</p> : null}
       <Button type="submit" disabled={isLoading}>
         {isLoading ? "Loading" : "Create new note"}
       </Button>
     </Form>
   </>
  );
};

export default CreateNoteForm;