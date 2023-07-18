import { Navigate, Route, Routes } from "react-router-dom";
import { RegisterPage, LoginPage } from "./pages";
import AppLayout from "./Layouts/AppLayout";
import { adminRoutes } from "./Routes/routes";
import { PATHS } from "./routes/paths";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

const App = () => {
  const darkMode = useSelector((x) => x.appConfig.darkMode);
  return (
    <div data-theme={darkMode ? "night" : "light"} className={`font-sans`}>
      <AnimatePresence>
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
      </AnimatePresence>
    </div>
  );
};

export default App;
