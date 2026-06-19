import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import EstilosLogin, { coresLogin } from '../styles/EstilosLogin'
import logo from '../assets/logo.png'
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { EnderecoServidor } from '../utils.jsx'

export default function Login(){
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [loading, setLoading] = useState(false)
  const [lembrar, setLembrar] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const buscarUsuario = () => {
      const usuarioLogado = localStorage.getItem('UsuarioLogado')
      if (!usuarioLogado) return
      try {
        const usuario = JSON.parse(usuarioLogado)
        if (usuario?.lembrar === true) {
          navigate('/principal')
        }
      } catch (error) {
        console.error('Erro ao ler usuário logado:', error)
      }
    }
    buscarUsuario()
  }, [navigate])

  async function botaoEntrar(e){
    e && e.preventDefault()
    setMensagem('')
    if(!email.trim() || !senha.trim()){
      setMensagem('Preencha todos os campos')
      return
    }
    setLoading(true)
    try{
      const dadosLogin = { email, senha }
      const BASE = EnderecoServidor
      const respostaFetch = await fetch(`${BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosLogin)
      })

      if (respostaFetch.status === 404) {
        setMensagem(`Rota não encontrada: ${respostaFetch.url}`)
        return
      }

      const dados = await (async () => { try { return await respostaFetch.json() } catch { return null } })()

      if (respostaFetch.status === 500) {
        setMensagem(`Erro no servidor: ${dados?.message || respostaFetch.statusText}`)
        return
      }

      if (respostaFetch.ok) {
        if (dados?.token) localStorage.setItem('token', dados.token)
        const usuarioArmazenado = { ...(dados?.usuario || dados), lembrar }
        localStorage.setItem('UsuarioLogado', JSON.stringify(usuarioArmazenado))
        navigate('/principal')
      } else {
        setMensagem(dados?.message || 'Email ou senha incorretos')
      }
    }catch(err){
      setMensagem('Erro ao fazer login: ' + (err.message || String(err)))
    }finally{
      setLoading(false)
    }
  }

  const gradiente = `linear-gradient(180deg, ${coresLogin.gradienteFundo.join(',')})`

  return (
    <div style={{ ...EstilosLogin.container, background: gradiente }}>
      <div style={EstilosLogin.gradiente}>
        <div style={EstilosLogin.conteudoWrapper}>
          <div style={EstilosLogin.cabecalho}>
            <h1 style={EstilosLogin.nomeApp}>Gerenciamento de Treinamento</h1>
            <p style={EstilosLogin.subtituloApp}>Controle de Treinamento</p>
          </div>

          <div style={EstilosLogin.conteudoPrincipal}>
            <div style={EstilosLogin.formularioLogin}>
              <div style={EstilosLogin.logoTopo}>
                <img src={logo} alt="Logo" style={EstilosLogin.iconeLogo} />
              </div>
              <div style={EstilosLogin.titulo}>Acessar sua conta</div>

              <div style={EstilosLogin.grupoInput}>
                <MdEmail size={20} color={coresLogin.icone} style={EstilosLogin.iconeInput} />
                <input
                  placeholder='Digite seu email'
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                  style={EstilosLogin.input}
                  type='email'
                />
              </div>

              <div style={EstilosLogin.grupoInput}>
                <MdLock size={20} color={coresLogin.icone} style={EstilosLogin.iconeInput} />
                <input
                  placeholder='Digite sua senha'
                  value={senha}
                  onChange={e=>setSenha(e.target.value)}
                  style={EstilosLogin.input}
                  type={mostrarSenha ? 'text' : 'password'}
                />
                <button type='button' onClick={()=>setMostrarSenha(s=>!s)} style={EstilosLogin.alternarVisibilidade}>
                  {mostrarSenha ? <MdVisibilityOff color={coresLogin.icone} /> : <MdVisibility color={coresLogin.icone} />}
                </button>
              </div>

              <div style={EstilosLogin.entreOpcoes}>
                <div style={EstilosLogin.containerCheckbox}>
                  <input type='checkbox' checked={lembrar} onChange={e=>setLembrar(e.target.checked)} />
                  <span style={EstilosLogin.rotuloCheckbox}>Lembrar-me</span>
                </div>
                <div style={EstilosLogin.esqueceuSenha}>Esqueceu sua senha?</div>
              </div>

              <button style={EstilosLogin.botaoEntrar} onClick={botaoEntrar} disabled={loading}>
                <span style={EstilosLogin.textoBotaoEntrar}>{loading ? 'Entrando...' : 'Entrar'}</span>
              </button>

              <div style={EstilosLogin.mensagemFeedback}>{mensagem}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
