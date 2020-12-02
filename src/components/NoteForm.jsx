import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useIntl } from "react-intl";

import Title from "./Title";
import Form from "./Form";
import Input from "./Input";
import Label from "./Label";
import Button from "./Button";
import TemplateSelector from "./TemplateSelector";

import until from "../utils/until";
import { getUser } from "../utils/auth";
import { useForm } from "../hooks";

import NoteService from "../services/NoteService";

const StyledNoteForm = styled.div`
  button {
    width: auto;
    margin-left: auto;
  }

  label {
    font-size: 14px;
    color: #334155;
    margin-bottom: 4px;
  }
`;

const NoteForm = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const intl = useIntl();

  const createNote = async () => {
    setIsLoading(true);
    setError(null);

    const note = {
      title: values.title,
      user: getUser()._id
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
    <StyledNoteForm>
      <Form onSubmit={handleSubmit}>
        <Input
          name="title"
          type="text"
          onChange={handleChange}
          placeholder={intl.formatMessage({ id: "title" })}
          label={intl.formatMessage({ id: "title" })}
          required
        />
        <Label>{intl.formatMessage({ id: "template" })}</Label>
        <TemplateSelector onChange={handleChange} template={values.template} />
        {error ? <p className="error">{error.message}</p> : null}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading" : "Create"}
        </Button>
      </Form>
    </StyledNoteForm>
  );
};

export default NoteForm;
