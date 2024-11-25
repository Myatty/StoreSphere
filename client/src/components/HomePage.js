import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 120000]);
  const [category, setCategory] = useState('All');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);

    const dummyProducts = [
      { id: 1, name: 'Coca Cola', description: `Coca Cola or Coke`, price: 1200, category: 'Drinks', image: 'https://shorturl.at/gJ5Va' },
      { id: 2, name: 'Power Cable', description: 'Electronics', price: 7500, category: 'Electronics', image: 'https://shorturl.at/UmnNW' },
      { id: 3, name: 'Socks', description: 'Description 3', price: 2700, category: 'Clothing', image: 'https://shorturl.at/sr0Vu' },
      { id: 4, name: 'Prime', description: 'Prime is a energy drink created and marketed by Prime Hydration, LLC.', price: 5000, category: 'Drinks', image: 'https://tinyurl.com/4xr6cmtp' },
    ];

    setProducts(dummyProducts);

    localStorage.setItem('products', JSON.stringify(dummyProducts));

    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.verified) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, priceRange, category, products]);

  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleProceedToCart = () => {
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    const cartSummary = cart.map(
      (item, index) => `${index + 1}. ${item.name} - $${item.price}`
    ).join('\n');

    alert(`Order Summary:\n${cartSummary}\n\nAn email notification will be sent.`);
    
    console.log('Email sent to the customer with the order summary:');
    console.log(cartSummary);

    setCart([]);
    localStorage.removeItem('cart');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    alert('You have been logged out.');
  };

  const handleViewProductDetail = (id) => {
    navigate(`/product/${id}`);
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = filtered.filter((product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (category !== 'All') {
      filtered = filtered.filter((product) => product.category === category);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="home-page">
      <div className="header-buttons">
        {isLoggedIn ? (
          <>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => navigate('/profile')}>Profile</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/register')}>Register</button>
          </>
        )}
      </div>

      <h1>Store</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div>
        <label>Price Range: </label>
        <input
          type="number"
          value={priceRange[0]}
          onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
          min="0"
        />
        -
        <input
          type="number"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
          min="0"
        />
      </div>

      <div>
        <label>Category: </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Drinks">Drinks</option>
        </select>
      </div>

      <div className="product-list">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            <button onClick={() => handleViewProductDetail(product.id)}>View Details</button>
          </div>
        ))}
      </div>

      <div>
        <button onClick={handleProceedToCart} className="proceed-cart">
          Proceed to Cart
        </button>
      </div>
    </div>
  );
}

export default HomePage;
