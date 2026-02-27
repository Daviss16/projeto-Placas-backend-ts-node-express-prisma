export type PlacaDTO = {
    id: string;
    placaCinza: string;
    placaMercosul: string;
    estado: string;
    regiao: string;
};

export type CreatePlacaInputDTO = {
    placaCinza: string;
};

export type UpdateEstadoInputDTO = {
    placaMercosul: string;
    Novoestado: string;
};

export type ListRegiaoInputDTO = {
    regiao: string;
}

export type CreatePlacaOutputDTO = PlacaDTO;

export type UpdateEstadoOutputDTO = PlacaDTO;

export type ListRegiaoOutputDTO = {
    placas: PlacaDTO[];
};
