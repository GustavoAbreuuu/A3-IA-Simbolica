// Cria o labirinto e posiciona exatamente cinco energias de 5 e três de 10.
window.LabirintoApp.Maze = {
    criar() {
        const { tamanho, inicio, fim } = window.LabirintoApp.configuracao;
        const labirinto = Array.from({ length: tamanho }, (_, linha) => (
            Array.from({ length: tamanho }, (_, coluna) => {
                const ehInicio = linha === inicio[0] && coluna === inicio[1];
                const ehFim = linha === fim[0] && coluna === fim[1];
                return ehInicio || ehFim || Math.random() >= 0.2 ? 0 : 1;
            })
        ));

        this.adicionarEnergias(labirinto, 5, window.LabirintoApp.configuracao.energiasDe5);
        this.adicionarEnergias(labirinto, 10, window.LabirintoApp.configuracao.energiasDe10);
        return labirinto;
    },

    adicionarEnergias(labirinto, valor, quantidade) {
        const livres = [];
        labirinto.forEach((linha, indiceLinha) => linha.forEach((celula, indiceColuna) => {
            if (celula === 0) livres.push([indiceLinha, indiceColuna]);
        }));

        for (let indice = 0; indice < quantidade && livres.length > 0; indice++) {
            const sorteado = Math.floor(Math.random() * livres.length);
            const [linha, coluna] = livres.splice(sorteado, 1)[0];
            labirinto[linha][coluna] = valor;
        }
    },
};
