import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/features/products/productSlice';
import ProductCard from '../components/ui/ProductCard';

export default function Shop() {
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <section className="p-6 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center uppercase">Available Drops</h1>

      {status === 'loading' && <p className="text-center">Loading drops...</p>}
      {status === 'succeeded' && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
