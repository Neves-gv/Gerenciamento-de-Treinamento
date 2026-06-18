import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();

router.get('/classificacao', autenticarToken, async (req, res) => {
    try {
        const comando = `
            SELECT 
                u.id_usuario,
                u.nome AS nome_usuario,
                COUNT(c.id_certificados) AS quantidade_treinamentos
            FROM usuarios u
            LEFT JOIN certificados c ON u.id_usuario = c.id_usuario
            GROUP BY u.id_usuario, u.nome
            ORDER BY quantidade_treinamentos DESC;
        `;
        
        const resultado = await BD.query(comando);

        return res.status(200).json(resultado.rows);

    } catch (error) {
        return res.status(500).json({ error: 'Erro interno no servidor', "error.message": error.message });
    }
});

export default router;