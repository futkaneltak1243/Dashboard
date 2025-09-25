import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Layout, Dashboard } from "./pages"


const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Dashboard
      }
    ]
  }
])

function App() {

  return <RouterProvider router={router} />
}

export default App
