const corFundoEscuro = '#0a0f1d';
const corTextoClaro = '#ffffff';
const corTextoMutado = '#8a99ad';
const corAzulPrincipal = '#1e90ff';

export const EstilosPrincipal = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 24px',
    backgroundColor: corFundoEscuro,
    color: corTextoClaro,
    gap: '16px',
    textAlign: 'center',
  },
  iconeLogo: {
    width: '160px',
    height: '160px',
    objectFit: 'contain',
    marginBottom: '24px',
    borderRadius: '24px',
    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.35)',
    backgroundColor: '#0f172a',
    padding: '16px',
  },
  titulo: {
    fontSize: '2.4rem',
    fontWeight: 700,
    margin: 0,
    letterSpacing: '0.03em',
  },
  subtitulo: {
    fontSize: '1rem',
    color: corTextoMutado,
    margin: 0,
    maxWidth: '420px',
    lineHeight: 1.7,
  },
};

