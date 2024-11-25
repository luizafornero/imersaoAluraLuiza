import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, criarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

// Cria uma instância do Express, que será o núcleo da nossa aplicação
const app = express();

// Configurações para permitir requisições de diferentes origens (CORS)
// Neste caso, apenas a origem http://localhost:8000 é permitida
const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
};

// Configura o armazenamento de arquivos utilizando o multer
const storage = multer.diskStorage({
    // Define o destino onde os arquivos serão salvos
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Os arquivos serão salvos na pasta 'uploads'
    },
    // Define o nome do arquivo salvo
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Mantém o nome original do arquivo
    }
});

// Cria um middleware de upload utilizando a configuração de armazenamento
const upload = multer({ storage });

// Define as rotas da aplicação
app.use(express.json()); // Permite que a aplicação entenda requisições com corpo JSON
app.use(cors(corsOptions)); // Aplica as configurações de CORS

// Rota para listar todos os posts
app.get("/posts", listarPosts);

// Rota para criar um novo post
app.post("/posts", criarNovoPost);

// Rota para fazer upload de uma imagem
app.post("/upload", upload.single("imagem"), uploadImagem);
// O parâmetro "imagem" indica o nome do campo do formulário que contém o arquivo

// Rota para atualizar um post (provavelmente a imagem)
// O parâmetro :id indica o ID do post a ser atualizado
app.put("/upload/:id", atualizarNovoPost);

export default app; // Exporta a aplicação para que possa ser utilizada em outros módulos