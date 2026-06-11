import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";
const router = Router();

// ================= LISTAR TREINAMENTOS =================
router.get('/treinamentos', autenticarToken, async (req, res) => {
    try {
        const query = `SELECT * FROM treinamento ORDER BY id_treinamento`;
        const treinamentos = await BD.query(query);
        return res.status(200).json(treinamentos.rows);
    } catch (error) {
        console.error('Erro ao listar treinamentos', error.message);
        return res.status(500).json({ error: 'Erro ao listar treinamentos' })
    }
});

// ================= CADASTRAR TREINAMENTO =================
router.post('/treinamentos', autenticarToken, async (req, res) => {
    const { nome, descricao, data_criacao, obrigatorio, id_setor } = req.body;
    try {
        const comando = `INSERT INTO treinamento(nome, descricao, data_criacao, obrigatorio, id_setor) VALUES($1, $2, $3, $4, $5)`;
        const valores = [nome, descricao, data_criacao, obrigatorio, id_setor];
        await BD.query(comando, valores);
        return res.status(201).json('Treinamento cadastrado.');
    } catch (error) {
        console.error('Erro ao cadastrar treinamento', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar treinamento' })
    }
});

// ================= ATUALIZAR TREINAMENTO =================
router.put('/treinamentos/:id_treinamento', autenticarToken, async (req, res) => {
    const { id_treinamento } = req.params;
    const { nome, descricao, data_criacao, obrigatorio, id_setor } = req.body;
    try {
        const verificar = await BD.query(`SELECT * FROM treinamento WHERE id_treinamento = $1`, [id_treinamento]);
        if (verificar.rows.length === 0) {
            return res.status(404).json({ message: 'Treinamento não encontrado' })
        }

        const comando = `UPDATE treinamento SET nome = $1, descricao = $2, data_criacao = $3, obrigatorio = $4, id_setor = $5 WHERE id_treinamento = $6`;
        const valores = [nome, descricao, data_criacao, obrigatorio, id_setor, id_treinamento];
        await BD.query(comando, valores);
        return res.status(200).json('Treinamento atualizado.');
    } catch (error) {
        console.error('Erro ao atualizar treinamento', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar treinamento' })
    }
});

// ================= PATCH =================
router.patch('/treinamentos/:id_treinamento', autenticarToken, async (req, res) => {
    const { id_treinamento } = req.params;
    const { nome, descricao, data_criacao, obrigatorio, id_setor } = req.body;
    try {
        const verificar = await BD.query(`SELECT * FROM treinamento WHERE id_treinamento = $1`, [id_treinamento]);
        if (verificar.rows.length === 0) {
            return res.status(404).json({ message: 'Treinamento não encontrado' });
        }

        const campos = [];
        const valores = [];
        let contador = 1;

        if (nome !== undefined) { campos.push(`nome = $${contador}`); valores.push(nome); contador++; }
        if (descricao !== undefined) { campos.push(`descricao = $${contador}`); valores.push(descricao); contador++; }
        if (data_criacao !== undefined) { campos.push(`data_criacao = $${contador}`); valores.push(data_criacao); contador++; }
        if (obrigatorio !== undefined) { campos.push(`obrigatorio = $${contador}`); valores.push(obrigatorio); contador++; }
        if (id_setor !== undefined) { campos.push(`id_setor = $${contador}`); valores.push(id_setor); contador++; }

        if (campos.length === 0) {
            return res.status(400).json({ message: 'Nenhum campo a atualizar' });
        }

        valores.push(id_treinamento);
        const comando = `UPDATE treinamento SET ${campos.join(', ')} WHERE id_treinamento = $${contador}`;
        await BD.query(comando, valores);
        return res.status(200).json('Treinamento atualizado com sucesso');
    } catch (error) {
        console.error('Erro ao atualizar treinamento', error.message);
        return res.status(500).json({ message: 'Erro interno do servidor: ' + error.message })
    }
});

// ================= DELETE =================
router.delete('/treinamentos/:id_treinamento', autenticarToken, async (req, res) => {
    const { id_treinamento } = req.params;
    try {
        const comando = `DELETE FROM treinamento WHERE id_treinamento = $1`;
        await BD.query(comando, [id_treinamento]);
        return res.status(200).json({ message: 'Treinamento removido com sucesso' });
    } catch (error) {
        console.error('Erro ao remover treinamento', error.message);
        return res.status(500).json({ message: 'Erro interno do servidor: ' + error.message })
    }
});

export default router;
