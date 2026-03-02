import crypto from 'crypto';
import { descobrirEstadoERegião } from '../utils/dicionarioPlacas';
import { converterPlacaMercosul } from '../utils/converterMercosul';
import { geradorPrefixoEstado, mapaRegioes } from '../utils/mapeamentoEstados';

export type PlacasProps = {
    id: string,
    placaCinza: string,
    placaMercoS: string,
    estado: string,
    regiao: string
};

export class Placas {
    //Readonly<PlacasProps> // essa linha aplicaria readonly a todas os atributos da instancia e não apenas a instancia
    private constructor(readonly props: PlacasProps) {}

    public static create(placaInput: string){
        const { placaCinzaLimpa, placaMercosul, letras } = converterPlacaMercosul(placaInput);

        const localizacao = descobrirEstadoERegião(letras);

        return new Placas({
            id: crypto.randomUUID().toString(),
            placaCinza: placaCinzaLimpa,
            placaMercoS: placaMercosul,
            estado: localizacao.estadoOrigem,
            regiao: localizacao.regiao
        });
    }

    public static with(id: string, placaCinza: string, placaMercoS: string, estadoOrigem: string, regiao: string){
        return new Placas({
            id,
            placaCinza,
            placaMercoS,
            estado: estadoOrigem,
            regiao
        });
    }

    public updateEstado(novoEstado: string){
        const newEstado = novoEstado.toUpperCase();

        if(this.props.estado == newEstado){
            throw new Error("A placa ja pertence a esse estado.");
        }

        const newPrefixo = geradorPrefixoEstado(newEstado);
        const newRegiao = mapaRegioes[newEstado];

        if(!newRegiao){
            throw new Error("Estado de destino invalido.");
        }

        const lastFourDigits = this.props.placaCinza.substring(3, 7);
        const placaCinzaTemp = `${newPrefixo}${lastFourDigits}`;

        const {placaMercosul} = converterPlacaMercosul(placaCinzaTemp);

        this.props.estado = newEstado;
        this.props.regiao = newRegiao;
        this.props.placaMercoS = placaMercosul;
        this.props.placaCinza = placaCinzaTemp;
    }

    public get id() { return this.props.id}

    public get placaCinza() { return this.props.placaCinza}

    public get placaMercosul() { return this.props.placaMercoS}

    public get estado() { return this.props.estado}

    public get regiao() { return this.props.regiao}
}



