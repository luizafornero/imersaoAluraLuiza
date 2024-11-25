import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";

// Carrega as variáveis de ambiente a partir do arquivo .env
// Isso permite que você armazene informações sensíveis como a string de conexão do banco de dados de forma segura.
require('dotenv').config();

// Conecta ao banco de dados utilizando a string de conexão armazenada na variável de ambiente STRING_CONEXAO
// A função conectarAoBanco provavelmente se encontra no arquivo dbconfig.js e cuida da lógica de conexão com o MongoDB.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosOsPosts() {
  // Seleciona o banco de dados "imersao-instabytes"
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");
  // Busca todos os documentos da coleção e retorna um array com os resultados
  return colecao.find().toArray();
}

// Função assíncrona para criar um novo post
export async function createPost(novoPost) {
  // Seleciona o banco de dados "imersao-instabytes"
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");
  // Insere um novo documento (post) na coleção
  return colecao.insertOne(novoPost);
}

// Função assíncrona para atualizar um post existente
export async function atualizarPost(id, novoPost) {
  // Seleciona o banco de dados "imersao-instabytes"
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");
  // Converte o ID fornecido em uma instância ObjectId do MongoDB para realizar a busca
  const objID = ObjectId.createFromHexString(id);
  // Atualiza o documento com o ID correspondente, substituindo os campos com os novos valores
  return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost});
}