import { prisma } from "./configuration/prisma";
import express from "express";


import { PlacasServiceImpl } from "./core/service/placas/placas";
import { PlacasController } from "./adapters/controllers/placas/placas";
import { PlacasRepositoryPrisma } from "./adapters/repository/placas/placas";
import { getPlacasRouters } from "./adapters/controllers/placas/routers/routers";

const app = express();
app.use(express.json());


function main(){
    const repository = PlacasRepositoryPrisma.build({prisma : prisma});
    const service = PlacasServiceImpl.build({repository: repository});
    const controller = PlacasController.build({service: service});

    const api = getPlacasRouters(controller);
    app.use("/placas", api);

    const PORT = process.env.PORT || 8000;
    
    app.listen(PORT, () => {
    console.log(`Sistema de Placas rodando na porta ${PORT}!`);
    });
}

main();