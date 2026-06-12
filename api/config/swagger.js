const documentacao = {
  openapi: '3.0.3',
  info: {
    title: 'API Sistema Gerenciamento de Treinamento',
    description: 'Documentação completa da API de gerenciamento de treinamento com autenticação JWT',
    version: '1.0.0',
    contact: {
      name: 'Suporte',
      email: 'support@sistemadetreinamento.com'
    }
  },
  servers: [
    { url: 'https://api-murex-one-28.vercel.app', description: 'Produção' },
    { url: 'http://localhost:3000', description: 'Desenvolvimento' }
  ],
  tags: [
    { name: 'Usuários', description: 'Gerenciamento de usuários' },
    { name: 'Setores', description: 'Gerenciamento de setores' },
    { name: 'Treinamentos', description: 'Gerenciamento de treinamentos' },
    { name: 'Certificados', description: 'Gerenciamento de certificados' },
    { name: 'Classificação', description: 'Ranking e classificação de usuários' },
    { name: 'Dashboard', description: 'Métricas e estatísticas' }
  ],
  paths: {
    "/usuarios": {
      get: {
        tags: ["Usuários"],
        summary: "Listar todos os usuários",
        description: "Retorna lista de todos os usuários ativos do sistema",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Dados obtidos com sucesso!",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: '#/components/schemas/Listar_Usuarios' } }
              }
            }
          },
          401: { description: "Token não autenticado ou expirado" },
          500: { description: "Erro ao listar usuários" }
        }
      },
      post: {
        tags: ['Usuários'],
        summary: 'Cadastrar novo usuário',
        description: "Cria um novo usuário no sistema com nome, email, senha e tipo",
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/Cadastrar_Usuario" } }
          }
        },
        responses: {
          201: { description: "Usuário cadastrado com sucesso!" },
          500: { description: "Erro ao cadastrar usuário" }
        }
      }
    },
    "/usuarios/{id_usuario}": {
      put: {
        tags: ['Usuários'],
        summary: 'Atualizar todos os dados do usuário',
        description: 'Atualiza todos os dados de um usuário (PUT - requer todos os campos)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id_usuario", in: "path", required: true, description: "ID do usuário", schema: { type: 'integer', example: 1 } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Atualizar_Usuario" },
              example: { nome: "Ricardo Santos", email: "ricardo@example.com", senha: "novaSenha123", tipo_usuario: "admin" }
            }
          }
        },
        responses: {
          200: { description: "Usuário atualizado com sucesso!" },
          404: { description: "Usuário não encontrado" },
          500: { description: "Erro ao atualizar usuário" }
        }
      },
      patch: {
        tags: ['Usuários'],
        summary: 'Atualizar parcialmente dados do usuário',
        description: 'Atualiza apenas os campos enviados (PATCH - campos opcionais)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id_usuario", in: "path", required: true, description: "ID do usuário", schema: { type: 'integer', example: 1 } }],
        requestBody: {
          required: false,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Atualizar_Parcial_Usuario" },
              example: { nome: "Novo Nome" }
            }
          }
        },
        responses: {
          200: { description: "Usuário atualizado com sucesso" },
          404: { description: "Usuário não encontrado" },
          500: { description: "Erro ao atualizar usuário" }
        }
      },
      delete: {
        tags: ['Usuários'],
        summary: 'Desativar usuário',
        description: 'Desativa um usuário existente pelo ID (não deleta, apenas marca como inativo)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id_usuario", in: "path", required: true, description: "ID do usuário", schema: { type: 'integer', example: 1 } }],
        responses: {
          200: { description: "Usuário removido com sucesso!" },
          404: { description: "Usuário não encontrado" },
          500: { description: "Erro ao remover usuário" }
        }
      }
    },
    "/login": {
      post: {
        tags: ['Usuários'],
        summary: 'Realizar Login',
        description: "Autentica um usuário com email e senha, retornando um token JWT",
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/Login_Usuario" } }
          }
        },
        responses: {
          200: { description: "Login realizado com sucesso!", content: { "application/json": { schema: { $ref: "#/components/schemas/Resposta_Login" } } } },
          401: { description: "Email ou senha incorretos" },
          500: { description: "Erro interno no servidor" }
        }
      }
    },
    "/setores": {
      get: {
        tags: ["Setores"],
        summary: "Listar todos os setores",
        description: "Retorna lista de todos os setores cadastrados",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Dados obtidos com sucesso!", content: { "application/json": { schema: { type: "array", items: { $ref: '#/components/schemas/Listar_Setores' } } } } },
          401: { description: "Não autorizado" },
          500: { description: "Erro ao listar setores" }
        }
      },
      post: {
        tags: ['Setores'],
        summary: 'Cadastrar novo setor',
        description: "Cria um novo setor com nome, imagem e data de criação",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/Cadastrar_Setor" } }
          }
        },
        responses: {
          201: { description: "Setor cadastrado com sucesso!" },
          500: { description: "Erro ao cadastrar setor" }
        }
      }
    },
    "/setores/{id_setores}": {
      put: {
        tags: ['Setores'],
        summary: 'Atualizar todos os dados do setor',
        security: [{ bearerAuth: [] }],
        description: 'Atualiza todos os dados de um setor (PUT - requer todos os campos)',
        parameters: [{ name: "id_setores", in: "path", required: true, description: "ID do setor", schema: { type: 'integer', example: 1 } }],
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/Atualizar_Setor" }, example: { nome: "Recursos Humanos", imagem_url: "http://example.com/img.png", data_criacao: "2024-01-01" } }
          }
        },
        responses: {
          200: { description: "Setor atualizado com sucesso!" },
          404: { description: "Setor não encontrado" },
          500: { description: "Erro ao atualizar setor" }
        }
      },
      patch: {
        tags: ['Setores'],
        summary: 'Atualizar parcialmente dados do setor',
        description: 'Atualiza apenas os campos enviados (PATCH - campos opcionais)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id_setores", in: "path", required: true, description: "ID do setor", schema: { type: 'integer', example: 1 } }],
        requestBody: {
          required: false,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/Atualizar_Parcial_Setor" }, example: { nome: "Novo Nome" } }
          }
        },
        responses: {
          200: { description: "Setor atualizado com sucesso" },
          404: { description: "Setor não encontrado" },
          500: { description: "Erro ao atualizar setor" }
        }
      },
      delete: {
        tags: ['Setores'],
        summary: 'Deletar setor',
        security: [{ bearerAuth: [] }],
        description: 'Remove um setor existente pelo ID',
        parameters: [{ name: "id_setores", in: "path", required: true, description: "ID do setor", schema: { type: 'integer', example: 1 } }],
        responses: {
          200: { description: "Setor removido com sucesso!" },
          404: { description: "Setor não encontrado" },
          500: { description: "Erro ao remover setor" }
        }
      }
    },
    "/treinamentos": {
      get: {
        tags: ["Treinamentos"],
        summary: "Listar todos os treinamentos",
        description: "Retorna lista de todos os treinamentos cadastrados",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Dados obtidos com sucesso!", content: { "application/json": { schema: { type: "array", items: { $ref: '#/components/schemas/Listar_Treinamentos' } } } } },
          401: { description: "Não autorizado" },
          500: { description: "Erro ao listar treinamentos" }
        }
      },
      post: {
        tags: ['Treinamentos'],
        summary: 'Cadastrar novo treinamento',
        description: "Cria um novo treinamento associado a um setor",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/Cadastrar_Treinamento" } }
          }
        },
        responses: {
          201: { description: "Treinamento cadastrado com sucesso!" },
          500: { description: "Erro ao cadastrar treinamento" }
        }
      }
    },
    "/treinamentos/{id_treinamento}": {
      put: {
        tags: ['Treinamentos'],
        summary: 'Atualizar todos os dados do treinamento',
        description: 'Atualiza todos os dados de um treinamento (PUT - requer todos os campos)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id_treinamento", in: "path", required: true, description: "ID do treinamento", schema: { type: 'integer', example: 1 } }],
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/Atualizar_Treinamento" } }
          }
        },
        responses: {
          200: { description: "Treinamento atualizado com sucesso!" },
          404: { description: "Treinamento não encontrado" },
          500: { description: "Erro ao atualizar treinamento" }
        }
      },
      patch: {
        tags: ['Treinamentos'],
        summary: 'Atualizar parcialmente dados do treinamento',
        description: 'Atualiza apenas os campos enviados (PATCH - campos opcionais)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id_treinamento", in: "path", required: true, description: "ID do treinamento", schema: { type: 'integer', example: 1 } }],
        requestBody: {
          required: false,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/Atualizar_Parcial_Treinamento" }, example: { nome: "Novo Nome" } }
          }
        },
        responses: {
          200: { description: "Treinamento atualizado com sucesso" },
          404: { description: "Treinamento não encontrado" },
          500: { description: "Erro ao atualizar treinamento" }
        }
      },
      delete: {
        tags: ['Treinamentos'],
        summary: 'Deletar treinamento',
        description: 'Remove um treinamento existente pelo ID',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id_treinamento", in: "path", required: true, description: "ID do treinamento", schema: { type: 'integer', example: 1 } }],
        responses: {
          200: { description: "Treinamento removido com sucesso!" },
          404: { description: "Treinamento não encontrado" },
          500: { description: "Erro ao remover treinamento" }
        }
      }
    },
    "/certificados": {
      get: {
        tags: ["Certificados"],
        summary: "Listar todos os certificados",
        description: "Retorna lista de todos os certificados emitidos",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Dados obtidos com sucesso!", content: { "application/json": { schema: { type: "array", items: { $ref: '#/components/schemas/Listar_Certificados' } } } } },
          401: { description: "Não autorizado" },
          500: { description: "Erro ao listar certificados" }
        }
      },
      post: {
        tags: ['Certificados'],
        summary: 'Cadastrar novo certificado',
        description: "Cria um novo certificado para um usuário em um treinamento",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/Cadastrar_Certificado" } }
          }
        },
        responses: {
          201: { description: "Certificado cadastrado com sucesso!" },
          500: { description: "Erro ao cadastrar certificado" }
        }
      }
    },
    "/certificados/{id_certificados}": {
      put: {
        tags: ['Certificados'],
        summary: 'Atualizar todos os dados do certificado',
        description: 'Atualiza todos os dados de um certificado (PUT - requer todos os campos)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id_certificados", in: "path", required: true, description: "ID do certificado", schema: { type: 'integer', example: 1 } }],
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/Atualizar_Certificado" } }
          }
        },
        responses: {
          200: { description: "Certificado atualizado com sucesso!" },
          404: { description: "Certificado não encontrado" },
          500: { description: "Erro ao atualizar certificado" }
        }
      },
      patch: {
        tags: ['Certificados'],
        summary: 'Atualizar parcialmente dados do certificado',
        description: 'Atualiza apenas os campos enviados (PATCH - campos opcionais)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id_certificados", in: "path", required: true, description: "ID do certificado", schema: { type: 'integer', example: 1 } }],
        requestBody: {
          required: false,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/Atualizar_Parcial_Certificado" }, example: { valido: "2025-12-31" } }
          }
        },
        responses: {
          200: { description: "Certificado atualizado com sucesso" },
          404: { description: "Certificado não encontrado" },
          500: { description: "Erro ao atualizar certificado" }
        }
      },
      delete: {
        tags: ['Certificados'],
        summary: 'Deletar certificado',
        description: 'Remove um certificado existente pelo ID',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id_certificados", in: "path", required: true, description: "ID do certificado", schema: { type: 'integer', example: 1 } }],
        responses: {
          200: { description: "Certificado removido com sucesso!" },
          404: { description: "Certificado não encontrado" },
          500: { description: "Erro ao remover certificado" }
        }
      }
    },
    "/classificacao": {
      get: {
        tags: ["Classificação"],
        summary: "Obter classificação dos usuários",
        description: "Retorna ranking de usuários com quantidade de treinamentos completados",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Dados obtidos com sucesso!",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: '#/components/schemas/Classificacao_Usuario' } }
              }
            }
          },
          401: { description: "Não autorizado" },
          500: { description: "Erro ao obter classificação" }
        },
      }
    },
    "/dashboard": {
      get: {
        tags: ["Dashboard"],
        summary: "Obter dados para dashboard",
        description: "Retorna métricas agregadas e informações para o painel administrativo",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Dados obtidos com sucesso!",
            content: {
              "application/json": {
                schema: { $ref: '#/components/schemas/Dashboard' }
              }
            }
          },
          401: { description: "Não autorizado" },
          500: { description: "Erro ao obter dados do dashboard" }
        },
      }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Insira o token JWT obtido no login. Exemplo: seu_token_aqui'
      }
    },
    schemas: {
      Login_Usuario: {
        type: 'object',
        required: ['email', 'senha'],
        properties: {
          email: { type: "string", example: "usuario@example.com", description: "Email do usuário" },
          senha: { type: "string", example: "Senha123", description: "Senha do usuário" }
        }
      },
      Resposta_Login: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Login realizado', description: 'Mensagem de sucesso' },
          token: { type: 'string', description: 'Token JWT para autenticação', example: 'eyJhbGciOiJIUzI1Ni...' },
          usuario: {
            type: 'object',
            properties: {
              id_usuario: { type: "integer", example: 1 },
              nome: { type: "string", example: 'João Silva' },
              email: { type: "string", example: "joao@example.com" }
            }
          }
        }
      },
      Listar_Usuarios: {
        type: 'object',
        properties: {
          id_usuario: { type: "integer", example: 1, description: "ID único do usuário" },
          nome: { type: "string", example: "Ricardo", description: "Nome do usuário" },
          email: { type: "string", example: "ricardo@email.com", description: "Email do usuário" },
          tipo_usuario: { type: "string", example: "admin", description: "Tipo de usuário (admin, comum)" },
          ativo: { type: "boolean", example: true, description: "Status do usuário" }
        }
      },
      Cadastrar_Usuario: {
        type: 'object',
        required: ["nome", "email", "senha", "tipo_usuario"],
        properties: {
          nome: { type: "string", example: "Ricardo", description: "Nome do usuário" },
          email: { type: "string", example: "ricardo2@email.com", description: "Email único do usuário" },
          senha: { type: "string", example: "Senha123", description: "Senha criptografada" },
          tipo_usuario: { type: 'string', example: 'comum', description: "Tipo de usuário", enum: ['admin', 'comum'] }
        }
      },
      Atualizar_Usuario: {
        type: 'object',
        required: ["nome", "email", "senha", "tipo_usuario"],
        properties: {
          nome: { type: "string", example: "Nina", description: "Nome atualizado" },
          email: { type: "string", example: "nina@email.com", description: "Email atualizado" },
          senha: { type: "string", example: "Senha123", description: "Senha atualizada" },
          tipo_usuario: { type: 'string', example: 'admin', description: "Tipo de usuário atualizado" }
        }
      },
      Atualizar_Parcial_Usuario: {
        type: 'object',
        properties: {
          nome: { type: "string", description: "Nome do usuário (opcional)" },
          email: { type: "string", description: "Email do usuário (opcional)" },
          senha: { type: "string", description: "Senha do usuário (opcional)" },
          tipo_usuario: { type: 'string', description: "Tipo de usuário (opcional)" }
        }
      },
      Listar_Setores: {
        type: 'object',
        properties: {
          id_setores: { type: "integer", example: 1, description: "ID único do setor" },
          nome: { type: "string", example: "Recursos Humanos", description: "Nome do setor" },
          imagem_url: { type: "string", example: "http://example.com/imagem.png", description: "URL da imagem do setor" },
          data_criacao: { type: "string", format: "date", example: "2024-01-01", description: "Data de criação do setor" }
        }
      },
      Cadastrar_Setor: {
        type: 'object',
        required: ["nome"],
        properties: {
          nome: { type: "string", example: "Recursos Humanos", description: "Nome do setor" },
          imagem_url: { type: "string", example: "http://example.com/imagem.png", description: "URL da imagem (opcional)" },
          data_criacao: { type: "string", format: "date", example: "2024-01-01", description: "Data de criação (opcional)" }
        }
      },
      Atualizar_Setor: {
        type: 'object',
        required: ["nome"],
        properties: {
          nome: { type: "string", example: "Recursos Humanos", description: "Nome atualizado" },
          imagem_url: { type: "string", example: "http://example.com/imagem.png", description: "URL da imagem atualizada" },
          data_criacao: { type: "string", format: "date", example: "2024-01-01", description: "Data de criação atualizada" }
        }
      },
      Atualizar_Parcial_Setor: {
        type: 'object',
        properties: {
          nome: { type: "string", description: "Nome do setor (opcional)" },
          imagem_url: { type: "string", description: "URL da imagem (opcional)" },
          data_criacao: { type: "string", format: "date", description: "Data de criação (opcional)" }
        }
      },
      Listar_Treinamentos: {
        type: 'object',
        properties: {
          id_treinamento: { type: 'integer', example: 1, description: "ID único do treinamento" },
          nome: { type: 'string', example: 'Treinamento Básico', description: "Nome do treinamento" },
          descricao: { type: 'string', example: 'Descrição do treinamento', description: "Descrição detalhada" },
          data_criacao: { type: 'string', format: 'date', example: '2024-01-01', description: "Data de criação" },
          obrigatorio: { type: 'string', example: 'sim', description: "Treinamento obrigatório?" },
          id_setor: { type: 'integer', example: 1, description: "ID do setor associado" }
        }
      },
      Cadastrar_Treinamento: {
        type: 'object',
        required: ["nome", "id_setor"],
        properties: {
          nome: { type: 'string', example: 'Treinamento Básico', description: "Nome do treinamento" },
          descricao: { type: 'string', example: 'Descrição', description: "Descrição (opcional)" },
          data_criacao: { type: 'string', format: 'date', example: '2024-01-01', description: "Data de criação (opcional)" },
          obrigatorio: { type: 'string', example: 'sim', description: "Obrigatório? (sim/não)" },
          id_setor: { type: 'integer', example: 1, description: "ID do setor associado" }
        }
      },
      Atualizar_Treinamento: {
        type: 'object',
        required: ["nome", "descricao", "data_criacao", "obrigatorio", "id_setor"],
        properties: {
          nome: { type: 'string', description: "Nome do treinamento" },
          descricao: { type: 'string', description: "Descrição do treinamento" },
          data_criacao: { type: 'string', format: 'date', description: "Data de criação" },
          obrigatorio: { type: 'string', description: "Obrigatório?" },
          id_setor: { type: 'integer', description: "ID do setor" }
        }
      },
      Atualizar_Parcial_Treinamento: {
        type: 'object',
        properties: {
          nome: { type: 'string', description: "Nome do treinamento (opcional)" },
          descricao: { type: 'string', description: "Descrição (opcional)" },
          data_criacao: { type: 'string', format: 'date', description: "Data de criação (opcional)" },
          obrigatorio: { type: 'string', description: "Obrigatório? (opcional)" },
          id_setor: { type: 'integer', description: "ID do setor (opcional)" }
        }
      },
      Listar_Certificados: {
        type: 'object',
        properties: {
          id_certificados: { type: 'integer', example: 1, description: "ID único do certificado" },
          nome: { type: 'string', example: 'Certificado XYZ', description: "Nome do certificado" },
          tipo: { type: 'string', example: 'P', description: "Tipo de certificado" },
          arquivo_url: { type: 'string', example: 'http://example.com/cert.pdf', description: "URL do arquivo" },
          data_emissao: { type: 'string', format: 'date', example: '2024-06-01', description: "Data de emissão" },
          valido: { type: 'string', format: 'date', example: '2025-06-01', description: "Data de validade" },
          id_usuario: { type: 'integer', example: 1, description: "ID do usuário" },
          id_treinamento: { type: 'integer', example: 1, description: "ID do treinamento" }
        }
      },
      Cadastrar_Certificado: {
        type: 'object',
        required: ["nome", "id_usuario", "id_treinamento"],
        properties: {
          nome: { type: 'string', example: 'Certificado XYZ', description: "Nome do certificado" },
          tipo: { type: 'string', example: 'P', description: "Tipo (opcional)" },
          arquivo_url: { type: 'string', example: 'http://example.com/cert.pdf', description: "URL do arquivo (opcional)" },
          data_emissao: { type: 'string', format: 'date', example: '2024-06-01', description: "Data de emissão (opcional)" },
          valido: { type: 'string', format: 'date', example: '2025-06-01', description: "Data de validade (opcional)" },
          id_usuario: { type: 'integer', example: 1, description: "ID do usuário" },
          id_treinamento: { type: 'integer', example: 1, description: "ID do treinamento" }
        }
      },
      Atualizar_Certificado: {
        type: 'object',
        required: ["nome", "tipo", "arquivo_url", "data_emissao", "valido", "id_usuario", "id_treinamento"],
        properties: {
          nome: { type: 'string', description: "Nome do certificado" },
          tipo: { type: 'string', description: "Tipo" },
          arquivo_url: { type: 'string', description: "URL do arquivo" },
          data_emissao: { type: 'string', format: 'date', description: "Data de emissão" },
          valido: { type: 'string', format: 'date', description: "Data de validade" },
          id_usuario: { type: 'integer', description: "ID do usuário" },
          id_treinamento: { type: 'integer', description: "ID do treinamento" }
        }
      },
      Atualizar_Parcial_Certificado: {
        type: 'object',
        properties: {
          nome: { type: 'string', description: "Nome do certificado (opcional)" },
          tipo: { type: 'string', description: "Tipo (opcional)" },
          arquivo_url: { type: 'string', description: "URL do arquivo (opcional)" },
          data_emissao: { type: 'string', format: 'date', description: "Data de emissão (opcional)" },
          valido: { type: 'string', format: 'date', description: "Data de validade (opcional)" },
          id_usuario: { type: 'integer', description: "ID do usuário (opcional)" },
          id_treinamento: { type: 'integer', description: "ID do treinamento (opcional)" }
        }
      },
      Classificacao_Usuario: {
        type: 'object',
        properties: {
          id_usuario: { type: 'integer', example: 1, description: "ID do usuário" },
          nome_usuario: { type: 'string', example: 'João Silva', description: "Nome do usuário" },
          quantidade_treinamentos: { type: 'integer', example: 5, description: "Quantidade de treinamentos completados" }
        }
      },
      Dashboard: {
        type: 'object',
        properties: {
          totalUsuarios: { type: 'integer', example: 10, description: "Total de usuários ativos" },
          totalSetores: { type: 'integer', example: 5, description: "Total de setores" },
          totalTreinamentos: { type: 'integer', example: 20, description: "Total de treinamentos" },
          totalCertificados: { type: 'integer', example: 15, description: "Total de certificados emitidos" },
          treinamentosPorSetor: { type: 'array', items: { type: 'object', properties: { id_setores: { type: 'integer' }, nome: { type: 'string' }, total: { type: 'integer' } } }, description: "Treinamentos por setor" },
          certificadosPorTreinamento: { type: 'array', items: { type: 'object', properties: { id_treinamento: { type: 'integer' }, nome: { type: 'string' }, total: { type: 'integer' } } }, description: "Certificados por treinamento" },
          ultimosUsuarios: { type: 'array', items: { type: 'object' }, description: "Últimos usuários cadastrados" },
          ultimosCertificados: { type: 'array', items: { type: 'object' }, description: "Últimos certificados emitidos" }
        }
      }
    }
  }
}

export default documentacao;