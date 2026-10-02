// Executa BFS ou A* considerando a energia restante em cada movimento.
window.LabirintoApp.Pathfinding = {
    encontrar(algoritmo, labirinto, inicio, fim, energiaInicial) {
        return algoritmo === "astar"
            ? this.buscarAEstrela(labirinto, inicio, fim, energiaInicial)
            : this.buscarLargura(labirinto, inicio, fim, energiaInicial);
    },

    buscarLargura(labirinto, inicio, fim, energiaInicial) {
        const fila = [{ linha: inicio[0], coluna: inicio[1], energia: energiaInicial, caminho: [inicio] }];
        const melhorEnergia = this.criarMapaDeEnergia(labirinto.length, inicio, energiaInicial);

        for (let indice = 0; indice < fila.length; indice++) {
            const atual = fila[indice];
            if (this.chegouAoFim(atual, fim)) return atual;
            this.expandirVizinhos(fila, atual, labirinto, fim, melhorEnergia, false);
        }
        return null;
    },

    buscarAEstrela(labirinto, inicio, fim, energiaInicial) {
        const fila = [{ linha: inicio[0], coluna: inicio[1], energia: energiaInicial, caminho: [inicio], custo: 0 }];
        const melhorEnergia = this.criarMapaDeEnergia(labirinto.length, inicio, energiaInicial);

        while (fila.length > 0) {
            fila.sort((a, b) => a.custo - b.custo);
            const atual = fila.shift();
            if (this.chegouAoFim(atual, fim)) return atual;
            this.expandirVizinhos(fila, atual, labirinto, fim, melhorEnergia, true);
        }
        return null;
    },

    expandirVizinhos(fila, atual, labirinto, fim, melhorEnergia, usarHeuristica) {
        const direcoes = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (const [deltaLinha, deltaColuna] of direcoes) {
            const linha = atual.linha + deltaLinha;
            const coluna = atual.coluna + deltaColuna;
            if (!this.ehCelulaValida(labirinto, linha, coluna)) continue;

            const energia = window.LabirintoApp.Energy.calcularProxima(atual.energia, labirinto[linha][coluna]);
            if (!window.LabirintoApp.Energy.ehSuficiente(energia) || energia <= melhorEnergia[linha][coluna]) continue;

            melhorEnergia[linha][coluna] = energia;
            const caminho = [...atual.caminho, [linha, coluna]];
            const proximo = { linha, coluna, energia, caminho };
            if (usarHeuristica) {
                proximo.custo = caminho.length - 1 + Math.abs(fim[0] - linha) + Math.abs(fim[1] - coluna);
            }
            fila.push(proximo);
        }
    },

    criarMapaDeEnergia(tamanho, inicio, energiaInicial) {
        const mapa = Array.from({ length: tamanho }, () => Array(tamanho).fill(-Infinity));
        mapa[inicio[0]][inicio[1]] = energiaInicial;
        return mapa;
    },

    ehCelulaValida(labirinto, linha, coluna) {
        return linha >= 0 && linha < labirinto.length && coluna >= 0
            && coluna < labirinto.length && labirinto[linha][coluna] !== 1;
    },

    chegouAoFim(no, fim) {
        return no.linha === fim[0] && no.coluna === fim[1];
    },
};
