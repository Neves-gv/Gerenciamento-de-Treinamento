import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Usuarios from './pages/Usuarios'
import Setores from './pages/Setores'
import Treinamentos from './pages/Treinamentos'
import Certificados from './pages/Certificados'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav className="nav">
          <Link to="/">Dashboard</Link>
          <Link to="/usuarios">Usuários</Link>
          <Link to="/setores">Setores</Link>
          <Link to="/treinamentos">Treinamentos</Link>
          <Link to="/certificados">Certificados</Link>
          <Link to="/login">Login</Link>
        </nav>

        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/setores" element={<Setores />} />
            <Route path="/treinamentos" element={<Treinamentos />} />
            <Route path="/certificados" element={<Certificados />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
