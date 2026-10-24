(function () {
  'use strict';

  // Tudo que muda de uma confeitaria para outra fica aqui.
  var CONFIG = {
    nome: 'Ateliê Flor de Açúcar',
    whatsapp: '5535991558295', // só dígitos, com DDI e DDD
    mensagemPadrao: 'Olá! Vi o site e gostaria de fazer uma encomenda.',
  };

  // Desenhos simples por tipo de produto, no lugar das fotos reais.
  var ARTE = {
    bolo: '<svg viewBox="0 0 100 100"><rect x="18" y="52" width="64" height="30" rx="6" fill="#f1c4c8"/><rect x="26" y="30" width="48" height="26" rx="6" fill="#f6e3d3"/><path d="M18 60c6 5 11 5 16 0s11-5 16 0 11 5 16 0 11-5 16 0" stroke="#3a2321" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="50" cy="22" r="7" fill="#a61c35"/></svg>',
    docinho: '<svg viewBox="0 0 100 100"><path d="M22 58h56l-6 22H28z" fill="#f1c4c8"/><circle cx="50" cy="44" r="20" fill="#5a3a35"/><circle cx="43" cy="38" r="2" fill="#f6e3d3"/><circle cx="55" cy="36" r="2" fill="#f6e3d3"/><circle cx="50" cy="46" r="2" fill="#f6e3d3"/><circle cx="58" cy="47" r="2" fill="#f6e3d3"/><circle cx="42" cy="48" r="2" fill="#f6e3d3"/></svg>',
    torta: '<svg viewBox="0 0 100 100"><path d="M14 62h72l-8 16H22z" fill="#e8b27a"/><ellipse cx="50" cy="60" rx="36" ry="10" fill="#f6e3d3"/><path d="M20 58c5-14 55-14 60 0" fill="#f6e27a"/><circle cx="38" cy="52" r="4" fill="#a9c99a"/><circle cx="62" cy="52" r="4" fill="#a9c99a"/><circle cx="50" cy="48" r="4" fill="#a9c99a"/></svg>',
    cupcake: '<svg viewBox="0 0 100 100"><path d="M30 56h40l-6 26H36z" fill="#a9c99a"/><path d="M28 58c-4-14 10-26 22-26s26 12 22 26z" fill="#f1c4c8"/><circle cx="50" cy="28" r="6" fill="#a61c35"/></svg>',
  };
  var FUNDO = { bolo: '#fbe6e7', docinho: '#f6e3d3', torta: '#e5f0dc', cupcake: '#fbe6e7' };

  var PRODUTOS = [
    { id: 'b1', foto: 'img/bolo-pistache.jpg', cat: 'Bolos', arte: 'bolo', nome: 'Bolo de pistache', desc: 'Massa de pistache, creme de pistache e pistaches torrados por cima. Serve 20 fatias.', preco: 220, unidade: 'unidade' },
    { id: 'b2', foto: 'img/bolo-frutas-vermelhas.jpg', cat: 'Bolos', arte: 'bolo', nome: 'Chocolate com frutas vermelhas', desc: 'Massa de cacau, ganache meio amargo, frutas vermelhas frescas e flores comestíveis. Serve 20 fatias.', preco: 240, unidade: 'unidade' },
    { id: 'b3', foto: 'img/bolo-chocolate.jpg', cat: 'Bolos', arte: 'bolo', nome: 'Bolo de chocolate com mousse de café', desc: 'Massa úmida de chocolate, mousse de café e cacau polvilhado. Serve 18 fatias.', preco: 190, unidade: 'unidade' },
    { id: 'b4', foto: 'img/bolo-morango.jpg', cat: 'Bolos', arte: 'bolo', nome: 'Naked cake de morango', desc: 'Massa de baunilha, chantininho e morangos frescos. Serve 15 fatias.', preco: 170, unidade: 'unidade' },
    { id: 'b5', foto: 'img/bolo-limao.jpg', cat: 'Bolos', arte: 'bolo', nome: 'Bolo de limão com lavanda', desc: 'Massa de limão siciliano, creme leve de lavanda e raspas de limão. Serve 18 fatias.', preco: 180, unidade: 'unidade' },
    { id: 'f1', foto: 'img/bolo-pasta-americana.jpg', cat: 'Bolos de festa', arte: 'bolo', nome: 'Bolo decorado em pasta americana', desc: 'Decoração temática feita à mão, no tema da sua festa. Serve 25 fatias.', preco: 320, unidade: 'a partir de' },
    { id: 'f2', foto: 'img/bolo-casamento.jpg', cat: 'Bolos de festa', arte: 'bolo', nome: 'Bolo de casamento', desc: 'Andares com acabamento em babados e flores de açúcar. Orçamento conforme o número de convidados.', preco: 1200, unidade: 'a partir de' },
    { id: 'd1', foto: 'img/cupcake.jpg', cat: 'Doces e tortas', arte: 'cupcake', nome: 'Cupcake de limão com mirtilo', desc: 'Massa de limão com mirtilos e cobertura de cream cheese. Pedido mínimo de 6 unidades.', preco: 9, unidade: 'un.', passo: 6 },
    { id: 't1', foto: 'img/torta-holandesa.jpg', cat: 'Doces e tortas', arte: 'torta', nome: 'Torta holandesa', desc: 'Creme de baunilha, base de biscoito e cobertura de chocolate. Serve 12 fatias.', preco: 135, unidade: 'unidade' },
  ];
  var CATEGORIAS = ['Todos', 'Bolos', 'Bolos de festa', 'Doces e tortas'];

  var pedido = {};
  var categoriaAtual = 'Todos';
  var brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  function linkWhatsApp(texto) { return 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(texto); }
  document.querySelectorAll('[data-wpp]').forEach(function (a) { a.href = linkWhatsApp(CONFIG.mensagemPadrao); a.target = '_blank'; a.rel = 'noopener'; });

  // Categorias
  var abas = document.getElementById('categorias');
  CATEGORIAS.forEach(function (c) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'categoria'; b.textContent = c; b.setAttribute('role', 'tab');
    b.setAttribute('aria-selected', String(c === categoriaAtual));
    b.addEventListener('click', function () {
      categoriaAtual = c;
      abas.querySelectorAll('.categoria').forEach(function (x) { x.setAttribute('aria-selected', String(x === b)); });
      renderProdutos();
    });
    abas.appendChild(b);
  });

  // Produtos
  function renderProdutos() {
    var lista = document.getElementById('produtos');
    lista.textContent = '';
    PRODUTOS.filter(function (p) { return categoriaAtual === 'Todos' || p.cat === categoriaAtual; }).forEach(function (p) {
      var el = document.createElement('article');
      el.className = 'produto' + (pedido[p.id] ? ' no-pedido' : '');
      el.innerHTML =
        '<div class="produto-arte" style="background:' + FUNDO[p.arte] + '"></div>' +
        '<div class="produto-corpo"><h3></h3><p></p>' +
        '<div class="produto-rodape"><span class="preco"></span>' +
        '<div class="qtd"><button type="button" class="menos">−</button><output></output><button type="button" class="mais">+</button></div></div></div>';
      // Foto real quando existe; se não carregar, mostra o desenho no lugar.
      var arte = el.querySelector('.produto-arte');
      var img = document.createElement('img');
      img.src = p.foto; img.alt = p.nome; img.loading = 'lazy'; img.decoding = 'async';
      img.addEventListener('error', function () { arte.innerHTML = ARTE[p.arte]; });
      arte.appendChild(img);
      el.querySelector('h3').textContent = p.nome;
      el.querySelector('p').textContent = p.desc;
      el.querySelector('.preco').innerHTML = p.unidade === 'a partir de'
        ? '<small>a partir de</small> ' + brl.format(p.preco)
        : brl.format(p.preco) + ' <small>/ ' + p.unidade + '</small>';
      el.querySelector('output').textContent = pedido[p.id] || 0;
      el.querySelector('.menos').setAttribute('aria-label', 'Tirar ' + p.nome);
      el.querySelector('.mais').setAttribute('aria-label', 'Adicionar ' + p.nome);
      el.querySelector('.mais').addEventListener('click', function () { mudar(p, +1); });
      el.querySelector('.menos').addEventListener('click', function () { mudar(p, -1); });
      lista.appendChild(el);
    });
  }

  // Quantidades: doces seguem o pedido mínimo (ex.: 25 em 25).
  function mudar(p, sinal) {
    var passo = p.passo || 1;
    var atual = pedido[p.id] || 0;
    var novo = Math.max(0, atual + sinal * passo);
    if (novo === 0) delete pedido[p.id]; else pedido[p.id] = novo;
    renderProdutos();
    renderPedido();
  }

  function renderPedido() {
    var itens = PRODUTOS.filter(function (p) { return pedido[p.id]; });
    var barra = document.getElementById('pedido');
    barra.hidden = itens.length === 0;
    if (!itens.length) return;
    var total = itens.reduce(function (s, p) { return s + p.preco * pedido[p.id]; }, 0);
    document.getElementById('pedido-qtd').textContent = itens.length === 1 ? '1 item no pedido' : itens.length + ' itens no pedido';
    document.getElementById('pedido-total').textContent = brl.format(total);
    var linhas = itens.map(function (p) { return '• ' + pedido[p.id] + 'x ' + p.nome + ' — ' + brl.format(p.preco * pedido[p.id]); });
    var texto = 'Olá! Gostaria de encomendar no ' + CONFIG.nome + ':\n\n' + linhas.join('\n') + '\n\nTotal: ' + brl.format(total) + '\n\nData da festa: \nEntrega ou retirada: ';
    document.getElementById('pedido-enviar').href = linkWhatsApp(texto);
  }

  document.getElementById('pedido-limpar').addEventListener('click', function () { pedido = {}; renderProdutos(); renderPedido(); });

  // ?pedido=b1:1,d1:25 já abre com itens no pedido (útil para prints de demonstração).
  try {
    var q = new URLSearchParams(location.search).get('pedido');
    if (q) q.split(',').forEach(function (par) {
      var x = par.split(':'), p = PRODUTOS.filter(function (y) { return y.id === x[0]; })[0];
      if (p && +x[1] > 0) pedido[p.id] = +x[1];
    });
  } catch (e) {}

  renderProdutos();
  renderPedido();
})();
