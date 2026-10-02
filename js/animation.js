// Anima o caminho validado pelos algoritmos, uma célula a cada 300 ms.
window.LabirintoApp.Animation = {
    iniciar(caminho) {
        const app = window.LabirintoApp;
        let indice = 0;
        const avancar = () => {
            if (indice > 0) {
                const [linhaAnterior, colunaAnterior] = caminho[indice - 1];
                this.celula(linhaAnterior, colunaAnterior).classList.remove("robot", "robot-animacao");
            }
            const [linha, coluna] = caminho[indice];
            this.celula(linha, coluna).classList.add("robot", "robot-animacao");
            if (indice > 0) app.estado.energia = app.Energy.calcularProxima(app.estado.energia, app.estado.labirinto[linha][coluna]);

            app.UI.adicionarMovimento([linha, coluna], app.estado.energia, indice);
            indice++;
            if (indice >= caminho.length) {
                this.parar();
                app.UI.mostrarStatus("Robô chegou ao destino.");
                return;
            }
            app.estado.animacaoId = window.setTimeout(avancar, 300);
        };
        avancar();
    },

    parar() {
        const { estado } = window.LabirintoApp;
        if (estado.animacaoId !== null) window.clearTimeout(estado.animacaoId);
        estado.animacaoId = null;
    },

    celula(linha, coluna) {
        return document.querySelector(`td[data-linha="${linha}"][data-coluna="${coluna}"]`);
    },
};
