'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext'; 

type Item = {
  _id: string;
  userId: string;
  title: string;
  location: string;
  serviceType: string;
  imageUrl: string;
  deadline: string;
  price: number;
  description: string;
};

export default function Dashboard() {
  const router = useRouter();
  const { isLoggedIn, userId } = useAuth(); 
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    if (!userId) return;

    fetch(`/api/items?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, [isLoggedIn, userId]); 

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-10 text-red-700">Dashboard Listings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-200"
          >
            <img
              src={item.imageUrl || '/placeholder.jpg'}
              alt={item.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
                <span className="text-red-600 font-bold">
                  {typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : 'Price N/A'}
                </span>
              </div>

              <p className="text-sm text-gray-600">
                📍 {item.location} &nbsp; • &nbsp; 🧺 {item.serviceType}
              </p>

              <p className="text-sm text-gray-700">{item.description}</p>

              {item.deadline && (
                <p className="text-xs text-gray-500">
                  ⏳ Due by:{' '}
                  {new Date(item.deadline).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              )}

              <p className="text-xs text-gray-400">Posted by: {item.userId}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
