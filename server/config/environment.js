import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // MongoDB Configuration
  mongodb: {
    uri: "mongodb+srv://stunnerdb:sanskar58076@cluster0.3mkfgmo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  },
  
  // Server Configuration
  server: {
    port: process.env.PORT || 3000,
    url: process.env.SERVER_URL || 'http://localhost:3000',
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  
  // Client Configuration
  client: {
    url: process.env.CLIENT_URL || 'http://localhost:5173',
  },
  
  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret_here',
    expire: process.env.JWT_EXPIRE || '24h',
  },
  
  // CORS Configuration
  cors: {
    origins: [
      'http://localhost:3000',
      'http://localhost:5173',
      process.env.CLIENT_URL
    ].filter(Boolean),
  }
};

export default config;
