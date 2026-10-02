// Centraliza as regras de consumo e recuperação de energia.
window.LabirintoApp.Energy = {
    calcularProxima(energiaAtual, valorDaCelula) {
        if (valorDaCelula === 5 || valorDaCelula === 10) return energiaAtual - 1 + valorDaCelula;
        return energiaAtual - 1;
    },

    ehSuficiente(energia) {
        return energia > 0;
    },
};
