import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";
const router = Router();

// ================= LISTAR CERTIFICADOS =================
router.get('/certificados', autenticarToken, async (req, res) => {
    try {
        const query = `SELECT * FROM certificados ORDER BY id_certificados`;
        const certificados = await BD.query(query);
        return res.status(200).json(certificados.rows);
    } catch (error) {
        console.error('Erro ao listar certificados', error.message);
        return res.status(500).json({ error: 'Erro ao listar certificados' })
    }
});

// ================= CADASTRAR CERTIFICADO =================
router.post('/certificados', autenticarToken, async (req, res) => {
    const { nome, tipo, arquivo_url, data_emissao, valido, id_usuario, id_treinamento } = req.body;
    try {
        const comando = `INSERT INTO certificados(nome, tipo, arquivo_url, data_emissao, valido, id_usuario, id_treinamento) VALUES($1, $2, $3, $4, $5, $6, $7)`;
        const valores = [nome, tipo, arquivo_url, data_emissao, valido, id_usuario, id_treinamento];
        await BD.query(comando, valores);
        return res.status(201).json('Certificado cadastrado.');
    } catch (error) {
        console.error('Erro ao cadastrar certificado', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar certificado' })
    }
});

// ================= ATUALIZAR CERTIFICADO =================
router.put('/certificados/:id_certificados', autenticarToken, async (req, res) => {
    const { id_certificados } = req.params;
    const { nome, tipo, arquivo_url, data_emissao, valido, id_usuario, id_treinamento } = req.body;
    try {
        const verificar = await BD.query(`SELECT * FROM certificados WHERE id_certificados = $1`, [id_certificados]);
        if (verificar.rows.length === 0) {
            return res.status(404).json({ message: 'Certificado não encontrado' })
        }

        const comando = `UPDATE certificados SET nome = $1, tipo = $2, arquivo_url = $3, data_emissao = $4, valido = $5, id_usuario = $6, id_treinamento = $7 WHERE id_certificados = $8`;
        const valores = [nome, tipo, arquivo_url, data_emissao, valido, id_usuario, id_treinamento, id_certificados];
        await BD.query(comando, valores);
        return res.status(200).json('Certificado atualizado.');
    } catch (error) {
        console.error('Erro ao atualizar certificado', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar certificado' })
    }
});

// ================= PATCH =================
router.patch('/certificados/:id_certificados', autenticarToken, async (req, res) => {
    const { id_certificados } = req.params;
    const { nome, tipo, arquivo_url, data_emissao, valido, id_usuario, id_treinamento } = req.body;
    try {
        const verificar = await BD.query(`SELECT * FROM certificados WHERE id_certificados = $1`, [id_certificados]);
        if (verificar.rows.length === 0) {
            return res.status(404).json({ message: 'Certificado não encontrado' });
        }

        const campos = [];
        const valores = [];
        let contador = 1;

        if (nome !== undefined) { campos.push(`nome = $${contador}`); valores.push(nome); contador++; }
        if (tipo !== undefined) { campos.push(`tipo = $${contador}`); valores.push(tipo); contador++; }
        if (arquivo_url !== undefined) { campos.push(`arquivo_url = $${contador}`); valores.push(arquivo_url); contador++; }
        if (data_emissao !== undefined) { campos.push(`data_emissao = $${contador}`); valores.push(data_emissao); contador++; }
        if (valido !== undefined) { campos.push(`valido = $${contador}`); valores.push(valido); contador++; }
        if (id_usuario !== undefined) { campos.push(`id_usuario = $${contador}`); valores.push(id_usuario); contador++; }
        if (id_treinamento !== undefined) { campos.push(`id_treinamento = $${contador}`); valores.push(id_treinamento); contador++; }

        if (campos.length === 0) {
            return res.status(400).json({ message: 'Nenhum campo a atualizar' });
        }

        valores.push(id_certificados);
        const comando = `UPDATE certificados SET ${campos.join(', ')} WHERE id_certificados = $${contador}`;
        await BD.query(comando, valores);
        return res.status(200).json('Certificado atualizado com sucesso');
    } catch (error) {
        console.error('Erro ao atualizar certificado', error.message);
        return res.status(500).json({ message: 'Erro interno do servidor: ' + error.message })
    }
});

// ================= DELETE =================
router.delete('/certificados/:id_certificados', autenticarToken, async (req, res) => {
    const { id_certificados } = req.params;
    try {
        const comando = `DELETE FROM certificados WHERE id_certificados = $1`;
        await BD.query(comando, [id_certificados]);
        return res.status(200).json({ message: 'Certificado removido com sucesso' });
    } catch (error) {
        console.error('Erro ao remover certificado', error.message);
        return res.status(500).json({ message: 'Erro interno do servidor: ' + error.message })
    }
});

export default router;
