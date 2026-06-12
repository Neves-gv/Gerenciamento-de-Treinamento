import { StyleSheet } from 'react-native';

const corFundoEscuro = '#020613';
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
    color: corTextoClaro,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
  },
});

