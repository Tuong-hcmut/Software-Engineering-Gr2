import useAuth from './hooks/useAuth'
import { Navigate } from 'react-router-dom'


function App() {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" />
  }
  
  return (
    <Navigate to="/homepage" />
  )
}

export default App
