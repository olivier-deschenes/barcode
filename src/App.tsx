import { Routes, Route } from "react-router";
import { ByPage } from "./pages/by-page/ByPage";
import { ByTable } from "./pages/by-table/ByTable";
import { Navigation } from "./components/Navigation";
import React from "react";

export const maxBarcodePerPage = 8;

function getRandomHSLColor() {
  const hue = Math.floor(Math.random() * 360); // Random hue between 0 and 360
  const saturation = Math.floor(Math.random() * 100); // Random saturation between 0 and 100
  const lightness = Math.floor(Math.random() * 50) + 50; // Random lightness between 50 and 100 to ensure it's not too dark

  const textColor = getContrastingTextColor(hue, saturation, lightness);

  const hslColor = `${hue} ${saturation}% ${lightness}%`;
  return {
    "--background": hslColor,
    "--forground": textColor,
  };
}

function getContrastingTextColor(h: number, l: number, s: number): string {
  // Calculate the relative luminance of the color
  const luminance = (0.299 * h + 0.587 * l + 0.114 * s) / 100;

  // Use a threshold value (0.5) to determine whether to use white or black text
  if (luminance > 0.5) {
    return "0 0 0"; // Black text for light backgrounds
  } else {
    return "0 0 100"; // White text for dark backgrounds
  }
}

function App(): React.ReactElement {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const style = React.useMemo(
    () => getRandomHSLColor() as React.CSSProperties,
    []
  );

  return (
    <div className={"min-h-[100vh] bg-background print:bg-white"} style={style}>
      <Navigation />
      <Routes>
        <Route index={true} element={<ByPage />} />
        <Route path={"/table"} element={<ByTable />} />
      </Routes>
    </div>
  );
}

export default App;
