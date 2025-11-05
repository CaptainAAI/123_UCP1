require('dotenv').config();
const express = require('express');
const sequelize = require('./models/index');
const Hotel = require('./models/hotel');

const app = express();
app.use(express.json());

//main index.js 
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('DB_USER:', process.env.DB_USER);

// Routes
app.get('/', (req, res) => res.send('API Hotel running'));

// CREATE (post)
app.post('/hotel', async (req, res) => {
  try {
    const k = await Hotel.create(req.body);
    res.status(201).json(k);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all (get)
app.get('/hotel', async (req, res) => {
  const list = await Hotel.findAll();
  res.json(list);
});

// READ by id (get/x)
app.get('/hotel/:id', async (req, res) => {
  const k = await Hotel.findByPk(req.params.id);
  if (!k) return res.status(404).json({ error: 'Not found' });
  res.json(k);
});

// UPDATE (put)
app.put('/hotel/:id', async (req, res) => {
  const k = await Hotel.findByPk(req.params.id);
  if (!k) return res.status(404).json({ error: 'Not found' });
  await k.update(req.body);
  res.json(k);
});

// DELETE (delete)
app.delete('/hotel/:id', async (req, res) => {
  const k = await Hotel.findByPk(req.params.id);
  if (!k) return res.status(404).json({ error: 'Not found' });
  await k.destroy();
  res.json({ success: true });
});
//sequelize sync & start server
const PORT = process.env.PORT || 3001;
(async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connection OK');
    await sequelize.sync({ alter: true }); 
    console.log('Database synced!');
    app.listen(PORT, () => console.log('Server is running on http://localhost:' + PORT));
  } catch (err) {
    console.error('Error synchronizing database:', err);
  }
})();
