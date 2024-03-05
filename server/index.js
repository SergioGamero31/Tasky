const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const boardRoutes = require('./src/routes/boardRoutes');
const columnRoutes = require('./src/routes/columnRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/board', boardRoutes);
app.use('/api/column', columnRoutes);
app.use('/api/task', taskRoutes);

async function connect() {
  await mongoose.connect(process.env.DB_CONNECTION);
  console.log('Conectado a mongodb');
}
connect().catch(console.error);

mongoose.connection.on('error', err => {
  console.error('Error de conexión a la base de datos:', err);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
