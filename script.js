const cartShp = document.querySelector('.cart__items'); // o Lint sugeriu isso.
const precoTotal = document.querySelector('.total-price');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const somarPrecos = async () => {
  if (cartShp !== undefined) {
    const pdArray = Array.from(document.querySelectorAll('.cart__item'));
    let somaPre = 0;
    pdArray.forEach((item) => {
      somaPre += Number(item.innerText.substring(item.innerText.indexOf('$') + 1));
    });
   precoTotal.innerText = `${somaPre}`;
  }
};

function cartItemClickListener(event) {
  const produtoSelecionado = event.target;
  produtoSelecionado.remove();
  saveCartItems(cartShp.innerHTML);
  somarPrecos();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const listaDoProduto = async () => {
  const computerArray = await fetchProducts('computador');
  document.querySelector('.loading').remove();
  computerArray.forEach(({ id: sku, title: name, thumbnail: image }) => {
    document.querySelector('.items').appendChild(createProductItemElement({ sku, name, image }));
  });
};

const puttingInTheShCart = async () => {
  document.querySelector('.items').addEventListener('click', async (event) => {
      const regClicada = event.target;
      if (regClicada.innerText === 'Adicionar ao carrinho!') {
        const idDoClicado = regClicada.parentElement.childNodes[0].innerText;
        const { id: sku, title: name, price: salePrice } = await fetchItem(idDoClicado);
        cartShp.appendChild(createCartItemElement({ sku, name, salePrice }));
        saveCartItems(cartShp.innerHTML);
        await somarPrecos();
      }
    });
};

const clearAll = async () => {
  const botao = document.querySelector('.empty-cart');
  botao.addEventListener('click', () => {
    if (cartShp !== undefined) {
      cartShp.innerHTML = '';
      precoTotal.innerText = ''; 
      saveCartItems(cartShp.innerHTML);
    }
  });
};

const mostraLocalStorage = () => {
  cartShp.innerHTML = getSavedCartItems();
  return Array.from(cartShp.children).map((a) =>
  a.addEventListener('click', cartItemClickListener));
  };

window.onload = () => {
  listaDoProduto();
  puttingInTheShCart();
  mostraLocalStorage();
  clearAll();
  somarPrecos();
};
