const getProducts = (req, res) => {
  try {
    res.json([
      // { id: 1, name: 'iPhone 15', price: 999 },
      // { id: 2, name: 'MacBook Pro', price: 1999 }
    ]);
  } catch (error) {
    console.error('GET PRODUCTS ERROR:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getProducts };
