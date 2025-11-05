require('dotenv').config();
const express = require('express');
const sequelize = require('./models/index');
const Hotel = require('./models/hotel');

const app = express();
app.use(express.json());

// Test env reading
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('DB_USER:', process.env.DB_USER);

// Routes
app.get('/', (req, res) => res.send('API Hotel running'));

// CREATE
app.post('/hotel', async (req, res) => {
  try {
    const k = await hotel.create(req.body);
    res.status(201).json(k);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all
app.get('/hotel', async (req, res) => {
  const list = await hotel.findAll();
  res.json(list);
});

// READ by id
app.get('/hotel/:id', async (req, res) => {
  const k = await hotel.findByPk(req.params.id);
  if (!k) return res.status(404).json({ error: 'Not found' });
  res.json(k);
});

// UPDATE
app.put('/hotel/:id', async (req, res) => {
  const k = await hotel.findByPk(req.params.id);
  if (!k) return res.status(404).json({ error: 'Not found' });
  await k.update(req.body);
  res.json(k);
});

// DELETE
app.delete('/hotel/:id', async (req, res) => {
  const k = await hotel.findByPk(req.params.id);
  if (!k) return res.status(404).json({ error: 'Not found' });
  await k.destroy();
  res.json({ success: true });
});

// Sync db & start server
const PORT = process.env.PORT || 3001;
(async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connection OK');
    await sequelize.sync({ alter: true }); // alter:true untuk dev; gunakan force:false/true sesuai kebutuhan
    console.log('Database synced!');
    app.listen(PORT, () => console.log('Server is running on http://localhost:' + PORT));
  } catch (err) {
    console.error('Error synchronizing database:', err);
  }
})();
