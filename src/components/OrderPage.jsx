import React, { useState } from 'react';
import axios from 'axios';

export default function OrderPage() {
  const [formData, setFormData] = useState({
    product_ids: '',
    s_product_qty: '',
    c_name: '',
    c_phone: '',
    address: '',
    courier: 'steadfast',
    cod_amount: '',
    delivery_charge: '80',
    advance: null,
    discount_amount: null,
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('https://admin.refabry.com/api/public/order/create', formData);
      setMessage('Order placed successfully!');
    } catch (error) {
      setMessage('Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center md:text-left">Place Order</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow max-w-lg mx-auto md:mx-0"
      >
        <input
          type="text"
          name="c_name"
          placeholder="Customer Name"
          value={formData.c_name}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          name="product_ids"
          placeholder="Product IDs"
          value={formData.product_ids}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          name="s_product_qty"
          placeholder="Quantities"
          value={formData.s_product_qty}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="tel"
          name="c_phone"
          placeholder="Phone Number"
          value={formData.c_phone}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          rows={3}
        />
        <select
          name="courier"
          value={formData.courier}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="steadfast">Steadfast</option>
          <option value="sundarban">Sundarban</option>
        </select>
        <input
          type="number"
          name="cod_amount"
          placeholder="COD Amount"
          value={formData.cod_amount}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="number"
          name="delivery_charge"
          placeholder="Delivery Charge"
          value={formData.delivery_charge}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
