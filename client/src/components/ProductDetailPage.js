import { useParams } from 'react-router-dom';

function ProductDetailPage() {
  const { id } = useParams();
  const products = JSON.parse(localStorage.getItem('products')) || []; 
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}

export default ProductDetailPage;
