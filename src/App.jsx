import { RouterProvider } from 'react-router-dom'
import router from './router'
import './assets/App.scss'
import './assets/iconfont/iconfont.css'

function App() {
  return <RouterProvider router={router} />
}

export default App
