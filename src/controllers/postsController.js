import fs from "fs";
import { getTodosOsPosts, createPost, atualizarPost } from "../models/postModel.js";
import  gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req,res) {
    //chama a função para buscar os posts
    const posts = await getTodosOsPosts();
    //envia uma respota HTTP com status 200 (OK) e o posts no formato JSON
    res.status(200).json(posts);
}

export async function criarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await createPost(novoPost);
        res.status(200).json(postCriado);
    }  catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na Requisição"});
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const postCriado = await createPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        //renomeia o arquivo localmente
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    }  catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na Requisição"});
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    }  catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na Requisição"});
    }
}

