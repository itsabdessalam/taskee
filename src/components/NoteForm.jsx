import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

import Title from "./Title";
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import TemplateSelector from "./TemplateSelector";

import until from "../utils/until";
import { getUserLogged } from "../utils/auth";
import { useForm } from "../hooks";

import NoteService from "../services/NoteService";

const NoteForm = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const createNote = async () => {
    setIsLoading(true);
    setError(null);

    const note = {
      title: values.title,
      user: getUserLogged()._id
    };

    if (values.template !== "") note.template = values.template;

    const [err, result] = await until(NoteService.create(note));
    if (err) {
      setError({ message: err.message });
      setIsLoading(false);
    }

    if (result && result.errors) {
      setError({ message: "Invalid credentials provided" });
      setIsLoading(false);
    }
    const { data = {} } = result.data || {};
    history.push(`/notes/${data._id}`);
  };

  const { values, handleChange, handleSubmit } = useForm(createNote, {
    title: "",
    user: "",
    template: ""
  });

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input
          name="title"
          type="text"
          onChange={handleChange}
          placeholder={"My note title"}
          label={"My note title"}
          required
        />
        <TemplateSelector onChange={handleChange} template={values.template} />
        {error ? <p className="error">{error.message}</p> : null}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading" : "Create new note"}
        </Button>
      </Form>
    </>
  );
};

export default NoteForm;
