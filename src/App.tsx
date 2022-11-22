import { useEffect, useRef, useTransition } from "react";
import { Routes, Route } from "react-router";
import { ByPage } from "./pages/by-page/ByPage";
import { ByTable } from "./pages/by-table/ByTable";
import "./styles/app.css";

export const maxBarcodePerPage = 8;

function App(): React.ReactElement {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== "*" || !event.ctrlKey) return;

      document.documentElement.classList.toggle("dark");
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className={"min-h-[100vh] bg-slate-200 dark:bg-slate-900 print:bg-white"}
    >
      <Routes>
        <Route index={true} element={<ByPage />} />
        <Route path={"/table"} element={<ByTable />} />
      </Routes>
    </div>
  );
}

export default App;
