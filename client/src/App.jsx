import { Navigate, Route, Routes } from "react-router-dom";
import { RegisterPage, LoginPage } from "./pages";
import AppLayout from "./Layouts/AppLayout";
import { adminRoutes } from "./Routes/routes";
import { PATHS } from "./Routes/paths";
const App = () => {
  return (
    <div className="font-sans" data-theme="light">
      <Routes>
        <Route element={<RegisterPage />} path={PATHS.register} />
        <Route element={<LoginPage />} path={PATHS.login} />
        <Route path={PATHS.root} element={<Navigate to={PATHS.login} />} />
        {adminRoutes.map(({ id, path, Component }) => {
          return (
            <Route
              key={id}
              path={path}
              element={
                <AppLayout>
                  <Component />
                </AppLayout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
};

export default App;
