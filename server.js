const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.static('public')); // Isso faz o Node mostrar o seu HTML

// Conexão com aquele banco que você JÁ criou (estoque_db)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456', // A famosa senha!
  database: 'estoque_db'
});

db.connect(err => {
  if (err) throw err;
  console.log("BOOOA! MySQL conectado no Node!");
});

app.get('/', (req, res) => res.send("Estoque Online!"));

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));

// Middleware para o Node entender JSON
app.use(express.json());

// Rota para cadastrar novo componente
app.post('/componentes', (req, res) => {
    const { nome, categoria, quantidade, datasheet } = req.body;
    const sql = 'INSERT INTO componente (nome, categoria, quantidade, datasheet) VALUES (?, ?, ?, ?)';
    
    db.query(sql, [nome, categoria, quantidade, datasheet], (err, result) => {
        if (err) {
            // Se o erro for de duplicado (código 1062 no MySQL)
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ mensagem: "Este componente já está cadastrado!" });
            }
            return res.status(500).json({ mensagem: "Erro interno no servidor" });
        }
        res.send({ mensagem: "Componente salvo com sucesso!", id: result.insertId });
    });
});

// Rota para listar todos
app.get('/componentes', (req, res) => {
    db.query('SELECT * FROM componente', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.delete('/componentes/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM componente WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ mensagem: "Erro ao excluir" });
        res.json({ mensagem: "Componente removido!" });
    });
});
