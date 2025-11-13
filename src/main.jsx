import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import IncomeExpenseProvider from "./Context/IncomeExpenseProvider.jsx";

createRoot(document.getElementById("root")).render(
  <IncomeExpenseProvider>
    <App />
  </IncomeExpenseProvider>
);
