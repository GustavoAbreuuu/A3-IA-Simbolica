// Desenha o labirinto e mantém a interface sincronizada com a execução.
window.LabirintoApp.UI = {
    renderizarLabirinto(labirinto) {
        const { tamanho, inicio, fim } = window.LabirintoApp.configuracao;
        const tabela = document.createElement("table");
        const cabecalho = document.createElement("tr");
        cabecalho.appendChild(document.createElement("th"));
        for (let coluna = 0; coluna < tamanho; coluna++) {
            const th = document.createElement("th");
            th.textContent = String.fromCharCode(65 + coluna);
            cabecalho.appendChild(th);
        }
        tabela.appendChild(cabecalho);

        labirinto.forEach((linha, indiceLinha) => {
            const tr = document.createElement("tr");
            const rotulo = document.createElement("th");
            rotulo.textContent = indiceLinha + 1;
            tr.appendChild(rotulo);
            linha.forEach((valor, indiceColuna) => {
                const td = document.createElement("td");
                const ehInicio = indiceLinha === inicio[0] && indiceColuna === inicio[1];
                const ehFim = indiceLinha === fim[0] && indiceColuna === fim[1];
                td.dataset.linha = indiceLinha;
                td.dataset.coluna = indiceColuna;
                if (ehInicio) { td.className = "start"; td.textContent = "S"; }
                else if (ehFim) { td.className = "end"; td.textContent = "E"; }
                else if (valor === 1) { td.className = "obstacle"; td.textContent = "X"; }
                else if (valor === 5 || valor === 10) { td.className = "energy"; td.textContent = valor; }
                else td.className = "clear";
                tr.appendChild(td);
            });
            tabela.appendChild(tr);
        });
        document.getElementById("labirinto").replaceChildren(tabela);
    },

    atualizarInformacoes(caminho, energia, totalMovimentos) {
        document.getElementById("movimentos").replaceChildren(...caminho.map((posicao) => this.criarItemMovimento(posicao)));
        document.getElementById("energia").textContent = energia;
        document.getElementById("total-movimentos").textContent = totalMovimentos;
    },

    adicionarMovimento(posicao, energia, totalMovimentos) {
        document.getElementById("movimentos").appendChild(this.criarItemMovimento(posicao));
        document.getElementById("energia").textContent = energia;
        document.getElementById("total-movimentos").textContent = totalMovimentos;
    },

    criarItemMovimento([linha, coluna]) {
        const item = document.createElement("li");
        item.textContent = `${String.fromCharCode(65 + coluna)}${linha + 1}`;
        return item;
    },

    mostrarStatus(mensagem) { document.getElementById("status").textContent = mensagem; },
};
