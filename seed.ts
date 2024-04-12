import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import db from "./src/database/db"
const prisma = new PrismaClient();

dotenv.config();

const XLS_PATH = process.env.XLS_PATH as string;

// adicionar os registros da planilha para o banco de dados
(async () => {
    const existingBanks = await prisma.banco.count();

    if (existingBanks === 0) {
        // Se não houver registros, insira os dados iniciais
        await db.insertDataFromSpreadsheet(XLS_PATH)
        console.log('Dados iniciais inseridos com sucesso.');
    } else {
        console.log('Os dados já existem no banco de dados.');
    }
})

    ()
    .catch((err) => {
        console.error(err);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });