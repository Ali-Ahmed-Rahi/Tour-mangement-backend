/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import { envVars } from './app/config/env';
import { seedSuperAdmin } from './app/utils/seedSuperAdmin';



let server: Server;



const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URI)
    console.log("Connected to DB");
    server = app.listen(5000, () => {
      console.log('server is running to the port 5000');
    })
  } catch (error) {
    console.log("connection failed",error);
  }
}

(async()=>{
await startServer()
await seedSuperAdmin()
})()

// unhandledRejection
process.on("unhandledRejection", (err) => {
  console.log("unHandled Rejection detected .... server shuting down",err);
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

// Promise.reject(new Error("i forgot"))



process.on("uncaughtException", (err) => {
  console.log("uncaughtException   detected .... server shuting down",err);
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})





// SIGTERM 
process.on("SIGTERM", (err) => {
  console.log("SIGTERM signal detected .... server shuting down",err);
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

// Promise.reject(new Error("i forgot"))

// SIGINT

process.on("SIGINT", (err) => {
  console.log("SIGINT signal received .... server shuting down",err);
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})


// Promise.reject(new Error("i forgot"))
