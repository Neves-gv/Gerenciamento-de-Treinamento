import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";
const router = Router();

// ================= LISTAR SETORES =================
router.get('/setores', autenticarToken, async (req, res) => {
    try {
        const query = `SELECT * FROM setores ORDER BY id_setores`;
        const setores = await BD.query(query);
        return res.status(200).json(setores.rows);
    } catch (error) {
        console.error('Erro ao listar setores', error.message);
        return res.status(500).json({ error: 'Erro ao listar setores' })
    }
});

// ================= CADASTRAR SETOR =================
router.post('/setores', autenticarToken, async (req, res) => {
    const { nome, imagem_url, data_criacao } = req.body;
    try {
        const comando = `INSERT INTO setores(nome, imagem_url, data_criacao) VALUES($1, $2, $3)`;
        const valores = [nome, imagem_url, data_criacao];
        await BD.query(comando, valores);
        return res.status(201).json('Setor cadastrado.');
    } catch (error) {
        console.error('Erro ao cadastrar setor', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar setor' })
    }
});

// ================= ATUALIZAR SETOR =================
router.put('/setores/:id_setores', autenticarToken, async (req, res) => {
    const { id_setores } = req.params;
    const { nome, imagem_url, data_criacao } = req.body;
    try {
        const verificar = await BD.query(`SELECT * FROM setores WHERE id_setores = $1`, [id_setores]);
        if (verificar.rows.length === 0) {
            return res.status(404).json({ message: 'Setor não encontrado' })
        }

        const comando = `UPDATE setores SET nome = $1, imagem_url = $2, data_criacao = $3 WHERE id_setores = $4`;
        const valores = [nome, imagem_url, data_criacao, id_setores];
        await BD.query(comando, valores);
        return res.status(200).json('Setor atualizado.');
    } catch (error) {
        console.error('Erro ao atualizar setor', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar setor' })
    }
});

// ================= PATCH =================
router.patch('/setores/:id_setores', autenticarToken, async (req, res) => {
    const { id_setores } = req.params;
    const { nome, imagem_url, data_criacao } = req.body;
    try {
        const verificar = await BD.query(`SELECT * FROM setores WHERE id_setores = $1`, [id_setores]);
        if (verificar.rows.length === 0) {
            return res.status(404).json({ message: 'Setor não encontrado' });
        }

        const campos = [];
        const valores = [];
        let contador = 1;

        if (nome !== undefined) { campos.push(`nome = $${contador}`); valores.push(nome); contador++; }
        if (imagem_url !== undefined) { campos.push(`imagem_url = $${contador}`); valores.push(imagem_url); contador++; }
        if (data_criacao !== undefined) { campos.push(`data_criacao = $${contador}`); valores.push(data_criacao); contador++; }

        if (campos.length === 0) {
            return res.status(400).json({ message: 'Nenhum campo a atualizar' });
        }

        valores.push(id_setores);
        const comando = `UPDATE setores SET ${campos.join(', ')} WHERE id_setores = $${contador}`;
        await BD.query(comando, valores);
        return res.status(200).json('Setor atualizado com sucesso');
    } catch (error) {
        console.error('Erro ao atualizar setor', error.message);
        return res.status(500).json({ message: 'Erro interno do servidor: ' + error.message })
    }
});

// ================= DELETE =================
router.delete('/setores/:id_setores', autenticarToken, async (req, res) => {
    const { id_setores } = req.params;
    try {
        const comando = `DELETE FROM setores WHERE id_setores = $1`;
        await BD.query(comando, [id_setores]);
        return res.status(200).json({ message: 'Setor removido com sucesso' });
    } catch (error) {
        console.error('Erro ao remover setor', error.message);
        return res.status(500).json({ message: 'Erro interno do servidor: ' + error.message })
    }
});

export default router;