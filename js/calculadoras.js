// Espera o documento HTML ser completamente carregado para rodar o script
document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DA CALCULADORA 1: CONSUMO DE COMBUSTÍVEL ---
    const btnCalcularConsumo = document.getElementById('btnCalcularConsumo');

    btnCalcularConsumo.addEventListener('click', function() {
        // Pega os valores dos campos, trocando vírgula por ponto para o cálculo
        const distanciaStr = document.getElementById('distancia').value.replace(',', '.');
        const consumoStr = document.getElementById('consumo').value.replace(',', '.');
        const precoStr = document.getElementById('precoCombustivel').value.replace(',', '.');

        // Converte para número
        const distancia = parseFloat(distanciaStr);
        const consumo = parseFloat(consumoStr);
        const preco = parseFloat(precoStr);
        const resultadoDiv = document.getElementById('resultadoConsumo');

        // Validação: verifica se os campos são números válidos e maiores que zero
        if (isNaN(distancia) || isNaN(consumo) || isNaN(preco) || distancia <= 0 || consumo <= 0 || preco <= 0) {
            resultadoDiv.innerHTML = 'Por favor, preencha todos os campos com valores válidos.';
            return; // Para a execução se os valores forem inválidos
        }

        const litrosNecessarios = distancia / consumo;
        const custoTotal = litrosNecessarios * preco;

        // Formata os resultados com 2 casas decimais e TROCA O PONTO POR VÍRGULA para exibição
        const litrosFormatado = litrosNecessarios.toFixed(2).replace('.', ',');
        const custoFormatado = custoTotal.toFixed(2).replace('.', ',');

        // Exibe o resultado formatado para o usuário
        resultadoDiv.innerHTML = `Você precisará de <strong>${litrosFormatado} litros</strong>.<br>Custo total: <strong>R$ ${custoFormatado}</strong>.`;
    });


    // --- LÓGICA DA CALCULADORA 2: ÁLCOOL OU GASOLINA ---
    const btnCalcularAlcoolGasolina = document.getElementById('btnCalcularAlcoolGasolina');

    btnCalcularAlcoolGasolina.addEventListener('click', function() {
        // Pega os valores, trocando vírgula por ponto
        const precoAlcoolStr = document.getElementById('precoAlcool').value.replace(',', '.');
        const precoGasolinaStr = document.getElementById('precoGasolina').value.replace(',', '.');

        const precoAlcool = parseFloat(precoAlcoolStr);
        const precoGasolina = parseFloat(precoGasolinaStr);
        const resultadoDiv = document.getElementById('resultadoAlcoolGasolina');

        if (isNaN(precoAlcool) || isNaN(precoGasolina) || precoAlcool <= 0 || precoGasolina <= 0) {
            resultadoDiv.innerHTML = 'Preencha os dois preços para verificar.';
            return;
        }

        // A regra geral é que o álcool vale a pena se custar até 70% do valor da gasolina
        const relacao = precoAlcool / precoGasolina;

        if (relacao < 0.7) {
            resultadoDiv.innerHTML = 'É mais vantajoso abastecer com <strong>Álcool</strong>.';
        } else {
            resultadoDiv.innerHTML = 'É mais vantajoso abastecer com <strong>Gasolina</strong>.';
        }
    });


    // --- LÓGICA DA CALCULADORA 3: CONTADOR DE DIAS ---
    const btnCalcularDias = document.getElementById('btnCalcularDias');

    btnCalcularDias.addEventListener('click', function() {
        const dataInicialStr = document.getElementById('dataInicial').value;
        const dataFinalStr = document.getElementById('dataFinal').value;
        const resultadoDiv = document.getElementById('resultadoDias');

        if (!dataInicialStr || !dataFinalStr) {
            resultadoDiv.innerHTML = 'Por favor, selecione as duas datas.';
            return;
        }

        const dataInicial = new Date(dataInicialStr + 'T00:00:00');
        const dataFinal = new Date(dataFinalStr + 'T00:00:00');
        
        if (dataFinal < dataInicial) {
            resultadoDiv.innerHTML = 'A data final deve ser depois da data inicial.';
            return;
        }

        const diferencaEmMs = dataFinal.getTime() - dataInicial.getTime();
        const diferencaEmDias = Math.round(diferencaEmMs / (1000 * 60 * 60 * 24)); // Usando Math.round para garantir número inteiro

        if (diferencaEmDias === 1) {
            resultadoDiv.innerHTML = `A diferença é de <strong>1 dia</strong>.`;
        } else {
            resultadoDiv.innerHTML = `A diferença é de <strong>${diferencaEmDias} dias</strong>.`;
        }
    });

});