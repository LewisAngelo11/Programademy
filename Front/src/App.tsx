import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminCourses from './pages/admin/AdminCourses'
import StudentDashboard from './pages/student/StudentDashboard'
import CreateCourse from './pages/admin/CreateCourse'
import Register from './pages/Register'
import StudentProfile from './pages/student/StudentProfile'
import AdminProfile from './pages/admin/AdminProfile'
import './App.css'
import EditCourses from './pages/admin/EditCourses'
import InfoCourse from './pages/student/InfoCourse'
import AdminModules from './pages/admin/AdminModules'
import CreateModule from './pages/admin/CreateModule'
import EditModule from './pages/admin/EditModule'

function App() {

  return (
    <>
      <Routes>
        <Route path={"/"} element={<Login/>}/>
        <Route path={"/register"} element={<Register/>}/>
        
        <Route path={"student/dashboard"} element={<StudentDashboard/>}/>
        <Route path={"student/profile"} element={<StudentProfile/>}/>
        <Route path={"info-course/:id"} element={<InfoCourse/>}/>

        <Route path={"admin/profile"} element={<AdminProfile/>}/>
        <Route path={"admin/dashboard"} element={<AdminDashboard/>}/>
        <Route path={'courses-admin'} element={<AdminCourses/>}/>
        <Route path={'courses/create'} element={<CreateCourse/>}/>
        <Route path={'courses/edit/:id'} element={<EditCourses/>}/>
        <Route path={"modules-admin"} element={<AdminModules/>}/>
        <Route path={"modules/create"} element={<CreateModule/>}/>
        <Route path={'modules/edit/:id'} element={<EditModule/>}/>
      </Routes>
    </>
  )
}

export default App
