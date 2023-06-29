import { Route, Routes } from "react-router-dom";
import { RegisterPage, LoginPage } from "./pages";
const App = () => {
  return (
    <div data-theme="light">
      <Routes>
        <Route element={<RegisterPage />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route path="/*" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
