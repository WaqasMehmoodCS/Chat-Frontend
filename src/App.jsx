import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Loading from "./components/loading";

const Login = React.lazy(() => import("./pages/login"));
const Navbar = React.lazy(() => import("./components/Navbar"));
const Register = React.lazy(() => import("./pages/register"));
const Homepage = React.lazy(() => import("./pages/homepage"));

const App = () => {
  
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Navbar />
      </Suspense>
      <hr />
      <div style={{ minHeight: "calc(100vh - 62px)", display: "flex" }}>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <Homepage />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<Loading />}>
                <Register />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

