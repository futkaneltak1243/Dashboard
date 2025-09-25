import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Layout } from "./pages"


const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [

    ]
  }
])

function App() {

  return <RouterProvider router={router} />
}

export default App
