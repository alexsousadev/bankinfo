import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import apiRoutes from "./src/routes/apiBank";
import appRoutes from "./src/routes/app";
import express, { Request, Response } from "express";
const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./src/public"));

app.set('view engine', 'ejs');
app.set('views', './src/views');

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.render("index.ejs")
})

app.use("/", apiRoutes, appRoutes)

app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
    throw new Error(error.message);
});