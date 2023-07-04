import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <h3 className="text-xl my-4">Description</h3>
      <ReactQuill
        style={{ height: "240px" }}
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="enter text"
        className="rounded-xl"
      />
    </>
  );
};

export default TextEditor;
