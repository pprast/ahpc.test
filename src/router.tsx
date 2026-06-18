import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentDashboard from './pages/student/Dashboard'
import StudentTestList from './pages/student/TestList'
import TakeTest from './pages/student/TakeTest'
import StudentResults from './pages/student/Results'
import StudentCertificates from './pages/student/Certificates'
import TeacherDashboard from './pages/teacher/Dashboard'
import CreateTest from './pages/teacher/CreateTest'
import TeacherTestResults from './pages/teacher/TestResults'
import AdminDashboard from './pages/admin/Dashboard'
import AdminUsers from './pages/admin/Users'

const router = createHashRouter([
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    path: '/student',
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <StudentDashboard /> },
      { path: 'tests', element: <StudentTestList /> },
      { path: 'test/:id', element: <TakeTest /> },
      { path: 'results', element: <StudentResults /> },
      { path: 'certificates', element: <StudentCertificates /> },
    ],
  },
  {
    path: '/teacher',
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <TeacherDashboard /> },
      { path: 'create-test', element: <CreateTest /> },
      { path: 'test/:id/results', element: <TeacherTestResults /> },
    ],
  },
  {
    path: '/admin',
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'users', element: <AdminUsers /> },
    ],
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
