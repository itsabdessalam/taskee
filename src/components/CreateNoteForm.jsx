import Title from "./Title";
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import { Option, Select } from "./index";
import until from "../utils/until";

import { getUserLogged } from "../utils/auth";
import { useForm } from "../hooks";
import { Redirect, useHistory } from "react-router-dom";
import NoteService from "../services/NoteService";

const CreateNoteForm = () => {
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
      <Title level={2}>New note</Title>
      <Form className="inner-form" onSubmit={handleSubmit}>
        <Input
          name="title"
          type="text"
          onChange={handleChange}
          placeholder={"New note"}
          label={"New note title"}
          required
        />
        <Select onChange={handleChange} name="template" type="select">
          <Option value="">Blank</Option>
          <Option value="project">Project</Option>
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
