import express, { Router, Request, Response } from 'express';
import db from "../database/db"

const router: Router = express.Router();

// Listagem de todos os bancos
router.get("/banks", async (req: Request, res: Response) => {
    try {
        const banks = await db.getAllBanks();
        res.status(200).json({ response: banks });
    } catch (error) {
        console.error("Erro ao buscar informações de bancos:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

//  Consultar um banco passando o código de compensação como parâmetro
router.get("/banks/:compensacao", async (req: Request, res: Response) => {
    try {
        const compensacao = parseInt(req.params.compensacao);

        if (isNaN(Number(compensacao))) {
            return res.status(400).json({ error: "O código de compensação deve ser um número válido" });
        }

        const bankInfo = await db.getAllInfoBank(compensacao);

        if (bankInfo) {
            res.status(200).json({ bankInfo });
        } else {
            res.status(404).json({ error: `Nenhuma informação de banco encontrada para o código de compensação ${compensacao}` });
        }
    } catch (error) {
        console.error("Erro ao buscar informações do banco:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

export default router;