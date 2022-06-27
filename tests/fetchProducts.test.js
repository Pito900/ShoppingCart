require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const item = require('../mocks/item');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
 it('Verifica se a função fetchProducts é uma função', () => {
   expect(typeof fetchProducts).toBe('function')
 });
 it('Verifica se fetch foi chamada quando passado o argumento "computador" na função fetchProduct', async () =>{
   await fetchProducts('computador');
   expect(fetch).toHaveBeenCalled();
 });
 it('Ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"',async ()=>{ 
 await fetchProducts('computador');
  expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
 });
 it('Ao chamar a função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo', async () => {
  expect(await fetchProducts('computador')).toEqual(computadorSearch.results)
});
 it('Testa se a função fetchProduct, quando sem parâmetro, retorna a mensagem:You must provide an url', async () => {
  const resultado = await fetchProducts()
  expect(resultado).toEqual(new Error ('You must provide an url'));
 });
});
