import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Chat from './pages/Chat'
import Login from './pages/Login'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App