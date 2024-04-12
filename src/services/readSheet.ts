import { read, utils } from "xlsx";
import { readFileSync } from "fs";

// retorna os dados de uma planilha
const readSheet = async (path: string) => {
  try {
    const buf = readFileSync("bancos.xls");
    const workbook = read(buf);
    const workbook_sheet = workbook.SheetNames[0];
    const workbook_res = utils.sheet_to_json(workbook.Sheets[workbook_sheet])

    return workbook_res;
  } catch (err) {
    console.error(err);
  }
};

export default { readSheet }
