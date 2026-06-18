import { StyleSheet } from 'react-native';

export const corFundoEscuro = '#020613';
export const corCard = '#081427';
export const corAzulPrincipal = '#0e4bcf';
export const corTextoClaro = '#ffffff';
export const corTextoMutado = '#c8d1e8';
export const corBordaInput = '#142240';
export const corFundoInput = '#07101f';

export const coresLogin = {
  icone: corTextoClaro,
  placeholder: corTextoClaro,
  gradienteFundo: ['#000000', '#041028', '#07172f']
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
    paddingVertical: 20,
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  iconeLogo: {
    width: 50,
    height: 50,
    marginRight: 15,
    resizeMode: 'contain',
  },
  nomeApp: {
    margin: 0,
    fontSize: 28,
    fontWeight: 'bold',
    color: corTextoClaro,
  },
  subtituloApp: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '300',
    color: corTextoClaro,
  },
  conteudoPrincipal: {
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
  },
  formularioLogin: {
    backgroundColor: corCard,
    paddingVertical: 30,
    paddingHorizontal: 25,
    borderRadius: 18,
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  titulo: {
    width: '100%',
    fontSize: 24,
    marginBottom: 25,
    color: corTextoClaro,
    fontWeight: '700',
    textAlign: 'left',
  },
  grupoInput: {
    position: 'relative',
    width: '100%',
    marginBottom: 20,
    justifyContent: 'center',
    backgroundColor: corFundoInput,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: corBordaInput,
  },
  iconeInput: {
    position: 'absolute',
    left: 12,
    color: corTextoMutado,
  },
  input: {
    width: '100%',
    paddingVertical: 14,
    paddingLeft: 42,
    paddingRight: 46,
    borderRadius: 10,
    fontSize: 16,
    color: corTextoClaro,
  },
  alternarVisibilidade: {
    position: 'absolute',
    right: 10,
    padding: 6,
  },
  entreOpcoes: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rotuloCheckbox: {
    color: corTextoClaro,
    fontSize: 14,
    marginLeft: 8,
  },
  esqueceuSenha: {
    fontSize: 14,
    color: corAzulPrincipal,
    fontWeight: '500',
  },
  mensagemFeedback: {
    width: '100%',
    minHeight: 22,
    marginTop: 14,
    color: '#ff6b6b',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  botaoEntrar: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: corAzulPrincipal,
  },
  textoBotao: {
    color: corTextoClaro,
    fontSize: 18,
    fontWeight: '700',
  },
});

export default EstilosLogin;