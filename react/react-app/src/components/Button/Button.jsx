import "./Button.css";
import { useState } from "react";

function Button() {
  // const text = "Save";
  const [text, setText] = useState("Save");

  const clicked = () => {
    if (text === "Save") {
      setText("Close");
    } else {
      setText("Save");
    }
  };
  return (
    <>
      <button onClick={clicked} className="button accent">
        {text}
      </button>
    </>
  );
}

export default Button;
