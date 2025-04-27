import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './redux/productSlice';
import { Routes, Route, Link } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
import OrderPage from './components/OrderPage';

import './App.css';

export default function App() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold mb-2 md:mb-0">CloudCore SHOP</h1>
        <Link to="/order" className="text-white underline">
          Place Order
        </Link>
      </header>
      <main className="p-4">
        <Routes>
          <Route
            path="/"
            element={
              loading ? (
                <p>Loading...</p>
              ) : error ? (
                <div className="error">
                  <p>Error: {error}</p>
                  <button
                    onClick={() => dispatch(fetchProducts())}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Retry
                  </button>
                </div>
              ) : products.length > 0 ? (
                <ProductDetail products={products} />
              ) : (
                <p>No products available.</p>
              )
            }
          />
          
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
      </main>
    </div>
  );
}
