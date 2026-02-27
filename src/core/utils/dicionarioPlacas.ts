import { throwDeprecation } from "process";

type Localizacao = {estadoOrigem: string,regiao: string};

export function descobrirEstadoERegião(letras: string): Localizacao {
        //SUL   
        if(letras >= 'AAA' && letras <= 'BEZ') return {estadoOrigem: 'PR', regiao: 'Sul'};
        if(letras >= 'LWR' && letras <= 'MMM') return {estadoOrigem: 'SC', regiao: 'Sul'};
        if(letras >= 'IAQ' && letras <= 'JDO') return {estadoOrigem: 'RS', regiao: 'Sul'};

        //SUDESTE
        if(letras >= 'BFA' && letras <= 'GKI') return {estadoOrigem: 'SP', regiao: 'Sudeste'};
        if(letras >= 'GKJ' && letras <= 'HOK') return {estadoOrigem: 'MG', regiao: 'Sudeste'};
        if(letras >= 'KMF' && letras <= 'LVE') return {estadoOrigem: 'RJ', regiao: 'Sudeste'};
        if(letras >= 'MOX' && letras <= 'MTZ') return {estadoOrigem: 'ES', regiao: 'Sudeste'};

        //CENTRO-OESTE
        if(letras >= 'JDP' && letras <= 'JKR') return {estadoOrigem: 'DF', regiao: 'Centro-Oeste'};
        if(letras >= 'KAV' && letras <= 'KFC') return {estadoOrigem: 'GO', regiao: 'Centro-Oeste'};
        if(letras >= 'JXZ' && letras <= 'KAU') return {estadoOrigem: 'MT', regiao: 'Centro-Oeste'};
        if(letras >= 'HQF' && letras <= 'HTW') return {estadoOrigem: 'MS', regiao: 'Centro-Oeste'};

        //NORDESTE
        if(letras >= 'JKS' && letras <= 'JSZ') return {estadoOrigem: 'BA', regiao: 'Nordeste'};
        if(letras >= 'HTX' && letras <= 'HZA') return {estadoOrigem: 'CE', regiao: 'Nordeste'};
        if(letras >= 'KFD' && letras <= 'KME') return {estadoOrigem: 'PE', regiao: 'Nordeste'};
        if(letras >= 'HOL' && letras <= 'HQE') return {estadoOrigem: 'MA', regiao: 'Nordeste'};
        if(letras >= 'MMN' && letras <= 'MOW') return {estadoOrigem: 'PB', regiao: 'Nordeste'};
        if(letras >= 'MXH' && letras <= 'MZM') return {estadoOrigem: 'RN', regiao: 'Nordeste'};
        if(letras >= 'MUA' && letras <= 'MVK') return {estadoOrigem: 'AL', regiao: 'Nordeste'};
        if(letras >= 'HZB' && letras <= 'IAP') return {estadoOrigem: 'SE', regiao: 'Nordeste'};
        if(letras >= 'LVF' && letras <= 'LWQ') return {estadoOrigem: 'PI', regiao: 'Nordeste'};

        //NORTE
        if(letras >= 'JWF' && letras <= 'JXY') return {estadoOrigem: 'AM', regiao: 'Norte'};
        if(letras >= 'JTA' && letras <= 'JWE') return {estadoOrigem: 'PA', regiao: 'Norte'};
        if(letras >= 'MVL' && letras <= 'MXG') return {estadoOrigem: 'TO', regiao: 'Norte'};
        if(letras >= 'NBB' && letras <= 'NEH') return {estadoOrigem: 'RO', regiao: 'Norte'};
        if(letras >= 'MZN' && letras <= 'NAG') return {estadoOrigem: 'AC', regiao: 'Norte'};
        if(letras >= 'NEI' && letras <= 'NFB') return {estadoOrigem: 'AP', regiao: 'Norte'};
        if(letras >= 'NAH' && letras <= 'NBA') return {estadoOrigem: 'RR', regiao: 'Norte'};

        throw new Error("Prefixo de Placa não encontrado");
    };
