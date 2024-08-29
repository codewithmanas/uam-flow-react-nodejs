import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/authRouter.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get('/health-check', (req, res) => {
  res.send('OK');
})


// Routes
app.use('/api/auth', authRouter);


// 404 Error Handling
app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
});


// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack); 

  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// cors options
// { origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
//   optionsSuccessStatus: 200,
//   preflightContinue: true,
//  }