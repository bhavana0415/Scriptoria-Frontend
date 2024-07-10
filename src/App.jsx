import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from "./pages/home/Home"
import Navbar from "./components/Navbar"
import Browse from "./pages/browser/Browse"
import { Provider } from 'react-redux'
import { store } from "./store/store"

const router = createBrowserRouter([
    {
        path: '/', 
        element: <Navbar/>,
        errorElement: <>Page does not exist</>,
        children: [
            {path: '/', element: <Home/>},
            {path: '/browse', element: <Browse/>}
        ],
    },
])

function App() {

    return (
        <Provider store={store}>
        <RouterProvider router={router}  />
        </Provider>
    )
}

export default App

