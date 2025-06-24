import express from 'express';
import cors from 'cors';
import counterRoutes from './routes/counter';
import notesRoutes from './routes/notes';
import redisRoutes from './routes/redis';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/counter', counterRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/redis', redisRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
