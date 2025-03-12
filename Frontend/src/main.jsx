import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router"
import MountainListRoute from './routes/MountainListRoute.jsx'
import MountainDetailRoute from './routes/MountainDetailRoute.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        index: true,
        element: <MountainListRoute/>
      },
      {
        path: "mountains/:id",
        element: <MountainDetailRoute/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
