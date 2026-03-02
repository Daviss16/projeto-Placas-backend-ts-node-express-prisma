import { Placas } from "../../../core/entities/placas";
import { Request, Response } from "express";
import { PlacaDTO, CreatePlacaOutputDTO, ListRegiaoOutputDTO, UpdateEstadoOutputDTO,
    CreatePlacaInputDTO, ListRegiaoInputDTO, UpdateEstadoInputDTO  } from "./dto/dto";

export interface PlacaService {
    create(placaCinza: string): Promise<Placas>;
    updateEstado(placaCinza: string, newEstado: string): Promise<Placas>;
    deletePlaca(placaMercosul: string): Promise<void>;
    listRegiao(regiao: string): Promise<Placas[]>;
}

export type ServiceProps = {
    service: PlacaService
}

export class PlacasController {
    private constructor (readonly props: ServiceProps) {}

    public static build(props: ServiceProps) {
        return new PlacasController(props);
    }

    public create = async (req: Request, res: Response): Promise<void> => {
        try {
            const input : CreatePlacaInputDTO = req.body

            const placa = await this.props.service.create(input.placaCinza);

            const output : CreatePlacaOutputDTO = {
                id: placa.id,
                placaCinza: placa.placaCinza,
                placaMercosul: placa.placaMercosul,
                estado: placa.estado,
                regiao: placa.regiao
            };

            res.status(201).json(output);
        
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
        
    }

    public updateEstado = async (req: Request <{ placaCinza: string}, any, UpdateEstadoInputDTO>, 
                                 res: Response): Promise<void> => {
        try{
            const placaCinza = req.params.placaCinza
            const input = req.body

            if (!placaCinza || typeof placaCinza !== 'string'){
                res.status(400).json({ error: "O parâmetro placaCinza na URL deve ser uma string válida."});
                return;
            }

            if(!input || !input.newEstado || typeof input.newEstado !== 'string'){
                res.status(400).json({ error: "O campo 'NewEstado' é obrigatório e deve ser uma string"});
                return;
            }

            const placa = await this.props.service.updateEstado(placaCinza, input.newEstado);

            const output: PlacaDTO = {
                id: placa.id,
                placaCinza: placa.placaCinza,
                placaMercosul: placa.placaMercosul,
                estado: placa.estado,
                regiao: placa.regiao
            }

            res.status(200).json(output);

        }catch (error: any){
            res.status(400).json({ error: error.message });
        }

    }

    public listRegiao = async (req: Request <{ regiao: string}>,
                               res: Response): Promise<void> => {
        try {
            const regiao = req.params.regiao

            if(!regiao || typeof regiao !== 'string'){
                res.status(400).json({ error: "O parâmetro regiao na URL deve ser uma string válida."});
                return;
            }

            const placas = await this.props.service.listRegiao(regiao)

            const output: PlacaDTO[] = placas.map(placa => ({
                id: placa.id,
                placaCinza: placa.placaCinza,
                placaMercosul: placa.placaMercosul,
                estado: placa.estado,
                regiao: placa.regiao
            }));

            res.status(200).json({ placas: output });
            
        }catch (error: any){
            res.status(400).json({ error: error.message });
        }

    }

    public deletePlaca = async (req: Request <{ placaCinza: string}>, res: Response): Promise<void> => {
        try {
            const placaMercosul = req.params.placaCinza

            if(!placaMercosul || typeof placaMercosul !== 'string'){
                res.status(400).json({ error: "O parâmetro placaMercosul na URL deve ser uma string válida."});
                return;
            }

            await this.props.service.deletePlaca(placaMercosul);

            res.status(204).send();
        }catch (error: any){
            res.status(400).json({ error: error.message });
        }
    }
}

