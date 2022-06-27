require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Verifica se a função fecthItem é uma função', () => {
    expect(typeof fetchItem).toBe('function')
  });
  it('Verifica se fetch foi chamada quando passado o argumento "MLB1615760527" na função fecthItem', async () =>{
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Ao chamar a função fecthItem com o argumento "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"',async ()=>{ 
    await fetchItem('MLB1615760527');
     expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/items/MLB1615760527");
  });
  it('Ao chamar a função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo', async () => {
  expect(await fetchItem('MLB1615760527')).toEqual(item)
  });
  it('Testa se a função fetchProduct, quando sem parâmetro, retorna a mensagem:You must provide an url', async () => {
    expect(await fetchItem()).toEqual(new Error ('You must provide an url'));
   });
});
