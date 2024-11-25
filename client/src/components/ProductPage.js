import { useEffect, useState } from 'react';
import axios from 'axios';

function ProductPage() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const productId = 'some-product-id';  
    axios.get(`http://localhost:5000/products/${productId}`)
      .then(response => setProduct(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      {product ? (
        <div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <button>Add to Cart</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductPage;
