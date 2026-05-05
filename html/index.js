import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  const porta = PORT;

  res.send(`
    <!DOCTYPE html>
    <html lang="pt-pt">
    <head>
        <meta charset="UTF-8">
        <title>Recrutamento | AlfaSoft</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            .container {
                background: white;
                padding: 40px;
                border-radius: 12px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                text-align: center;
                max-width: 500px;
            }
            h1 {
                color: #004080;
            }
            p {
                color: #333;
                font-size: 1.1em;
            }
            a.button {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                background-color: #004080;
                color: white;
                text-decoration: none;
                border-radius: 6px;
                transition: background-color 0.3s ease;
            }
            a.button:hover {
                background-color: #00264d;
            }
            .footer {
                margin-top: 30px;
                font-size: 0.9em;
                color: #888;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Bem-vindo à AlfaSoft</h1>
            <p>Obrigado pelo teu interesse em fazer parte da nossa equipa.</p>
            <p>Todos os passos do exercício de recrutamento foram enviados para o teu e-mail.</p>
            <p>Se tiveres alguma dúvida, não hesites em entrar em contacto connosco.</p>
            <div class="footer">
                <p>Servidor a correr na porta ${porta}</p>
            </div>
        </div>
    </body>
    </html>
  `);
});

app.get('/teste', (req, res) => {
  res.send(`
    <h2>Instruções do Teste</h2>
    <p>Cria uma API simples em Node.js com autenticação JWT e persistência em base de dados.</p>
    <p>Podes usar qualquer framework e base de dados à tua escolha.</p>
    <p>Boa sorte!</p>
  `);
});

app.listen(PORT, () => {
  console.log(`Servidor da AlfaSoft está a correr em http://localhost:${PORT}`);

});
