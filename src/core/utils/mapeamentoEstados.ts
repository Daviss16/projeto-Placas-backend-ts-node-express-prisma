export const mapaRegioes : Record <string, string> = {
    
    'PR' : 'Sul',
    'SC' : 'Sul',
    'RS' : 'Sul',
    'SP' : 'Sudeste',
    'MG' : 'Sudeste',
    'RJ' : 'Sudeste',
    'ES' : 'Sudeste',
    'DF' : 'Centro-Oeste',
    'GO' : 'Centro-Oeste',
    'MT' : 'Centro-Oeste',
    'MS' : 'Centro-Oeste',
    'BA' : 'Nordeste',
    'CE' : 'Nordeste',
    'PE' : 'Nordeste',
    'MA' : 'Nordeste',
    'PB' : 'Nordeste',
    'RN' : 'Nordeste',
    'AL' : 'Nordeste',
    'SE' : 'Nordeste',
    'PI' : 'Nordeste',
    'AM' : 'Norte',
    'PA' : 'Norte',
    'TO' : 'Norte',
    'RO' : 'Norte',
    'AC' : 'Norte',
    'AP' : 'Norte',
    'RR' : 'Norte',

}

export const mapaRanges: Record <string, { inicio: string, fim: string}> = {
    'PR' : {inicio: 'AAA', fim: 'BEZ'},
    'SC' : {inicio: 'LWR', fim: 'MMM'},
    'RS' : {inicio: 'IAQ', fim: 'JDO'},
    'SP' : {inicio: 'BFA', fim: 'GKI'},
    'MG' : {inicio: 'GKJ', fim: 'HOK'},
    'RJ' : {inicio: 'KMF', fim: 'LVE'},
    'ES' : {inicio: 'MOX', fim: 'MTZ'},
    'DF' : {inicio: 'JDP', fim: 'JKR'},
    'GO' : {inicio: 'KAV', fim: 'KFC'},
    'MT' : {inicio: 'JXZ', fim: 'KAU'},
    'MS' : {inicio: 'HQF', fim: 'HTW'},
    'BA' : {inicio: 'JKS', fim: 'JSZ'},
    'CE' : {inicio: 'HTX', fim: 'HZA'},
    'PE' : {inicio: 'KFD', fim: 'KME'},
    'MA' : {inicio: 'HOL', fim: 'HQE'},
    'PB' : {inicio: 'MMN', fim: 'MOW'},
    'RN' : {inicio: 'MXH', fim: 'MZM'},
    'AL' : {inicio: 'MUA', fim: 'MVK'},
    'SE' : {inicio: 'HZB', fim: 'IAP'},
    'PI' : {inicio: 'LVF', fim: 'LWQ'},
    'AM' : {inicio: 'JWF', fim: 'JXY'},
    'PA' : {inicio: 'JTA', fim: 'JWE'},
    'TO' : {inicio: 'MVL', fim: 'MXG'},
    'RO' : {inicio: 'NBB', fim: 'NEH'},
    'AC' : {inicio: 'MZN', fim: 'NAG'},
    'AP' : {inicio: 'NEI', fim: 'NFB'},
    'RR' : {inicio: 'NAH', fim: 'NBA'},
}

export function geradorPrefixoEstado (newEstado: string): string {
    const range = mapaRanges[newEstado];
    if(!range) {
        throw new Error(`Estado ${newEstado} invalido ou não suportado.`);
    }

    const sortearLetras = () => {
        const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let resultado = "";
        for (let i = 0; i<3; i++){
            const indiceAleatorio = Math.floor(Math.random() * alfabeto.length);
            resultado += alfabeto[indiceAleatorio];
        }
        return resultado;
    }

    let newPrefixo = sortearLetras();
    
    while(newPrefixo < range.inicio || newPrefixo > range.fim){
        newPrefixo = sortearLetras();
    }

    return newPrefixo;
}