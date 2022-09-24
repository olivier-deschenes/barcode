import JsBarcode from "jsbarcode";
import { useEffect, useMemo, useState } from "react";
import { Barcode } from "./component/Barcode";
import { Textarea } from "./component/Textarea";
import "./styles/app.css";

type KeyDownEvent = React.KeyboardEvent<HTMLTextAreaElement>;

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [codes, setCodes] = useState<string[]>([]);

  const generateCodes = useMemo(() => {
    return (
      <div className={"barcodes-container flex w-full flex-wrap relative"}>
        {codes.map((code, i) => {
          const key = `code_${i}`;

          return <Barcode key={key} id={key} code={code} />;
        })}
      </div>
    );
  }, [codes]);

  const handleAddCode = () => {
    const newCodes = inputValue
      .split("\n")
      .filter((code) => code.trim() !== "");

    setCodes([...codes, ...newCodes]);
    setInputValue("");
  };

  const handleKeyDown = ({ key, shiftKey }: KeyDownEvent) => {
    if (key !== "Enter" || shiftKey) return;

    handleAddCode();
  };

  return (
    <div className="">
      <div className={"m-5 print:hidden"}>
        <Textarea
          value={inputValue}
          onChange={({ target }) => setInputValue(target.value)}
          onKeyDown={handleKeyDown}
          className={"w-full rounded-md p-4"}
          placeholder="Enter codes here"
        />
        <button onClick={handleAddCode}>Add</button>
      </div>
      {generateCodes}
    </div>
  );
}

export default App;
