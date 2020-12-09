import styled from "styled-components";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";

import Form from "./Form";
import Input from "./Input";
import Label from "./Label";
import Button from "./Button";
import TemplateSelector from "./TemplateSelector";

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
    margin-bottom: 4px;
  }
`;

const NoteForm = () => {
  const history = useHistory();
  const [status, setStatus] = useState({
    loading: false,
    error: ""
  });
  const intl = useIntl();
  const { formData, handleOnChange } = useForm({
    title: "",
    user: "",
    template: ""
  });

  const handleServerResponse = (response, err) => {
    if (response) {
      const { data = {} } = response.data || {};

      if (data._id) {
        history.push(`/notes/${data._id}`);
      }
    } else if (err) {
      setStatus({
        error: err.message
      });
    }
  };

  const handleOnSubmit = event => {
    event.preventDefault();
    setStatus(prevStatus => ({ ...prevStatus, loading: true }));

    const payload = {
      title: formData.title,
      user: getUser()._id,
      ...(formData.template !== "" ? { template: formData.template } : {})
    };

    NoteService.create(payload)
      .then(response => {
        handleServerResponse(response, null);
      })
      .catch(error => {
        handleServerResponse(null, error);
      })
      .finally(() => {
        setStatus(prevStatus => ({ ...prevStatus, loading: false }));
      });
  };

  useEffect(() => {
    return () => {
      setStatus({});
    };
  }, []);

  return (
    <StyledNoteForm>
      <Form onSubmit={handleOnSubmit}>
        <Input
          name="title"
          type="text"
          onChange={handleOnChange}
          placeholder={intl.formatMessage({ id: "title" })}
          label={intl.formatMessage({ id: "title" })}
          required
        />
        <Label>{intl.formatMessage({ id: "template" })}</Label>
        <TemplateSelector
          onChange={handleOnChange}
          template={formData.template}
        />
        {status.error ? <p className="error">{status.error}</p> : null}
        <Button type="submit" disabled={status.loading}>
          {status.loading
            ? intl.formatMessage({ id: "loading" })
            : intl.formatMessage({ id: "create" })}
        </Button>
      </Form>
    </StyledNoteForm>
  );
};

export default NoteForm;
