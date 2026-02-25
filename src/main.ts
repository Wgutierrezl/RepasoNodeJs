import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import { AppDataSource } from './config/config.db';
import { swaggerSetUp } from './config/config.swagger';
import indexRoutes from './routes/index.routes';

async function main() {
    try{
        const app: Application = express();
        const PORT=process.env.PORT || 3000;

        app.use(cors({
            origin: '*',
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization'],
        }));
        app.use(express.json());
        AppDataSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized!");
        })
        .catch((err) => {
            console.error("Error during Data Source initialization:", err);
        });


        // Rutas
        app.use("/api", indexRoutes);

        // Configuración de Swagger
        swaggerSetUp(app);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });


    }catch(error:any){
        console.error("Error starting the application:", error);
    }
    
}

main();