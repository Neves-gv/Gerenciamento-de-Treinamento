import logo from '../assets/logo.png';
import { EstilosPrincipal } from '../styles/EstilosPrincipal.js';

export default function Principal() {
  return (
    <div style={EstilosPrincipal.container}>
      <img src={logo} alt="Logo" style={EstilosPrincipal.iconeLogo} />
      <h1 style={EstilosPrincipal.titulo}>Gerenciamento de Treinamento</h1>
      <p style={EstilosPrincipal.subtitulo}>Bem-vindo ao painel principal</p>
    </div>
  );
}
