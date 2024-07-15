import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import {store} from "./store/store";
import { Home } from "./pages/home/Home";
import Navbar from "./components/Navbar";
import Favourites from "./pages/favourites/Favourites";
import Books from "./pages/books/Books";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    errorElement: <>Page does not exist</>,
    children: [
      { path: '/', element: <Home /> },
      { path: '/favourites', element: <Favourites /> },
      { path: '/books', element: <Books /> }
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
