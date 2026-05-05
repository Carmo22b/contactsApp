# Contacts App — Exercício de Recrutamento Alfasoft

Aplicação web desenvolvida com **Node.js** e **Vue.js** para gestão de contactos.

## Funcionalidades

- Listagem de todos os contactos numa página inicial (cards com foto, nome, contacto e email)
- Adicionar novo contacto com upload de imagem
- Editar contactos existentes
- Apagar contactos com modal de confirmação
- Ver detalhes completos de um contacto
- API REST com CRUD completo
- Sistema de autenticação (login/registo) — apenas utilizadores autenticados podem adicionar, editar ou apagar
- Validação de formulários (frontend + backend)

## Tecnologias

- **Backend:** Node.js + Express.js
- **Frontend:** Vue.js 3 (via CDN)
- **Base de dados:** MariaDB
- **Upload de ficheiros:** Multer
- **Autenticação:** express-session + bcryptjs

## Endpoints da API REST

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | /contacts | Listar todos os contactos | Não |
| GET | /contacts/:id | Ver detalhes do contacto | Não |
| POST | /contacts | Criar novo contacto | Sim |
| PUT | /contacts/:id | Editar contacto existente | Sim |
| DELETE | /contacts/:id | Apagar contacto | Sim |

## Regras de Validação

- **Nome:** string com mais de 5 caracteres
- **Contacto:** exatamente 9 dígitos, deve ser único
- **Email:** formato de email válido, deve ser único
- **Foto:** obrigatória ao criar um contacto

## Link da Aplicação

[https://carmolourenco-nodejs.recruitment.alfasoft.pt](https://carmolourenco-nodejs.recruitment.alfasoft.pt)
