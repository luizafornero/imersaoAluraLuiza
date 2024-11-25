import express from "express";
import routes from "./src/routes/postsRouters.js";

const app = express();
app.use(express.static("uploads"));
routes(app);

//servidor está escutando a porta 3000
app.listen(3000, () => {
    console.log("Servidor Escutando...");
});