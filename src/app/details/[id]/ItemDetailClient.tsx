'use client';

import { useState } from 'react';

export default function ItemDetailClient({ item }: { item: any }) {
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState('');

  const handleAdd = async () => {
    setAdding(true);
    setMessage('');

    try {
      const res = await fetch('/api/user/add-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: item._id }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Added to your listings!');
      } else {
        setMessage(`❌ ${data.error || 'Something went wrong.'}`);
      }
    } catch (err) {
      setMessage('❌ Failed to add item.');
    }

    setAdding(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <img
          src={item.imageUrl || '/placeholder.jpg'}
          alt={item.title}
          className="w-full h-64 object-cover rounded-lg"
        />
        <h1 className="text-2xl font-bold text-gray-900 mt-4">{item.title}</h1>
        <p className="text-gray-600 mt-2">{item.description}</p>

        <div className="mt-4 space-y-1 text-sm text-gray-700">
          <p>📍 Location: {item.location}</p>
          <p>🧺 Service Type: {item.serviceType}</p>
          <p>💰 Price: ${item.price.toFixed(2)}</p>
          <p>⏳ Deadline: {new Date(item.deadline).toLocaleDateString()}</p>
          <p className="text-xs text-gray-400">Posted by: {item.userId}</p>
        </div>

        <button
          onClick={handleAdd}
          disabled={adding}
          className="mt-6 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          {adding ? 'Adding...' : 'Add to My Listings'}
        </button>

        {message && (
          <p className={`mt-2 text-sm ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
