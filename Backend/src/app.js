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

const frontendDist = path.join(__dirname, '..', '..', 'Frontend', 'Vidora', 'dist');

if (fs.existsSync(frontendDist)) {
  // serve static files
  app.use(express.static(frontendDist));

  // serve index.html for all other routes (so SPA routing works)
  // Express 5.x compatible catch-all route (must be last, after all API routes)
  app.use((req, res) => {
    // This only runs if no previous route matched
    // Skip API routes and socket.io (shouldn't reach here, but safety check)
    if (req.path.startsWith('/api') || req.path.startsWith('/socket.io')) {
      return res.status(404).json({ error: 'Not found' });
    }
    // serve index.html for SPA routing
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