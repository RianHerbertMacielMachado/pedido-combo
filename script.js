const precos = {
  pequeno: {normal: 1500, mecanica: 1275},
  medio: {normal: 3500, mecanica: 2800},
  grande: {normal: 6500, mecanica: 5200},
  kids: {normal: 3600, mecanica: 2880},
  policial: {normal: 7200, mecanica: 7200},
  avulso: {normal: 0, mecanica: 0}
};

const receitas = {
  cupcake: {chocolate: 1, leite: 1, pao: 1, tipo: 'comida'},
  cappuccino: {chocolate: 2, leite: 2, cafe: 5, tipo: 'bebida'},
  catburger: {pao: 2, ketchup: 3, carne: 1, tipo: 'comida'},
  catcafe: {chocolate: 2, leite: 2, cafe: 2, tipo: 'bebida'},
  maca: {agua: 1, acucar: 5, maca: 1, tipo: 'sobremesa'},
  milkshake: {chocolate: 2, leite: 2, tipo: 'bebida'}
};

function calcular() {
  const ingredientes = {};
  let total = 0;

  const parceria = document.getElementById('parceria').value;
  const combo = document.getElementById('combo').value;
  const qtdCombo = parseInt(document.getElementById('qtdCombo').value);

  const produtosSelecionados = {};

  for (let produto in receitas) {
    const qtd = parseInt(document.getElementById(produto).value || 0);
    produtosSelecionados[produto] = qtd;
  }

  let preco = precos[combo].normal;
  if (parceria === 'mecanica' && combo !== 'policial') {
    preco = precos[combo].mecanica;
  }
  total += preco * qtdCombo;

  for (let produto in receitas) {
    const qtd = produtosSelecionados[produto];
    for (let ing in receitas[produto]) {
      if (ing !== 'tipo') {
        ingredientes[ing] = (ingredientes[ing] || 0) + receitas[produto][ing] * qtd;
      }
    }
  }

  let html = '';
  for (let ing in ingredientes) {
    html += `<div>${ing}: ${ingredientes[ing]}</div>`;
  }
  document.getElementById('ingredientes').innerHTML = html;
  document.getElementById('total').innerText = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;

  window.dadosPedido = {
    combo,
    parceria,
    produtos: produtosSelecionados,
    ingredientes,
    total
  };
}

function salvar() {
  const senha = document.getElementById("senha").value;
  if (senha !== "123") {
    alert("Senha incorreta!");
    return;
  }

  if (!window.dadosPedido) {
    alert("Por favor, calcule o pedido antes de salvar.");
    return;
  }

  fetch("https://script.google.com/macros/s/AKfycbykpwtTse6eClAYo_4Wvkw9dbwHjKvDRvbNUc5vK-iEWNJyNJH2-8CFFs_wDBKJ-j_M/exec", {
    method: "POST",
    body: JSON.stringify(window.dadosPedido),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(res => alert("Pedido salvo com sucesso!"))
  .catch(err => alert("Erro ao salvar pedido: " + err));
}

function mostrar() {
  window.open("https://docs.google.com/spreadsheets/d/1pzQlyu3AjYqbCdFBzkOn7CaVAGSCFtMo-QfDvCIRTvs", "_blank");
}
