import * as React from "react";
export function Navigation(): React.ReactElement {
  return (
    <div className={"absolute flex w-full justify-between  p-4 print:hidden"}>
      <div
        className={
          "rounded bg-white py-2 px-4 leading-none [&>*]:leading-none [&>*]:text-background"
        }
      >
        <h1 className={"text-4xl"}>code128.bar</h1>
        <span className={"text-xs"}>
          Changing the world, one barcode at a time
        </span>
      </div>
      {/* <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode" className={"text-white"}>
          Save Color
        </Label>
      </div> */}
    </div>
  );
}
