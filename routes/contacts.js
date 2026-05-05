import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Middleware de autenticação
function requireAuth(req, res, next) {
  if (req.session && req.session.user) return next();
  res.status(401).json({ error: 'Não autenticado' });
}

// GET /contacts - listar todos (público)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar contatos' });
  }
});

// GET /contacts/:id - ver detalhes (público)
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM contacts WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Contato não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar contato' });
  }
});

// POST /contacts - criar (autenticado)
router.post('/', requireAuth, upload.single('picture'), async (req, res) => {
  const { name, contact, email } = req.body;
  const picture = req.file ? '/uploads/' + req.file.filename : null;

  // Validações
  if (!name || name.length <= 5) return res.status(400).json({ error: 'Nome deve ter mais de 5 caracteres' });
  if (!contact || !/^\d{9}$/.test(contact)) return res.status(400).json({ error: 'Contato deve ter 9 dígitos' });
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Email inválido' });
  if (!picture) return res.status(400).json({ error: 'Imagem obrigatória' });

  try {
    const [result] = await pool.execute(
      'INSERT INTO contacts (name, contact, email, picture) VALUES (?, ?, ?, ?)',
      [name, contact, email, picture]
    );
    const [rows] = await pool.execute('SELECT * FROM contacts WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: 'Contato ou email já existe' });
    res.status(500).json({ error: 'Erro ao criar contato' });
  }
});

// PUT /contacts/:id - editar (autenticado)
router.put('/:id', requireAuth, upload.single('picture'), async (req, res) => {
  const { name, contact, email } = req.body;

  if (!name || name.length <= 5) return res.status(400).json({ error: 'Nome deve ter mais de 5 caracteres' });
  if (!contact || !/^\d{9}$/.test(contact)) return res.status(400).json({ error: 'Contato deve ter 9 dígitos' });
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Email inválido' });

  try {
    const [existing] = await pool.execute('SELECT * FROM contacts WHERE id = ?', [req.params.id]);
    if (!existing.length) return res.status(404).json({ error: 'Contato não encontrado' });

    const picture = req.file ? '/uploads/' + req.file.filename : existing[0].picture;

    await pool.execute(
      'UPDATE contacts SET name=?, contact=?, email=?, picture=? WHERE id=?',
      [name, contact, email, picture, req.params.id]
    );
    const [rows] = await pool.execute('SELECT * FROM contacts WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: 'Contato ou email já existe' });
    res.status(500).json({ error: 'Erro ao editar contato' });
  }
});

// DELETE /contacts/:id - apagar (autenticado)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const [existing] = await pool.execute('SELECT * FROM contacts WHERE id = ?', [req.params.id]);
    if (!existing.length) return res.status(404).json({ error: 'Contato não encontrado' });
    await pool.execute('DELETE FROM contacts WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao apagar contato' });
  }
});

export default router;