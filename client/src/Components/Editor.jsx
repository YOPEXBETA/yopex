import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Editor({ value, onChange, height }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const editorStyle = {
    height: height,
    overflowY: "auto",
  };

  return (
    <div className="content" style={editorStyle}>
      <ReactQuill
        value={value}
        theme="snow"
        onChange={onChange}
        modules={modules}
        style={{ height: "100%" }}
        className="dark:text-white dark:border-white"
      />
    </div>
  );
}
