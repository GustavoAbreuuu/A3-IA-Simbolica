// Coordena a geração do labirinto, a estratégia de busca e a animação.
window.LabirintoApp = {
    configuracao: {
        tamanho: 10,
        energiaInicial: 50,
        inicio: [0, 0],
        fim: [9, 9],
        energiasDe5: 5,
        energiasDe10: 3,
    },
    estado: {
        labirinto: [],
        caminho: [],
        energia: 50,
        totalMovimentos: 0,
        animacaoId: null,
    },
};

function gerarLabirinto() {
    const app = window.LabirintoApp;
    const algoritmo = document.getElementById("algoritmo").value;

    app.Animation.parar();
    app.estado.labirinto = app.Maze.criar();
    app.estado.energia = app.configuracao.energiaInicial;
    app.UI.renderizarLabirinto(app.estado.labirinto);
    app.UI.atualizarInformacoes([], app.estado.energia, 0);

    const resultado = app.Pathfinding.encontrar(
        algoritmo,
        app.estado.labirinto,
        app.configuracao.inicio,
        app.configuracao.fim,
        app.configuracao.energiaInicial,
    );

    if (!resultado) {
        app.estado.caminho = [];
        app.UI.mostrarStatus("Não há caminho possível com a energia disponível.");
        return;
    }

    app.estado.caminho = resultado.caminho;
    app.estado.totalMovimentos = Math.max(resultado.caminho.length - 1, 0);
    app.UI.mostrarStatus(`Caminho encontrado com ${algoritmo.toUpperCase()}.`);
    app.Animation.iniciar(resultado.caminho);
}

window.gerarLabirinto = gerarLabirinto;
window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("algoritmo").addEventListener("change", gerarLabirinto);
    gerarLabirinto();
});
