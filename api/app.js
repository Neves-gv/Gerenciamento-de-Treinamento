import express from 'express';
import { BD, testarConexao } from './db.js';
import rotasUsuarios from './src/routes/RotasUsuarios.js';
import rotasTreinamento from './src/routes/RotasTreinamento.js';
import rotasCertificados from './src/routes/RotasCertificados.js';
import rotasSetores from './src/routes/RotasSetores.js';
import rotasDashboard from './src/routes/Dashbord.js';
import rotasClassificacao from './src/routes/RotasClassificacao.js';

// usando swagger
import swaggerUi from 'swagger-ui-express';
import documentacao from './config/swagger.js';
import cors from 'cors'

const app = express();
app.use(express.json());
// app.use('/swagger', swaggerUi.serve, swaggerUi.setup(documentacao))
app.use(cors())

// Adicione:
app.get('/swagger', (req, res) => {
    res.send(`<!DOCTYPE html>
<html><head>
  <title>API Gerenciamento de Treinamento</title>
  <meta charset="utf-8"/>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css">
</head><body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
  <script>
    SwaggerUIBundle({
      spec: ${JSON.stringify(documentacao)},
      dom_id: '#swagger-ui'})
  </script>
</body></html>`);
});

app.get('/', async (req, res) => {
    await testarConexao();
    // redireciona para a documentação Swagger
    return res.redirect('/swagger');
})

//Utilizando rotas
app.use(rotasUsuarios);
app.use(rotasTreinamento);
app.use(rotasCertificados);
app.use(rotasSetores);
app.use(rotasDashboard);
app.use(rotasClassificacao);

const porta = 3000;
app.listen(porta, () => {
    console.log(`http://localhost:${porta}`);
});
