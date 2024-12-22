import { useEffect, useMemo } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store/store";
import { Home } from "./pages/home/Home";
import Navbar from "./components/Navbar";
import Favourites from "./pages/favourites/Favourites";
import Books from "./pages/books/Books";
import Write from "./pages/write/Write";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { logoutAsync } from "./store/Features/auth/authSlice";
import MyBooks from "./pages/myBooks/MyBooks";

let logoutTimer;

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
    } else {
      logoutTimer = setTimeout(() => {
        dispatch(logoutAsync());
        alert("Session expired. Please log in again.");
      }, timeRemaining);
    }

    return () => clearTimeout(logoutTimer);
  }, [token, tokenExpirationDate, dispatch]);

  return token ? element : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <>Page does not exist</>,
    children: [
      {
        path: "/",
        element: <ProtectedRoute element={<Home />} />, // Protect the Home page
      },
      {
        path: "/favourites",
        element: <ProtectedRoute element={<Favourites />} />,
      },
      {
        path: "/books",
        element: <ProtectedRoute element={<Books />} />,
      },
      {
        path: "/write",
        element: (
          <ProtectedRoute
            element={
              <Write bookContent={[]} book_id={null} bookDetails={null} />
            }
          />
        ),
      },
      {
        path: "/mybooks",
        element: <ProtectedRoute element={<MyBooks />} />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
