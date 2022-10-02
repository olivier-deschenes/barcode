import * as React from "react";
import { Textarea } from "../component/Textarea";
import { KeyDownEvent } from "../types/event";
export function ByTable(): React.ReactElement {
  const [inputValue, setInputValue] = React.useState<string>("");

  const handleCreateTable = (): void => {
    console.log(inputValue);

    console.log(inputValue.split("\n"));
  };

  const handleOnKeyDown = (event: KeyDownEvent<HTMLTextAreaElement>): void => {
    if (event.key !== "Enter" || !event.ctrlKey) return;

    handleCreateTable();
  };

  const handleOnChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setInputValue(event.target.value);
  };

  return (
    <div className={"flex flex-col"}>
      <div className={"flex w-full"}>
        <Textarea
          className={"flex w-full"}
          onKeyDown={handleOnKeyDown}
          onChange={handleOnChange}
        />
      </div>
      <div>[{inputValue}]</div>
    </div>
  );
}
