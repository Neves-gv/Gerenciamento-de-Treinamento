import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { EstilosPrincipal } from '../styles/EstilosPrincipal.js';

export default function Principal() {
  const [dadosLogin, setDadosLogin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const buscarUsuario = () => {
      const usuarioLogado = localStorage.getItem('UsuarioLogado');
      if (!usuarioLogado) {
        navigate('/');
        return;
      }
      try {
        setDadosLogin(JSON.parse(usuarioLogado));
      } catch (error) {
        console.error('Erro ao ler usuário logado:', error);
        navigate('/');
      }
    };
    buscarUsuario();
  }, [navigate]);

  const botaoLogout = () => {
    localStorage.removeItem('UsuarioLogado');
    setDadosLogin(null);
    navigate('/');
  };

  return (
    <div style={EstilosPrincipal.container}>
      <div style={EstilosPrincipal.painel}>
        <div style={EstilosPrincipal.headerPanel}>
          <button onClick={botaoLogout} style={EstilosPrincipal.link}>
            Sair
          </button>
        </div>

        <img src={logo} alt="Logo" style={EstilosPrincipal.iconeLogo} />
        <div style={EstilosPrincipal.saudacaoCard}>
          <h1 style={EstilosPrincipal.titulo}>Gerenciamento de Treinamento</h1>
          <p style={EstilosPrincipal.subtitulo}>Bem-vindo ao painel principal</p>
          <div>
            <h2 style={EstilosPrincipal.saudacaoTitulo}>Acompanhe seus treinamentos</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
