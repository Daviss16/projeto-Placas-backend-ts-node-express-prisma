import { PlacaService } from "../../../adapters/controllers/placas/placas";
import { Placas } from "../../entities/placas";

export interface PlacasRepository {
    save(placa: Placas): Promise<void>;
    findPlaca(placaMercosul: string): Promise<Placas | null>;
    listRegiao(regiao: string): Promise<Placas[]>;
    searchLastFourDigits(lastFourDigits: string, estado: string): Promise<boolean>;
    delete(placaMercosul: string): Promise<void>;
}

export type RepositoryProps = {
    repository: PlacasRepository;
}

export class PlacasServiceImpl implements PlacaService {
    private constructor(readonly props: RepositoryProps) {}

    public static build(props: RepositoryProps){
        return new PlacasServiceImpl(props);
    }

    public async create(placaCinza: string): Promise<Placas> {
        const aPlaca = Placas.create(placaCinza);

        await this.props.repository.save(aPlaca);

        const output = aPlaca;
        return output;
    }

    public async updateEstado(placaCinza: string, newEstado: string): Promise<Placas> {
        const aPlaca = await this.props.repository.findPlaca(placaCinza);

        if(! aPlaca) {
            throw new Error("A placa "+ placaCinza +" não foi encontrada.");
        }

        const letras = placaCinza.substring(3, 7);
        const conflitoExiste = await this.props.repository.searchLastFourDigits(letras,newEstado);

        if(conflitoExiste){
            throw new Error("Placa com os mesmos ultimos 4 digitos ja existe nessem estado.");
        }

        aPlaca.updateEstado(newEstado);
        await this.props.repository.save(aPlaca);

        const output = aPlaca;
        return output;
    }

    public async deletePlaca(placaMercosul: string): Promise<void> {
        const aPlaca = await this.props.repository.findPlaca(placaMercosul);

        if(! aPlaca) {
            throw new Error("A placa "+ placaMercosul +" não foi encontrada.");
        }
        
        await this.props.repository.delete(placaMercosul);
    }

    public async listRegiao(regiao: string): Promise<Placas[]> {
        const aPlacas = await this.props.repository.listRegiao(regiao);

        const output = aPlacas;
        return output;
    }

}