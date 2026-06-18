import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
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
import TeacherStudents from './pages/teacher/Students'
import EditTest from './pages/teacher/EditTest'
import AdminDashboard from './pages/admin/Dashboard'
import AdminUsers from './pages/admin/Users'
import AdminGroups from './pages/admin/Groups'
import AdminSubjects from './pages/admin/Subjects'
import ProtectedRoute from './components/auth/ProtectedRoute'

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    path: '/student',
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <ProtectedRoute roles={['student']}><StudentDashboard /></ProtectedRoute> },
      { path: 'tests', element: <ProtectedRoute roles={['student']}><StudentTestList /></ProtectedRoute> },
      { path: 'test/:id', element: <ProtectedRoute roles={['student']}><TakeTest /></ProtectedRoute> },
      { path: 'results', element: <ProtectedRoute roles={['student']}><StudentResults /></ProtectedRoute> },
      { path: 'certificates', element: <ProtectedRoute roles={['student']}><StudentCertificates /></ProtectedRoute> },
    ],
  },
  {
    path: '/teacher',
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <ProtectedRoute roles={['teacher', 'admin']}><TeacherDashboard /></ProtectedRoute> },
      { path: 'create-test', element: <ProtectedRoute roles={['teacher', 'admin']}><CreateTest /></ProtectedRoute> },
      { path: 'test/:id/results', element: <ProtectedRoute roles={['teacher', 'admin']}><TeacherTestResults /></ProtectedRoute> },
      { path: 'students', element: <ProtectedRoute roles={['teacher', 'admin']}><TeacherStudents /></ProtectedRoute> },
      { path: 'test/:id/edit', element: <ProtectedRoute roles={['teacher', 'admin']}><EditTest /></ProtectedRoute> },
    ],
  },
  {
    path: '/admin',
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute> },
      { path: 'users', element: <ProtectedRoute roles={['admin']}><AdminUsers /></ProtectedRoute> },
      { path: 'groups', element: <ProtectedRoute roles={['admin']}><AdminGroups /></ProtectedRoute> },
      { path: 'subjects', element: <ProtectedRoute roles={['admin']}><AdminSubjects /></ProtectedRoute> },
    ],
  },
], { basename: '/ahpc.test' })

export default function Router() {
  return <RouterProvider router={router} />
}
