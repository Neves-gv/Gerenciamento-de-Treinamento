import {
  corFundoEscuro,
  corCard,
  corAzulPrincipal,
  corTextoClaro,
  corTextoMutado,
  corBordaInput,
  corFundoInput,
  coresLogin
} from './Estilos'

export const EstilosLogin = {
  container: {
    minHeight: '100vh',
    backgroundColor: corFundoEscuro,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  gradiente: {
    width: '100%',
    maxWidth: 980,
    borderRadius: 12,
    padding: 20,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cabecalho: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 30
  },
  iconeLogo: {
    width: 50,
    height: 50,
    marginRight: 15,
    objectFit: 'contain'
  },
  nomeApp: {
    margin: 0,
    fontSize: 29,
    fontWeight: 'bold',
    color: corTextoClaro
  },
  subtituloApp: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: '300',
    color: corTextoMutado
  },
  conteudoPrincipal: {
    width: '100%',
    maxWidth: 420,
    display: 'flex',
    justifyContent: 'center'
  },
  formularioLogin: {
    backgroundColor: corCard,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 15,
    width: '100%',
    boxSizing: 'border-box',
    alignItems: 'center',
    marginBottom: 30,
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
  },
  titulo: {
    fontSize: 24,
    marginBottom: 25,
    color: corTextoClaro,
    fontWeight: 600,
    textAlign: 'center'
  },
  grupoInput: {
    position: 'relative',
    width: '100%',
    marginBottom: 20,
    justifyContent: 'center',
    backgroundColor: corFundoInput,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: corBordaInput,
    display: 'flex',
    alignItems: 'center'
  },
  iconeInput: {
    position: 'absolute',
    left: 12,
    color: corTextoMutado
  },
  input: {
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 40,
    paddingRight: 42,
    borderRadius: 8,
    fontSize: 16,
    color: corTextoClaro,
    background: 'transparent',
    border: 'none',
    outline: 'none'
  },
  alternarVisibilidade: {
    position: 'absolute',
    right: 10,
    padding: 6,
    background: 'transparent',
    border: 'none',
    color: corTextoMutado,
    cursor: 'pointer'
  },
  entreOpcoes: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  containerCheckbox: {
    display: 'flex',
    alignItems: 'center'
  },
  rotuloCheckbox: {
    color: corTextoMutado,
    fontSize: 14,
    marginLeft: 6
  },
  esqueceuSenha: {
    fontSize: 14,
    color: corAzulPrincipal,
    fontWeight: 500,
    cursor: 'pointer'
  },
  mensagemFeedback: {
    width: '100%',
    minHeight: 22,
    marginTop: 14,
    color: '#ff4d4d',
    fontSize: 14,
    fontWeight: 500,
    textAlign: 'center'
  },
  botaoEntrar: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: corAzulPrincipal,
    color: corTextoClaro,
    border: 'none',
    cursor: 'pointer'
  },
  textoBotaoEntrar: {
    color: corTextoClaro,
    fontSize: 18,
    fontWeight: 'bold'
  }
}

export default EstilosLogin

export { coresLogin }
