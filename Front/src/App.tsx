import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminCourses from './pages/admin/AdminCourses'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path={"/"} element={<Login/>}/>
        <Route path={"admin/dashboard"} element={<AdminDashboard/>}/>
        <Route path={'courses-admin'} element={<AdminCourses/>}/>
      </Routes>
    </>
  )
}

export default App
