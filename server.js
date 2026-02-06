const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

/* =========================
   EQUIPE DIGITAL (AGENTES)
========================= */

class ArquitetoDigital {
  responder() {
    return `
🏗️ ARQUITETO DIGITAL:
Vou estruturar sites e agentes digitais.
Meu foco é criar sistemas automáticos que geram clientes.
Sugestão: usar site + agente de IA juntos para conversão.
`;
  }
}

class EstrategistaDigital {
  responder() {
    return `
🎯 ESTRATEGISTA DIGITAL:
Vou analisar o mercado e definir a melhor estratégia.
Sugestão: escolher um nicho, criar oferta clara e tráfego.
Estratégia vem antes da execução.
`;
  }
}

class ParceiroDigital {
  responder() {
    return `
🤝 PARCEIRO DIGITAL:
Vou responder dúvidas e orientar passo a passo.
Sugestão prática: comece com um site simples + WhatsApp.
Estou aqui para te ajudar no dia a dia.
`;
  }
}

/* =========================
   APLICATIVO CENTRAL
========================= */

class AppMercadoDigital {
  constructor() {
    self = this;
    this.arquiteto = new ArquitetoDigital();
    this.estrategista = new EstrategistaDigital();
    this.parceiro = new ParceiroDigital();
  }

  processarPergunta(pergunta) {
    const texto = pergunta.toLowerCase();

    if (texto.includes("site") || texto.includes("agente")) {
      return this.arquiteto.responder();
    }

    if (texto.includes("estratégia") || texto.includes("ganhar dinheiro")) {
      return this.estrategista.responder();
    }

    return this.parceiro.responder();
  }
}

const appDigital = new AppMercadoDigital();

/* =========================
   DADOS DO MARKETPLACE
========================= */

let agents = [
  { id: 1, name: "Agente de Atendimento com IA", price: 97 },
  { id: 2, name: "Agente de Automação Instagram", price: 147 }
];

let orders = [];

/* =========================
   ROTAS DE API
========================= */

app.get("/agents", (req, res) => {
  res.json(agents);
});

app.post("/buy-agent", (req, res) => {
  const { agentId, email } = req.body;
  orders.push({ agentId, email, date: new Date() });
  res.json({ success: true });
});

app.post("/schedule-traffic", (req, res) => {
  res.json({ message: "Agendamento recebido com sucesso" });
});

app.post("/agent-chat", (req, res) => {
  const { message } = req.body;
  const resposta = appDigital.processarPergunta(message);
  res.json({ response: resposta });
});

/* =========================
   SITE (HTML + CSS + JS)
========================= */

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Mercado Digital IA</title>
<style>
body { font-family: Arial; background: #f4f4f4; padding: 20px; }
section { background: #fff; padding: 15px; margin-bottom: 20px; border-radius: 6px; }
button { padding: 8px; cursor: pointer; }
input { padding: 6px; width: 100%; margin-bottom: 6px; }
pre { white-space: pre-wrap; }
</style>
</head>

<body>

<h1>🚀 Mercado Digital IA</h1>

<section>
<h2>Comprar Agentes Digitais</h2>
<div id="agents"></div>
</section>

<section>
<h2>Agendar Tráfego Pago</h2>
<input id="name" placeholder="Nome">
<input id="email" placeholder="Email">
<input id="budget" placeholder="Orçamento">
<button onclick="scheduleTraffic()">Agendar</button>
</section>

<section>
<h2>Equipe Digital (Agentes)</h2>
<input id="chatInput" placeholder="Pergunte sobre site, agente ou estratégia">
<button onclick="sendChat()">Enviar</button>
<pre id="chatResponse"></pre>
</section>

<script>
async function loadAgents() {
  const res = await fetch("/agents");
  const agents = await res.json();
  const div = document.getElementById("agents");
  div.innerHTML = "";
  agents.forEach(a => {
    div.innerHTML += \`
      <p>\${a.name} - R$\${a.price}</p>
      <button onclick="buyAgent(\${a.id})">Comprar</button>
    \`;
  });
}

async function buyAgent(id) {
  const email = prompt("Digite seu email:");
  await fetch("/buy-agent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ agentId: id, email })
  });
  alert("Compra registrada!");
}

async function scheduleTraffic() {
  await fetch("/schedule-traffic", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      budget: budget.value
    })
  });
  alert("Agendamento enviado!");
}

async function sendChat() {
  const msg = chatInput.value;
  const res = await fetch("/agent-chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg })
  });
  const data = await res.json();
  chatResponse.textContent = data.response;
}

loadAgents();
</script>

</body>
</html>
`);
});

/* =========================
   SERVIDOR
========================= */

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
