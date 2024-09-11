import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRouter from './routes/authRouter.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';
import { join } from 'path';



dotenv.config();

const app = express();

// Custom Middleware
function loggerMiddleware(req, res, next) {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
}

// using Custom Middleware
app.use(loggerMiddleware);

// Middleware
// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(cookieParser());
app.use(morgan('dev'));
app.use(morgan('common'));
app.use(morgan('combined'));
app.use(morgan('short'));
app.use(morgan('tiny'));

// const customFormat = ':method :url :status :response-time ms - :res[content-length]';
// app.use(morgan(customFormat));

// Logging to a File

// Simulating __filename
const __filename = fileURLToPath(import.meta.url);

// Simulating __dirname
const __dirname = dirname(__filename);

// Example of resolving a path relative to the current directory
const filePath = join(__dirname, 'logs', 'access.log');
console.log(filePath);


// Ensure the logs directory exists
if (!fs.existsSync(path.dirname(filePath))) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}


// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(filePath, { flags: 'a' });

// Setup the logger
app.use(morgan('combined', { stream: accessLogStream }));



// app.use(helmet());
// app.use(compression());
// app.use(fileUpload());
// app.use(errorHandler());
// app.use(notFound());



// Third-party middleware
app.use(cors());

// Application-level middleware
app.use((req, res, next) => {
  // console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  // console.log(`${req.method} ${req.url} ${res.statusCode} ${res.statusMessage}`);
  // console.log(`${JSON.stringify(req.headers)}`);
  // console.log(`${JSON.stringify(req.body)}`);
  // console.log(`${JSON.stringify(next)}`);
  // console.log(`${JSON.stringify(err)}`);

  console.log('This middleware runs for every request');
  console.log('Time:', Date.now());
  next(); // Pass control to the next middleware
});

// Route handler
app.get('/', (req, res) => {
  res.send('App is running!');
});

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
// const corsOptions = { origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
//   optionsSuccessStatus: 200,
//   preflightContinue: true,
//  }