const fetchItem = async (endPoint) => {
  const url = `https://api.mercadolibre.com/items/${endPoint}`;
  try {
   const response = await fetch(url);
   const data = await response.json();
   return data;
  } catch (error) {
   return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
