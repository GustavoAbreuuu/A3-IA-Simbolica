// Encontra o menor caminho válido com busca em largura (BFS).
window.LabirintoApp.Pathfinding = {
    encontrar(labirinto, inicio, fim) {
        const tamanho = labirinto.length;
        const fila = [[...inicio]];
        const visitado = Array.from({ length: tamanho }, () => Array(tamanho).fill(false));
        const anterior = Array.from({ length: tamanho }, () => Array(tamanho).fill(null));
        const direcoes = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        visitado[inicio[0]][inicio[1]] = true;
        for (let indice = 0; indice < fila.length; indice++) {
            const [linha, coluna] = fila[indice];
            if (linha === fim[0] && coluna === fim[1]) return this.reconstruir(anterior, fim);
            for (const [deltaLinha, deltaColuna] of direcoes) {
                const proximaLinha = linha + deltaLinha;
                const proximaColuna = coluna + deltaColuna;
                const dentro = proximaLinha >= 0 && proximaLinha < tamanho && proximaColuna >= 0 && proximaColuna < tamanho;
                if (dentro && !visitado[proximaLinha][proximaColuna] && labirinto[proximaLinha][proximaColuna] !== 1) {
                    visitado[proximaLinha][proximaColuna] = true;
                    anterior[proximaLinha][proximaColuna] = [linha, coluna];
                    fila.push([proximaLinha, proximaColuna]);
                }
            }
        }
        return [];
    },
    reconstruir(anterior, fim) {
        const caminho = [];
        for (let atual = fim; atual !== null; atual = anterior[atual[0]][atual[1]]) caminho.unshift(atual);
        return caminho;
    },
};
