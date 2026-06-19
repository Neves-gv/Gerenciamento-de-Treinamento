import { StyleSheet } from 'react-native';

const corFundoEscuro = '#020613';
const corCard = '#081427';
const corTextoClaro = '#ffffff';
const corTextoMutado = '#c8d1e8';
const corAzulPrincipal = '#0e4bcf';

export const EstilosPrincipal = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: corFundoEscuro,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    width: '100%',
  },
  painel: {
    width: '100%',
    maxWidth: 540,
    backgroundColor: corCard,
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#24304a',
    paddingBottom: 16,
  },
  headerInfo: {
    flex: 1,
  },
  usuarioText: {
    fontSize: 18,
    color: corTextoClaro,
    fontWeight: '700',
  },
  tipoText: {
    fontSize: 14,
    color: corTextoMutado,
    marginTop: 4,
  },
  logoutButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: corAzulPrincipal,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: corTextoClaro,
    fontSize: 14,
    fontWeight: '700',
  },
  iconeLogo: {
    width: 200,
    height: 80,
    marginBottom: 24,
    borderRadius: 16,
    resizeMode: 'contain',
    backgroundColor: '#0f172a',
    padding: 12,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: corTextoClaro,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: corTextoClaro,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 340,
    marginBottom: 20,
  },
  saudacaoCard: {
    width: '100%',
    backgroundColor: '#0d1221',
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
  },
  saudacaoTitulo: {
    fontSize: 22,
    fontWeight: '700',
    color: corTextoClaro,
    marginBottom: 8,
  },
  saudacaoTexto: {
    fontSize: 16,
    color: corTextoMutado,
    textAlign: 'center',
    lineHeight: 24,
  },
});

