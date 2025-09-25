import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/Layout'
import Home from '../pages/Home'
import Search from '../pages/Search'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/search',
    element: <Search />
  }
])

export default router
