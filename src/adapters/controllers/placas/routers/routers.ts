import { Router } from "express";
import { PlacasController } from "../placas";



export function getPlacasRouters (controller: PlacasController){
    const rotas = Router();

    rotas.post("/", controller.create);
    rotas.put("/:placaCinza", controller.updateEstado);
    rotas.get("/regiao/:regiao", controller.listRegiao);
    rotas.delete("/:placaCinza", controller.deletePlaca);

    return rotas;
}

