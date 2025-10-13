import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Layout, Dashboard, Users, Products, Orders, Settings, Favorites, Partners, Exhibitions, Notifications } from "./pages"


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
      },
      {
        path: "/settings",
        Component: Settings
      },
      {
        path: "/favorites",
        Component: Favorites
      },
      {
        path: "/partners",
        Component: Partners
      },
      {
        path: "/exhibitions",
        Component: Exhibitions
      },
      {
        path: "/notifications",
        Component: Notifications
      }
    ]
  }
])

function App() {

  return <RouterProvider router={router} />
}

export default App
