// ========== 1. DADOS ==========
// Array = lista onde ficam TODOS os orçamentos. Começa vazio.
let orcamentos = [];
// Guarda o ID do item que estamos editando. null = estamos criando um novo.
let editandoId = null;
// Guarda a foto temporária (em texto base64) antes de salvar
let fotoTemp = "";

// Tabela de preços: Serviço -> Detalhe -> Preço
// Ex: SERVICOS["Pintura"]["Capô"] = 500
const SERVICOS = {
  "Pintura": {"Capô": 500, "Portas": 800, "Teto": 700, "Para-choque": 400, "Carro inteiro": 3500},
  "Funilaria": {"Amassados": 300, "Portas": 600, "Capô": 500, "Teto": 700, "Lateral": 600},
  "Polimento": {"Polimento simples": 150, "Polimento comercial": 300, "Polimento técnico": 500},
  "Martelinho de ouro": {"Portas": 250, "Capô": 300, "Teto": 400, "Lateral": 350}
};

// ========== 2. FOTO ==========
// Quando o usuário escolhe um arquivo, lê a foto e mostra o preview
document.getElementById('foto').addEventListener('change', function(e){
  const file = e.target.files[0]; // Pega o primeiro arquivo
  if(!file) return; // Se não escolheu nada, para
  const reader = new FileReader(); // Leitor de arquivo do navegador
  reader.onload = function(ev){
    fotoTemp = ev.target.result; // Salva a foto como texto
    const prev = document.getElementById('preview-foto');
    prev.src = fotoTemp; prev.classList.remove('hidden'); // Mostra o preview
  };
  reader.readAsDataURL(file); // Converte a foto pra texto
});

// ========== 2.1 MÁSCARA DA DATA (CORREÇÃO) ==========
// Problema antigo: type="date" no celular só deixava digitar 1 número.
// Agora usamos type="text" e essa máscara coloca as / sozinha.
// Você digita 25112026 e vira 25/11/2026 automaticamente.
document.getElementById('data').addEventListener('input', function(e){
  let v = e.target.value.replace(/\D/g, ''); // Tira tudo que não é número
  if(v.length > 2) v = v.slice(0,2) + '/' + v.slice(2); // Depois do dia, põe /
  if(v.length > 5) v = v.slice(0,5) + '/' + v.slice(5); // Depois do mês, põe /
  e.target.value = v.slice(0,10); // Trava em 10 caracteres: DD/MM/AAAA
});

// ========== 3. TROCAR DE TELA ==========
// Mostra uma tela e esconde a outra usando a classe 'hidden'
function mostrarTela(tela){
  document.getElementById('tela-lista').classList.toggle('hidden', tela !== 'lista');
  document.getElementById('tela-cadastro').classList.toggle('hidden', tela !== 'cadastro');
  if(tela === 'lista') renderizar(); // Ao voltar pra lista, atualiza ela
  if(tela === 'cadastro' && !editandoId){
    document.getElementById('titulo-cadastro').textContent = 'Cadastro de serviço';
  }
}

// ========== 4. DETALHES E PREÇO ==========
// Quando muda o serviço, carrega os detalhes daquele serviço
function atualizarDetalhes(){
  const servico = document.getElementById('servico').value;
  const select = document.getElementById('detalhe');
  select.innerHTML = '<option value="">Escolha...</option>'; // Limpa o select
  if(!servico) return; // Se não escolheu, para
  // Para cada detalhe do serviço, cria uma <option> com preço
  for(let d in SERVICOS[servico]){
    let o = document.createElement('option'); o.value = d; o.text = d + ' - R$ ' + SERVICOS[servico][d]; select.appendChild(o);
  }
  select.onchange = mostrarPreco; // Quando mudar o detalhe, mostra o preço
}

// Mostra o preço total na caixinha verde
function mostrarPreco(){
  const s = document.getElementById('servico').value; const d = document.getElementById('detalhe').value;
  const div = document.getElementById('info-preco');
  if(s && d){ div.textContent = 'Valor total: R$ ' + SERVICOS[s][d]; div.classList.remove('hidden'); }
  else div.classList.add('hidden');
}

// Mostra as parcelas SÓ se for "Crédito parcelado"
function mostrarParcelas(){
  document.getElementById('div-parcelas').classList.toggle('hidden', document.getElementById('forma').value !== 'Crédito parcelado');
}

// ========== 5. LIMPAR FORMULÁRIO ==========
// Zera todos os campos depois de salvar
function limparForm(){
  editandoId = null; fotoTemp = "";
  ['nome','telefone','carro','placa','data'].forEach(id => document.getElementById(id).value='');
  document.getElementById('servico').value=''; document.getElementById('detalhe').innerHTML='<option value="">Escolha o serviço primeiro</option>';
  document.getElementById('info-preco').classList.add('hidden');
  document.getElementById('preview-foto').classList.add('hidden');
  document.getElementById('foto').value='';
  document.getElementById('status').value='Aguardando';
}

// ========== 6. SALVAR (CRIAR OU EDITAR) ==========
function salvar(){
  // 1. Pega os valores digitados. trim() tira espaço do começo e fim
  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const carro = document.getElementById('carro').value.trim();
  const placa = document.getElementById('placa').value.trim();
  const data = document.getElementById('data').value;
  const servico = document.getElementById('servico').value;
  const detalhe = document.getElementById('detalhe').value;
  const forma = document.getElementById('forma').value;
  const status = document.getElementById('status').value;
  let parcelas = 1;
  if(forma === 'Crédito parcelado') parcelas = parseInt(document.getElementById('parcelas').value);

  // 2. Validação: se faltar campo obrigatório, avisa e para
  if(!nome || !carro || !placa || !servico || !detalhe){ alert('Preencha todos os campos!'); return; }
  const preco = SERVICOS[servico][detalhe]; // Busca o preço na tabela

  // 3. Se editandoId existe, é EDIÇÃO: acha o item e atualiza
  if(editandoId){
    let item = orcamentos.find(o => o.id === editandoId);
    Object.assign(item, {nome, telefone, carro, placa, data, servico: servico + ' - ' + detalhe, preco, forma, parcelas, status, foto: fotoTemp || item.foto, valorParcela: (preco/parcelas).toFixed(2)});
    alert('Atualizado!');
  } else {
    // 4. Se não, é NOVO: push() adiciona no final do array. id = data/hora atual (nunca repete)
    orcamentos.push({id: Date.now(), nome, telefone, carro, placa, data, servico: servico + ' - ' + detalhe, preco, forma, parcelas, status, foto: fotoTemp, valorParcela: (preco/parcelas).toFixed(2)});
    alert('Orçamento cadastrado!');
  }
  limparForm();
  mostrarTela('lista');
}

// ========== 7. EXCLUIR ==========
// filter() cria um array novo SEM o item que tem aquele id
function excluir(id){
  if(!confirm('Excluir esse serviço?')) return;
  orcamentos = orcamentos.filter(o => o.id !== id);
  renderizar();
}

// ========== 8. EDITAR ==========
// Preenche o formulário com os dados do item clicado
function editar(id){
  let item = orcamentos.find(o => o.id === id); // find() acha o item pelo id
  editandoId = id;
  document.getElementById('titulo-cadastro').textContent = 'Editar serviço';
  document.getElementById('nome').value = item.nome;
  document.getElementById('telefone').value = item.telefone || '';
  document.getElementById('carro').value = item.carro;
  document.getElementById('placa').value = item.placa;
  document.getElementById('data').value = item.data || '';
  document.getElementById('status').value = item.status;
  document.getElementById('forma').value = item.forma;
  // Separa "Pintura - Capô" em serviço e detalhe
  let partes = item.servico.split(' - ');
  document.getElementById('servico').value = partes[0];
  atualizarDetalhes();
  document.getElementById('detalhe').value = partes.slice(1).join(' - ');
  mostrarPreco(); mostrarParcelas();
  fotoTemp = item.foto || "";
  if(fotoTemp){ let p=document.getElementById('preview-foto'); p.src=fotoTemp; p.classList.remove('hidden'); }
  mostrarTela('cadastro');
}

// ========== 9. STATUS E WHATSAPP ==========
// Troca o status direto no card, sem abrir o cadastro
function mudarStatus(id, novo){
  let item = orcamentos.find(o => o.id === id);
  item.status = novo; renderizar();
}

// Abre o WhatsApp com mensagem pronta. replace(/\D/g,'') tira tudo que não é número
function chamarWhats(item){
  if(!item.telefone){ alert('Cliente sem WhatsApp cadastrado'); return; }
  let msg = `Olá ${item.nome}! Aqui é da Funilaria do José. Seu ${item.carro} - ${item.servico} está ${item.status}. Valor: R$ ${item.preco}`;
  window.open(`https://wa.me/55${item.telefone.replace(/\D/g,'')}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ========== 10. MOSTRAR A LISTA NA TELA ==========
// É a função mais importante: ela desenha os cards e os totais
function renderizar(){
  // Pega o que foi digitado na busca e o filtro de status
  const busca = (document.getElementById('busca').value || '').toLowerCase();
  const filtro = document.getElementById('filtro-status').value;
  // Filtra: tem que bater a busca E o status
  let lista = orcamentos.filter(item => {
    let bateBusca = (item.nome + ' ' + item.carro + ' ' + item.placa).toLowerCase().includes(busca);
    let bateStatus = filtro === 'Todos' || item.status === filtro;
    return bateBusca && bateStatus;
  });

  // Calcula os totais: reduce() soma todos os preços
  let total = orcamentos.reduce((s,i) => s + i.preco, 0);
  document.getElementById('total-dia').textContent = 'R$ ' + total;
  document.getElementById('total-servicos').textContent = orcamentos.length;
  document.getElementById('total-prontos').textContent = orcamentos.filter(o=>o.status==='Pronto').length;

  const div = document.getElementById('lista');
  if(lista.length === 0){ div.innerHTML = '<p>Nenhum serviço encontrado.</p>'; return; }
  // map() transforma cada item em HTML e join('') junta tudo
  div.innerHTML = lista.map(item => `
    <div class="card">
      ${item.foto ? `<img class="foto-carro" src="${item.foto}">` : ''}
      <span class="badge ${item.status==='Em andamento' ? 'badge-Em' : 'badge-'+item.status}">${item.status}</span><br>
      <b>Cliente:</b> ${item.nome}<br>
      <b>Carro:</b> ${item.carro} - ${item.placa}<br>
      <b>Entrega:</b> ${item.data || '—'}<br>
      <b>Serviço:</b> ${item.servico}<br>
      <b>Preço:</b> R$ ${item.preco}<br>
      <b>Pagamento:</b> ${item.forma}
      ${item.forma === 'Crédito parcelado' ? `<br><b>Parcelas:</b> ${item.parcelas}x de R$ ${item.valorParcela}` : ''}
      <br><label style="font-size:13px">Mudar status:</label>
      <select onchange="mudarStatus(${item.id}, this.value)">
        <option ${item.status==='Aguardando'?'selected':''}>Aguardando</option>
        <option ${item.status==='Em andamento'?'selected':''}>Em andamento</option>
        <option ${item.status==='Pronto'?'selected':''}>Pronto</option>
      </select>
      <div class="acoes">
        <button class="btn-whats" onclick='chamarWhats(${JSON.stringify(item).replace(/'/g,"")})'>WhatsApp</button>
        <button class="btn-edit" onclick="editar(${item.id})">Editar</button>
        <button class="btn-del" onclick="excluir(${item.id})">Excluir</button>
      </div>
    </div>`).join('');
}
// Roda uma vez ao abrir a página, pra mostrar "Nenhum serviço encontrado"
renderizar();