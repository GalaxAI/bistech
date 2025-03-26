import React, { useState } from 'react';
import axios from 'axios';

export function Payments() {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    amount: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Payment functionality would be implemented here');
    // In a real app, this would call a payment API
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">Expiry Date</label>
            <input
              type="text"
              name="expiry"
              value={paymentData.expiry}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              placeholder="MM/YY"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">CVV</label>
            <input
              type="text"
              name="cvv"
              value={paymentData.cvv}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              placeholder="123"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Amount</label>
          <input
            type="number"
            name="amount"
            value={paymentData.amount}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            step="0.01"
            min="0"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
}