// Calcula a energia após cada movimento do robô.
window.LabirintoApp.Energy = {
    calcularProxima(energiaAtual, valorDaCelula) {
        return valorDaCelula === 5 || valorDaCelula === 10 ? energiaAtual + valorDaCelula : energiaAtual - 1;
    },
};
