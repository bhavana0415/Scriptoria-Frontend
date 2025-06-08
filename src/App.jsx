import React, { Suspense, useEffect, useMemo } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store/store";
import { logoutAsync } from "./store/Features/auth/authSlice";
import Loader from "./components/Loader";
import { showAlert } from "./store/Features/alert/alertSlice";
import AlertBox from "./components/Alert";

const Home = React.lazy(() => import("./pages/home/Home"));
const Navbar = React.lazy(() => import("./components/Navbar"));
const Favourites = React.lazy(() => import("./pages/favourites/Favourites"));
const Books = React.lazy(() => import("./pages/books/Books"));
const Write = React.lazy(() => import("./pages/write/Write"));
const Login = React.lazy(() => import("./pages/login/Login"));
const Signup = React.lazy(() => import("./pages/signup/Signup"));
const MyBooks = React.lazy(() => import("./pages/myBooks/MyBooks"));

let logoutTimer;

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ element }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.user?.token);

  const tokenExpirationDate = useMemo(() => {
    if (!token) return null;
    const parts = token.split(".");
    const payload = JSON.parse(atob(parts[1]));
    return payload.exp * 1000;
  }, [token]);

  useEffect(() => {
    if (!token || !tokenExpirationDate) return;

    const timeRemaining = tokenExpirationDate - Date.now();

    if (timeRemaining <= 0) {
      dispatch(logoutAsync());
      return;
    }

    const logoutTimer = setTimeout(() => {
      showAlert({
        severity: "info",
        message: `Your session has expired. Please log in again.`,
      });
      dispatch(logoutAsync());
    }, timeRemaining);

    return () => clearTimeout(logoutTimer);
  }, [token, tokenExpirationDate, dispatch]);

  return token ? element : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader isLoading={true} />}>
        <Navbar />
      </Suspense>
    ),
    errorElement: <>Page does not exist</>,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loader isLoading={true} />}>
            <ProtectedRoute element={<Home />} />
          </Suspense>
        ),
      },
      {
        path: "/favourites",
        element: (
          <Suspense fallback={<Loader isLoading={true} />}>
            <ProtectedRoute element={<Favourites />} />
          </Suspense>
        ),
      },
      {
        path: "/books",
        element: (
          <Suspense fallback={<Loader isLoading={true} />}>
            <ProtectedRoute element={<Books />} />
          </Suspense>
        ),
      },
      {
        path: "/write",
        element: (
          <Suspense fallback={<Loader isLoading={true} />}>
            <ProtectedRoute
              element={
                <Write bookContent={[]} book_id={null} bookDetails={null} />
              }
            />
          </Suspense>
        ),
      },
      {
        path: "/mybooks",
        element: (
          <Suspense fallback={<Loader isLoading={true} />}>
            <ProtectedRoute element={<MyBooks />} />
          </Suspense>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);
function App() {
  return (
    <Provider store={store}>
      <AlertBox />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
