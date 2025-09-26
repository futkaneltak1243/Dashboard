import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Layout, Dashboard, Users } from "./pages"


const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Dashboard
      },
      {
        path: '/users',
        Component: Users
      }
    ]
  }
])

function App() {

  return <RouterProvider router={router} />
}

export default App
