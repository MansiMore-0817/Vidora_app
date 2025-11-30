import express from 'express';
import {createServer} from "node:http";
import { fileURLToPath } from "url";
import {Server} from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";


const app = express();
const server = createServer(app);
const io =  connectToSocket(server);


app.set("port", (process.env.PORT || 8000));

app.use(cors()); 
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit:"40kb", extended: true}));

app.use("/api/v1/users", userRoutes);


// serve frontend (after your API routes)
import path from "path";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendDist = path.join(__dirname, '..', 'Frontend', 'dist');

if (fs.existsSync(frontendDist)) {
  // serve static files
  app.use(express.static(frontendDist));

  // serve index.html for all other routes (so SPA routing works)
  app.get('*', (req, res) => {
    // skip API routes if you use /api prefix
    if (req.path.startsWith('/api') || req.path.startsWith('/socket.io')) {
      return res.status(404).end();
    }
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}


const start = async () => {
    try {
        const mongoUri = process.env.MONGO_URI ||
            "mongodb+srv://mansividora08:mansividora08@vidoracluster.rwh9nhw.mongodb.net/?appName=vidoraCluster";

        const connectionDb = await mongoose.connect(mongoUri);
        console.log(`Mongo connected DB host: ${connectionDb.connection.host}`);
    } catch (err) {
        console.error("MongoDB connection failed:", err.message || err);
        console.error(
            "Continuing without DB. To fix: set `MONGO_URI` env var or allow your IP in Atlas network access."
        );
    }

    server.listen(app.get("port"), () => {
        console.log(`Listening on port ${app.get("port")}`);
    });
};

start();