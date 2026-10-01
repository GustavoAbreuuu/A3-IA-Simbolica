// Coordena a criação, a busca, a interface e a animação do labirinto.
window.LabirintoApp = {
    configuracao: { tamanho: 10, energiaInicial: 50, inicio: [0, 0], fim: [9, 9] },
    estado: { labirinto: [], caminho: [], energia: 50, totalMovimentos: 0, animacaoId: null },
};

function gerarLabirinto() {
    const app = window.LabirintoApp;
    app.Animation.parar();
    app.estado.labirinto = app.Maze.criar();
    app.estado.caminho = app.Pathfinding.encontrar(app.estado.labirinto, app.configuracao.inicio, app.configuracao.fim);
    app.estado.energia = app.configuracao.energiaInicial;
    app.estado.totalMovimentos = Math.max(app.estado.caminho.length - 1, 0);
    app.UI.renderizarLabirinto(app.estado.labirinto);
    app.UI.atualizarInformacoes(app.estado.caminho, app.estado.energia, app.estado.totalMovimentos);
    if (app.estado.caminho.length > 0) app.Animation.iniciar(app.estado.caminho);
}

window.gerarLabirinto = gerarLabirinto;
window.addEventListener("DOMContentLoaded", gerarLabirinto);
