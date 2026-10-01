// Cria a matriz: 0 = livre, 1 = obstáculo, 5 e 10 = energia.
window.LabirintoApp.Maze = {
    criar() {
        const { tamanho, inicio, fim } = window.LabirintoApp.configuracao;
        const labirinto = [];
        let energiasDe5 = 5;
        let energiasDe10 = 3;
        for (let linha = 0; linha < tamanho; linha++) {
            const novaLinha = [];
            for (let coluna = 0; coluna < tamanho; coluna++) {
                const ehInicio = linha === inicio[0] && coluna === inicio[1];
                const ehFim = linha === fim[0] && coluna === fim[1];
                if (ehInicio || ehFim) { novaLinha.push(0); continue; }
                const aleatorio = Math.random();
                if (aleatorio < 0.2) novaLinha.push(1);
                else if (aleatorio < 0.35 && energiasDe5 > 0) {
                    novaLinha.push(5);
                    energiasDe5--;
                } else if (aleatorio < 0.45 && energiasDe10 > 0) {
                    novaLinha.push(10);
                    energiasDe10--;
                }
                else novaLinha.push(0);
            }
            labirinto.push(novaLinha);
        }
        return labirinto;
    },
};
