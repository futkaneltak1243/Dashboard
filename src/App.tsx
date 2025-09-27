import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Layout, Dashboard, Users, Products, Orders } from "./pages"


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
      },
      {
        path: '/products',
        Component: Products
      },
      {
        path: "/orders",
        Component: Orders
      }
    ]
  }
])

function App() {

  return <RouterProvider router={router} />
}

export default App
