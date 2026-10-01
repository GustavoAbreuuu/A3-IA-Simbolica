// Anima o robô no caminho encontrado e atualiza a energia a cada passo.
window.LabirintoApp.Animation = {
    iniciar(caminho) {
        const app = window.LabirintoApp;
        let indice = 0;
        const executarPasso = () => {
            if (indice > 0) {
                const [linhaAnterior, colunaAnterior] = caminho[indice - 1];
                this.celula(linhaAnterior, colunaAnterior).classList.remove("robot");
            }
            const [linha, coluna] = caminho[indice];
            this.celula(linha, coluna).classList.add("robot");
            if (indice > 0) {
                app.estado.energia = app.Energy.calcularProxima(app.estado.energia, app.estado.labirinto[linha][coluna]);
                app.UI.atualizarEnergia(app.estado.energia);
            }
            indice++;
            if (indice >= caminho.length) this.parar();
        };
        executarPasso();
        app.estado.animacaoId = window.setInterval(executarPasso, 500);
    },
    parar() {
        const { estado } = window.LabirintoApp;
        if (estado.animacaoId !== null) { window.clearInterval(estado.animacaoId); estado.animacaoId = null; }
    },
    celula(linha, coluna) { return document.querySelector("table").rows[linha + 1].cells[coluna + 1]; },
};
