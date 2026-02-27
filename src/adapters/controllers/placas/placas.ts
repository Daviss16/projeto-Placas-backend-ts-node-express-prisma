import { Placas } from "../../../core/entities/placas";

export interface PlacaService {
    create(placaCinza: string): Promise<Placas>;
    updateEstado(placaMercosul: string, newEstado: string): Promise<Placas>;
    deletePlaca(placaMercosul: string): Promise<void>;
    listRegiao(regiao: string): Promise<Placas[]>;
}

