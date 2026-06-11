import { useState } from 'react'
import { api } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    try{
      const res = await api.login({ email, senha })
      localStorage.setItem('token', res.token)
      navigate('/')
    }catch(err){
      setError(err.message)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label>Senha</label>
          <input type="password" value={senha} onChange={e=>setSenha(e.target.value)} />
        </div>
        <button type="submit">Entrar</button>
        {error && <p style={{color:'red'}}>{error}</p>}
      </form>
    </div>
  )
}
