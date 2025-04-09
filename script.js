
const quizData = [
  {
    question: 'Qual é o sabor mais vendido da Cacau Show?',
    options: ['Chocolate ao Leite', 'Branco', 'Amargo', 'Meio Amargo'],
    answer: 'Chocolate ao Leite'
  },
  {
    question: 'Em que ano foi fundada a Cacau Show?',
    options: ['1988', '1995', '2001', '1998'],
    answer: '1988'
  },
  {
    question: 'Qual desses produtos é um clássico da Cacau Show?',
    options: ['Trufa', 'Panetone', 'Cookie', 'Brownie'],
    answer: 'Trufa'
  }
];

let current = 0;
let score = 0;
let quizEl = document.getElementById('quiz');

function startQuiz() {
  document.getElementById('start-screen').style.display = 'none';
  quizEl.style.display = 'block';
  renderQuestion();
}

function renderQuestion() {
  let q = quizData[current];
  let html = `<h2>${q.question}</h2>`;
  q.options.forEach(opt => {
    html += `<button onclick="selectAnswer('${opt}')">${opt}</button>`;
  });
  quizEl.innerHTML = html;
}

function selectAnswer(answer) {
  if (answer === quizData[current].answer) score++;
  current++;
  if (current < quizData.length) {
    renderQuestion();
  } else {
    renderForm();
  }
}

function renderForm() {
  quizEl.innerHTML = `
    <div class="confetti"></div>
    <h2>🎊 Você acertou ${score} de ${quizData.length} perguntas!</h2>
    <p>Insira seus dados para calcular o frete e receber seu presente:</p>
    <input type="text" id="nome" placeholder="Nome completo" />
    <input type="text" id="cpf" placeholder="CPF" oninput="this.value=formatCpf(this.value)" />
    <input type="text" id="cep" placeholder="CEP" oninput="this.value=formatCep(this.value)" />
    <button onclick="calcularFrete()">Calcular Frete</button>
    <div id="status" class="mt-4"></div>
  `;
}

function calcularFrete() {
  document.getElementById('status').innerHTML = '<div class="loader"></div> Calculando frete...';
  setTimeout(() => {
    quizEl.innerHTML = `
      <h2>✅ Frete calculado: R$20,00</h2>
      <p>Clique abaixo para pagar e receber seu ovo de Páscoa:</p>
      <button class="button" onclick="mostrarEscolhaDeOvo()">Pagar Frete e Receber Ovo</button>
    `;
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 }
    });
  }, 2000);
}

function mostrarEscolhaDeOvo() {
  setTimeout(() => {
    quizEl.innerHTML = `
      <h2>🍫 Escolha seu Ovo de Páscoa</h2><p>Selecione abaixo e prossiga para o pagamento do frete:</p>
      <div class="ovo-options">
        <img src="https://static.paodeacucar.com/img/uploads/1/136/19916136.jpg" alt="Ovo 1" onclick="redirectToCheckout()" />
        <img src="https://images-americanas.b2w.io/produtos/1613072891/imagens/cacau-show-ovo-dreams-mil-folhas-400g/1613072904_1_xlarge.jpg" alt="Ovo 2" onclick="redirectToCheckout()" />
        <img src="https://http2.mlstatic.com/D_962607-MLB49627141121_042022-F.webp" alt="Ovo 3" onclick="redirectToCheckout()" />
      </div>
    `;
  }, 1000);
}

function formatCpf(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function formatCep(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .substring(0, 9);
}


function redirectToCheckout() {
  window.location.href = "https://pay.kiwify.com.br/aIEcNcQ";
}
