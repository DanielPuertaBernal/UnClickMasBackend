import dotenv from "dotenv";
import app from "./app.js";
import { testConnection } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

async function startServer() {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}

startServer();
