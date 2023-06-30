import { Route, Routes } from "react-router-dom";
import { RegisterPage, LoginPage, AdminDashboard } from "./pages";
import AppLayout from "./Layouts/AppLayout";
import { PATHS } from "./Routes/paths";
const App = () => {
  return (
    <div data-theme="light">
      <Routes>
        <Route element={<RegisterPage />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route
          element={
            <AppLayout>
              <AdminDashboard />
            </AppLayout>
          }
          path={PATHS.adminDashboard}
        />
        <Route element={<AppLayout></AppLayout>} />
        <Route path="/*" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
