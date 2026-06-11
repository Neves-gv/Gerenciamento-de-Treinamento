import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();

// Endpoint do Dashboard: retorna métricas agregadas para o frontend
router.get('/dashboard', autenticarToken, async (req, res) => {
  try {
    const qTotalUsuarios = `SELECT COUNT(*)::int AS total FROM usuarios WHERE ativo = true`;
    const qTotalSetores = `SELECT COUNT(*)::int AS total FROM setores`;
    const qTotalTreinamentos = `SELECT COUNT(*)::int AS total FROM treinamento`;
    const qTotalCertificados = `SELECT COUNT(*)::int AS total FROM certificados`;

    const qTreinamentosPorSetor = `
      SELECT s.id_setores, s.nome, COUNT(t.id_treinamento)::int AS total
      FROM setores s
      LEFT JOIN treinamento t ON s.id_setores = t.id_setor
      GROUP BY s.id_setores, s.nome
      ORDER BY total DESC
    `;

    const qCertificadosPorTreinamento = `
      SELECT tr.id_treinamento, tr.nome, COUNT(c.id_certificados)::int AS total
      FROM treinamento tr
      LEFT JOIN certificados c ON tr.id_treinamento = c.id_treinamento
      GROUP BY tr.id_treinamento, tr.nome
      ORDER BY total DESC
    `;

    const qUltimosUsuarios = `
      SELECT id_usuario, nome, email
      FROM usuarios
      WHERE ativo = true
      ORDER BY id_usuario DESC
      LIMIT 5
    `;

    const qUltimosCertificados = `
      SELECT id_certificados, nome, tipo, arquivo_url, TO_CHAR(data_emissao, 'YYYY-MM-DD') AS data_emissao
      FROM certificados
      ORDER BY data_emissao DESC NULLS LAST
      LIMIT 5
    `;

    const [resU, resS, resT, resC, resTrSetor, resCertTrein, resUltUsuarios, resUltCerts] = await Promise.all([
      BD.query(qTotalUsuarios),
      BD.query(qTotalSetores),
      BD.query(qTotalTreinamentos),
      BD.query(qTotalCertificados),
      BD.query(qTreinamentosPorSetor),
      BD.query(qCertificadosPorTreinamento),
      BD.query(qUltimosUsuarios),
      BD.query(qUltimosCertificados)
    ]);

    const dados = {
      totalUsuarios: resU.rows[0]?.total || 0,
      totalSetores: resS.rows[0]?.total || 0,
      totalTreinamentos: resT.rows[0]?.total || 0,
      totalCertificados: resC.rows[0]?.total || 0,
      treinamentosPorSetor: resTrSetor.rows,
      certificadosPorTreinamento: resCertTrein.rows,
      ultimosUsuarios: resUltUsuarios.rows,
      ultimosCertificados: resUltCerts.rows
    };

    return res.status(200).json(dados);
  } catch (error) {
    console.error('Erro dashboard:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

export default router;