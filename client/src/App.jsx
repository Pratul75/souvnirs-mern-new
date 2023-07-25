import { Navigate, Route, Routes } from "react-router-dom";
import {
  RegisterPage,
  LoginPage,
  PermissionDenied,
  PageNotFound,
} from "./pages";
import AppLayout from "./layouts/AppLayout";
import { adminRoutes, vendorRoutes, customerRoutes } from "./Routes/routes";
import { PATHS } from "./routes/paths";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import ReverseAuthRoute from "./routes/ReverseAuthRoute";
import { ProtectedRoute, useAuth } from "./routes/ProtectedRoute";

const App = () => {
  const darkMode = useSelector((x) => x.appConfig.darkMode);
  const role = useSelector((state) => state.appConfig.login);
  console.log("App.jsx", role);
  return (
    <div data-theme={darkMode ? "dark" : "light"} className={`font-sans`}>
      <AnimatePresence>
        <Routes>
          <Route path={PATHS.root} element={<Navigate to={PATHS.login} />} />

          <Route element={<RegisterPage />} path={PATHS.register} />

          <Route
            path={PATHS.login}
            element={
              <ReverseAuthRoute>
                <LoginPage />
              </ReverseAuthRoute>
            }
          />
          <Route
            path={PATHS.register}
            element={
              <ReverseAuthRoute>
                <RegisterPage />
              </ReverseAuthRoute>
            }
          />
          {/* admin routes */}
          {adminRoutes.map(({ id, path, defaultRole, Component }) => {
            return (
              <Route
                key={id}
                path={path}
                element={
                  <AppLayout>
                    <ProtectedRoute
                      roleRequired={role}
                      defaultRole={defaultRole}
                    >
                      <Component />
                    </ProtectedRoute>
                  </AppLayout>
                }
              />
            );
          })}
          {/* vendor routes */}
          {vendorRoutes.map(({ id, path, defaultRole, Component }) => {
            return (
              <Route
                key={id}
                path={path}
                element={
                  <AppLayout>
                    <ProtectedRoute
                      roleRequired={role}
                      path={path}
                      defaultRole={defaultRole}
                    >
                      <Component />
                    </ProtectedRoute>
                  </AppLayout>
                }
              />
            );
          })}
          {/* customer routes */}
          {customerRoutes.map(({ id, path, defaultRole, Component }) => {
            return (
              <Route
                key={id}
                path={path}
                element={
                  <AppLayout>
                    <ProtectedRoute
                      roleRequired={role}
                      path={path}
                      defaultRole={defaultRole}
                    >
                      <Component />
                    </ProtectedRoute>
                  </AppLayout>
                }
              />
            );
          })}

          <Route path={PATHS.permissionDenied} element={<PermissionDenied />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
