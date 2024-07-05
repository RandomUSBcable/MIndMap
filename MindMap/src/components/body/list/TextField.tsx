import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

interface TextFieldProps {
  FilledText: string;
}

const TextField: React.FC<TextFieldProps> = ({ FilledText = "" }) => {
  const [text, setText] = useState(FilledText);

  const useAutosizeTextArea = (
    textAreaRef: HTMLTextAreaElement | null,
    value: string
  ) => {
    useEffect(() => {
      if (textAreaRef) {
        // We need to reset the height momentarily to get the correct scrollHeight for the textarea
        textAreaRef.style.height = "0px";

        const scrollHeight = textAreaRef.scrollHeight;

        // We then set the height directly, outside of the render loop
        // Trying to set this with state or a ref will product an incorrect value.
        textAreaRef.style.height = "calc(" + scrollHeight + "px - 2vh)";
      }
    }, [textAreaRef, value]);
  };

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, text);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setText(val);
  };

  return (
    <textarea
      value={text}
      rows={1}
      placeholder="Next......."
      className="TextFieldArea"
      ref={textAreaRef}
      onChange={handleChange}
    ></textarea>
  );
};

export default TextField;
