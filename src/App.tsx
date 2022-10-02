import { Routes, Route } from "react-router";
import { ByPage } from "./pages/ByPage";
import { ByTable } from "./pages/ByTable";
import "./styles/app.css";

export const maxBarcodePerPage = 8;

function App(): React.ReactElement {
  return (
    <div>
      <Routes>
        <Route index={true} element={<ByPage />} />
        <Route path={"/table"} element={<ByTable />} />
      </Routes>
    </div>
  );
}

export default App;
