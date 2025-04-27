import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductDetail({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
        >
          {/* Image Container */}
          <div className="w-full aspect-w-1 aspect-h-1">
            <img
              src={`https://admin.refabry.com/storage/product/${product.image}`}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="p-4 flex-grow flex flex-col justify-between">
            <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
            <p className="text-blue-600 mt-2 font-medium">৳ {product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}