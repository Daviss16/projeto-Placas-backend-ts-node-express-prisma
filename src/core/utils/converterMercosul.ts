export function converterPlacaMercosul(placaInput: string): {placaCinzaLimpa: string, placaMercosul: string, letras: string} {
    const placaLimpa = placaInput.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

    if(!(/^[A-Z]{3}[0-9]{4}$/.test(placaLimpa))) {
        throw new Error("Formato de placa inválido. O modelo deve ser LLL-NNNN.");
    }

    const mapaConversao: Record<string, string> = {
        '0' : 'A', '1' : 'B', '2' : 'C', '3' : 'D', '4' : 'E',
        '5' : 'F', '6' : 'G', '7' : 'H', '8' : 'I', '9' : 'J'
    };

    const letras = placaLimpa.substring(0, 3);
    const primeiroNumero = placaLimpa.substring(3, 4);
    const numeroParaLetra = placaLimpa.substring(4, 5);
    const ultimosNumeros = placaLimpa.substring(5, 7);

    const placaMercosul = `${letras}${primeiroNumero}${mapaConversao[numeroParaLetra]}${ultimosNumeros}`;
    
    return {
        placaCinzaLimpa: placaLimpa,
        placaMercosul: placaMercosul,
        letras: letras
    };
}