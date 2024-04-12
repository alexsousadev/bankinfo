import readSheet from "../services/readSheet";
import { PrismaClient } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

// adiciona no banco de dados os registros de uma planilha
const insertDataFromSpreadsheet = async (path: string) => {
  try {
    const banks = await readSheet.readSheet(path) as JsonObject[];
    if (banks !== undefined) {
      for (let i = 0; i < banks.length; i++) {
        let copensation_cod = banks[i]['Código de compensação'] as number
        let bankName = banks[i]['Nome Instituição'] as string

        await prisma.banco.create({
          data: {
            nome_instituicao: bankName,
            codigo_compensacao: copensation_cod
          }
        })

      }
    } else {
      console.error('Não foi possível obter os dados da planilha.');
    }
  } catch (error) {
    console.error('Erro ao inserir dados no banco:', error);
  }
}

// retorna todos os registros do banco de dados
const getAllBanks = async () => {
  const allBanks = await prisma.banco.findMany()
  return allBanks;
}

// retorna todas as informações de um banco especifico
const getAllInfoBank = async (cod_compensacao: number) => {
  try {
    const BankInfo = await prisma.banco.findUnique({
      where: { codigo_compensacao: cod_compensacao },
    });

    if (BankInfo) {
      return BankInfo;
    } else {
      console.log("Nenhuma informação de banco encontrada para o código de compensação:", cod_compensacao);
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar informações do banco:", error);
    throw error;
  }
};

export default { getAllBanks, insertDataFromSpreadsheet, getAllInfoBank }
