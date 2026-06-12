import { StyleSheet } from 'react-native';

const corFundoEscuro = '#0a0f1d';
const corTextoClaro = '#ffffff';
const corTextoMutado = '#8a99ad';
const corAzulPrincipal = '#1e90ff';

export const EstilosPrincipal = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: corFundoEscuro,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconeLogo: {
    width: 140,
    height: 140,
    marginBottom: 24,
    borderRadius: 24,
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
    color: corTextoMutado,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
  },
});

