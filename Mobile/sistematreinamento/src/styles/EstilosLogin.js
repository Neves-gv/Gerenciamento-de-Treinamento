import { StyleSheet } from 'react-native';

const corFundoEscuro = '#0a0f1d';
const corCard = '#151c2c';
const corAzulPrincipal = '#1e90ff';
const corTextoClaro = '#ffffff';
const corTextoMutado = '#8a99ad';
const corBordaInput = '#222f44';
const corFundoInput = '#111827';

export const coresLogin = {
  icone: corTextoMutado,
  placeholder: corTextoMutado,
  gradienteFundo: ['#000000', '#0a1931', '#0052d4']
};

export const EstilosLogin = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: corFundoEscuro,
  },
  gradiente: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  containerTeclado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30
  },
  iconeLogo: {
    width: 50,
    height: 50,
    marginRight: 15
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
    maxWidth: 400,
    alignItems: 'center'
  },
  formularioLogin: {
    backgroundColor: corCard,
    paddingVertical: 30,
    paddingHorizontal: 25,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6
  },
  titulo: {
    fontSize: 24,
    marginBottom: 25,
    color: corTextoClaro,
    fontWeight: '600',
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
    borderColor: corBordaInput
  },
  iconeInput: {
    position: 'absolute',
    left: 12,
    color: corTextoMutado
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingLeft: 40,
    paddingRight: 42,
    borderRadius: 8,
    fontSize: 16,
    color: corTextoClaro
  },
  alternarVisibilidade: {
    position: 'absolute',
    right: 10,
    padding: 5
  },
  entreOpcoes: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  containerCheckbox: {
    flexDirection: 'row',
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
    fontWeight: '500'
  },
  mensagemFeedback: {
    width: '100%',
    minHeight: 22,
    marginTop: 14,
    color: '#ff4d4d',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center'
  },
  botaoEntrar: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: corAzulPrincipal
  },
  textoBotaoEntrar: {
    color: corTextoClaro,
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default EstilosLogin;