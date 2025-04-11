// Calculadora de 13º
function calcular13() {
    var salario = parseFloat(document.getElementById("salario13").value);
    var meses = parseFloat(document.getElementById("mesesTrabalhados").value);
    
    if(isNaN(salario) || isNaN(meses) || salario <= 0 || meses <= 0) {
        alert("Por favor, insira valores válidos e positivos.");
        return;
    }
    
    var resultado = (salario / 12) * meses;
    document.getElementById("resultado13").innerHTML = "Valor do 13º: R$ " + resultado.toFixed(2);
}

// Calculadora de Férias
function calcularFerias() {
    var salario = parseFloat(document.getElementById("salarioFerias").value);
    var dias = parseFloat(document.getElementById("diasFerias").value);
    
    if(isNaN(salario) || isNaN(dias) || salario <= 0 || dias <= 0) {
        alert("Por favor, insira valores válidos e positivos.");
        return;
    }
    
    var resultado = (salario / 30) * dias;
    document.getElementById("resultadoFerias").innerHTML = "Valor das Férias: R$ " + resultado.toFixed(2);
}

// Calculadora de Rescisão CLT
function calcularRescisao() {
    var salario = parseFloat(document.getElementById("salarioRescisao").value);
    var tempo = parseFloat(document.getElementById("tempoEmpresa").value);
    var aviso = parseFloat(document.getElementById("avisoPrevio").value);
    var fgts = parseFloat(document.getElementById("fgtsSaldo").value);
    
    if(isNaN(salario) || isNaN(tempo) || isNaN(aviso) || isNaN(fgts) || salario <= 0 || tempo <= 0 || aviso <= 0 || fgts < 0) {
        alert("Por favor, insira valores válidos e positivos.");
        return;
    }
    
    var rescisao = (salario * tempo) + (salario * aviso / 30) + fgts;
    document.getElementById("resultadoRescisao").innerHTML = "Valor da Rescisão: R$ " + rescisao.toFixed(2);
}

// Calculadora de Juros Compostos
function calcularJuros() {
    var capital = parseFloat(document.getElementById("capitalInicial").value);
    var taxa = parseFloat(document.getElementById("taxaJuros").value) / 100;
    var periodo = parseFloat(document.getElementById("periodoMeses").value);
    
    if(isNaN(capital) || isNaN(taxa) || isNaN(periodo) || capital <= 0 || taxa < 0 || periodo <= 0) {
        alert("Por favor, insira valores válidos e positivos.");
        return;
    }
    
    var montante = capital * Math.pow(1 + taxa, periodo);
    document.getElementById("resultadoJuros").innerHTML = "Montante com Juros Compostos: R$ " + montante.toFixed(2);
}
// JavaScript para ativar e desativar o menu hamburguer
document.getElementById('hamburger').addEventListener('click', function() {
    document.querySelector('.navbar').classList.toggle('active');
});
document.getElementById('analisarBtn').addEventListener('click', analisarInvestimentos);

// Exibe a animação de carregamento
function showLoading() {
    document.getElementById('loading').style.display = 'flex';
}

// Esconde a animação de carregamento
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Função para buscar dados da API
async function fetchData(url) {
    showLoading();
    const response = await fetch(url);
    const data = await response.json();
    hideLoading();
    return data;
}
//Caulcular FGTS
function calcularFgts() {
    const salarioFgts = parseFloat(document.getElementById('salarioFgts').value) || 0;
    const mesesFgts = parseInt(document.getElementById('mesesFgts').value) || 0;
    const resultadoFgts = salarioFgts * 0.08 * mesesFgts;
    document.getElementById('resultadoFgts').innerText = `Saldo de FGTS: R$ ${resultadoFgts.toFixed(2)}`;
}
//Caulcular Poupança
function calcularPoupanca() {
    const valorPoupanca = parseFloat(document.getElementById('valorPoupanca').value) || 0;
    const taxaPoupanca = parseFloat(document.getElementById('taxaPoupanca').value) / 100 || 0;
    const mesesPoupanca = parseInt(document.getElementById('mesesPoupanca').value) || 0;
    let montante = valorPoupanca;

    for (let i = 0; i < mesesPoupanca; i++) {
        montante += montante * taxaPoupanca;
    }

    document.getElementById('resultadoPoupanca').innerText = `Saldo na Poupança: R$ ${montante.toFixed(2)}`;
}
//Caulcular Financiamento
function calcularFinanciamento() {
    const valorFinanciamento = parseFloat(document.getElementById('valorFinanciamento').value) || 0;
    const taxaFinanciamento = parseFloat(document.getElementById('taxaFinanciamento').value) / 100 || 0;
    const parcelasFinanciamento = parseInt(document.getElementById('parcelasFinanciamento').value) || 0;

    const parcela = (valorFinanciamento * taxaFinanciamento) / 
        (1 - Math.pow(1 + taxaFinanciamento, -parcelasFinanciamento));

    document.getElementById('resultadoFinanciamento').innerText = 
        `Valor da Parcela: R$ ${parcela.toFixed(2)}`;

       
}
//Caular independencia financeira 
function calcularFIRE() {
    const despesaAnual = parseFloat(document.getElementById('despesaAnual').value) || 0;
    const poupancaMensal = parseFloat(document.getElementById('poupancaMensal').value) || 0;
    const taxaRendimento = parseFloat(document.getElementById('taxaRendimento').value) || 0;
    const saldoAtual = parseFloat(document.getElementById('saldoAtual').value) || 0;

    if (despesaAnual === 0 || poupancaMensal === 0 || taxaRendimento === 0) {
        document.getElementById('resultadoFIRE').innerText = 'Por favor, preencha todos os campos.';
        return;
    }

    const taxaMensal = Math.pow(1 + taxaRendimento / 100, 1 / 12) - 1; // Converte taxa anual para mensal
    const fireTarget = despesaAnual * 25; // Regra dos 4% (25x despesas anuais)
    let saldo = saldoAtual;
    let meses = 0;

    while (saldo < fireTarget) {
        saldo = (saldo + poupancaMensal) * (1 + taxaMensal);
        meses++;
    }

    const anos = Math.floor(meses / 12);
    const mesesRestantes = meses % 12;

    document.getElementById('resultadoFIRE').innerText = 
        `Você alcançará sua independência financeira em ${anos} anos e ${mesesRestantes} meses. 
        Montante necessário: R$ ${fireTarget.toFixed(2)}`;
}

// scripts.js - Navegação suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


let investimentos = [];

function adicionarInvestimento() {
    const ativo = document.createElement('div');
    ativo.classList.add('investimento');

    ativo.innerHTML = `
        <label for="ativo">Ativo:</label>
        <input type="text" class="ativo" placeholder="Exemplo: Ação X">
        
        <label for="valor">Valor Investido:</label>
        <input type="number" class="valor" placeholder="Valor em R$">
        
        <label for="rentabilidade">Rentabilidade (%):</label>
        <input type="number" class="rentabilidade" placeholder="Rentabilidade do Ativo">
        
        <label for="risco">Risco do Ativo (1-10):</label>
        <input type="number" class="risco" placeholder="Classificação de Risco" min="1" max="10">
    `;

    document.getElementById('investimentos').appendChild(ativo);
}

function calcularPortifolio() {
    const ativos = document.querySelectorAll('.ativo');
    const valores = document.querySelectorAll('.valor');
    const rentabilidades = document.querySelectorAll('.rentabilidade');
    const riscos = document.querySelectorAll('.risco');

    const aporteMensal = parseFloat(document.getElementById('aporteMensal').value) || 0;
    const anosProjecao = parseInt(document.getElementById('anosProjecao').value) || 0;
    const impostoCapital = parseFloat(document.getElementById('impostoCapital').value) / 100 || 0;

    let valorTotal = 0;
    let rentabilidadeTotal = 0;
    let labels = [];
    let dataRentabilidade = [];
    let dataDiversificacao = [];
    let evolucaoPortifolio = [];
    let rentabilidadeAcumulada = 0;
    let riscoTotal = 0;

    for (let i = 0; i < ativos.length; i++) {
        let valor = parseFloat(valores[i].value);
        let rentabilidade = parseFloat(rentabilidades[i].value);
        let risco = parseInt(riscos[i].value);

        if (isNaN(valor) || isNaN(rentabilidade) || isNaN(risco) || valor <= 0 || rentabilidade <= 0 || risco < 1 || risco > 10) {
            alert('Por favor, preencha todos os campos corretamente!');
            return;
        }

        valorTotal += valor;
        rentabilidadeTotal += (valor * rentabilidade) / 100;

        // Rentabilidade acumulada com juros compostos
        let rentabilidadeFutura = valor * Math.pow(1 + rentabilidade / 100, anosProjecao);

        // Impostos sobre o ganho de capital
        let ganhoDeCapital = rentabilidadeFutura - valor;
        let imposto = ganhoDeCapital * impostoCapital;
        let lucroLiquido = ganhoDeCapital - imposto;

        rentabilidadeAcumulada += lucroLiquido;

        // Atualização das informações para gráficos
        labels.push(ativos[i].value || `Ativo ${i + 1}`);
        dataRentabilidade.push(rentabilidade);
        dataDiversificacao.push((valor / valorTotal) * 100);

        // Cálculo de valorização do portfólio ao longo do tempo com aportes mensais
        for (let ano = 0; ano < anosProjecao; ano++) {
            let valorAno = valor * Math.pow(1 + rentabilidade / 100, ano); // Rentabilidade composta
            valorAno += aporteMensal * ((Math.pow(1 + rentabilidade / 100, ano) - 1) / (rentabilidade / 100)); // Aporte mensal
            evolucaoPortifolio.push(valorAno);
        }

        // Cálculo de risco total do portfólio
        riscoTotal += risco * (valor / valorTotal);
    }

    // Exibindo resultados no HTML
    document.getElementById('rentabilidadeTotal').innerText = `Rentabilidade total do portfólio (líquido de impostos): R$ ${rentabilidadeAcumulada.toFixed(2)}`;
    document.getElementById('diversificacao').innerText = `Valor total investido: R$ ${valorTotal.toFixed(2)}, Risco Total do Portfólio: ${riscoTotal.toFixed(2)}`;

    gerarGraficoRentabilidade(labels, dataRentabilidade);
    gerarGraficoDiversificacao(labels, dataDiversificacao);
    gerarGraficoEvolucao(evolucaoPortifolio, anosProjecao);
}

function gerarGraficoRentabilidade(labels, dataRentabilidade) {
    const ctx = document.getElementById('graficoRentabilidade').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Rentabilidade (%)',
                data: dataRentabilidade,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.raw}%`;
                        }
                    }
                }
            }
        }
    });
}

function gerarGraficoDiversificacao(labels, dataDiversificacao) {
    const ctx = document.getElementById('graficoDiversificacao').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Diversificação (%)',
                data: dataDiversificacao,
                backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
}

function gerarGraficoEvolucao(evolucao, anos) {
    const ctx = document.getElementById('graficoEvolucao').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: anos }, (_, i) => `Ano ${i + 1}`),
            datasets: [{
                label: 'Evolução do Portfólio',
                data: evolucao,
                borderColor: '#FF6347',
                backgroundColor: 'rgba(255, 99, 71, 0.2)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `R$ ${tooltipItem.raw.toFixed(2)}`;
                        }
                    }
                }
            }
        }
    });
}
// calculadora do Dashboard Financeiro
