import { useState } from "react";

function TextField() {
  const [text, setText] = useState("");
  return (
    <div className="TextField">
      <textarea
        rows={1}
        cols={30}
        placeholder="Next......."
        className="TextFieldArea"
        onChange={(event) => {
          setText(event.target.value);
        }}
      ></textarea>
      <button
        onClick={() => {
          setText(text);
        }}
      >
        SAVE
      </button>
      {}
    </div>
  );
}

export default TextField;
