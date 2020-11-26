import { useEffect } from "react";
import styled from "styled-components";
import EditorJS from "@editorjs/editorjs";

import Header from "@editorjs/header";
import SimpleImage from "@editorjs/simple-image";
import List from "@editorjs/list";
import Table from "@editorjs/table";
import Embed from "@editorjs/embed";
import Quote from "@editorjs/quote";
import RawTool from "@editorjs/raw";
import Marker from "@editorjs/marker";

const StyledEditor = styled.div`
  display: block;
  position: relative;
  background-color: #ffffff;
  padding: 24px;

  .codex-editor--narrow .codex-editor__redactor {
    margin: 0 !important;
  }
`;
const Editor = ({ data, onChange }) => {
  let editor = null;
  useEffect(() => {
    editor = new EditorJS({
      holder: "editorjs",
      autofocus: true,
      tools: {
        header: Header,
        image: SimpleImage,
        quote: Quote,
        embed: Embed,
        list: List,
        table: Table,
        raw: RawTool,
        marker: Marker
      },
      data: data,
      onReady: () => {
        console.log("Editor.js is ready to work!");
      },
      onChange: api => {
        api.saver
          .save()
          .then(outputData => onChange(outputData))
          .catch(error => {
            console.log("Saving failed: ", error);
          });
      }
    });
  }, []);

  useEffect(() => {
    if (editor) {
      editor.data = data;
    }
  }, [data]);

  return (
    <>
      <StyledEditor id="editorjs"></StyledEditor>
    </>
  );
};

export default Editor;
