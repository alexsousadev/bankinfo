import express, { Router, Request, Response } from 'express';
import axios from "axios";
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const router: Router = express.Router();

// rota para buscar um banco especifico
router.post("/filter", async (req: Request, res: Response) => {
    const codigo_compensacao = parseInt(req.body.text);

    try {
        const { data } = await axios.get(`http://localhost:${PORT}/banks/${codigo_compensacao}`);
        res.json(data);
    } catch (error) {
        console.error("Erro ao buscar informações do banco:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

// rota para obter todos os registros
router.post("/allRecord", async (req: Request, res: Response) => {
    try {
        const { data } = await axios.get(`http://localhost:${PORT}/banks/`);
        res.json(data);
    } catch (error) {
        console.error("Erro ao buscar informações do banco:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
})


export default router;