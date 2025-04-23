'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { use } from 'react';

export default function AcceptedJobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id: itemId } = use(params);

  useEffect(() => {
    if (!itemId) return;

    fetch(`/api/details?id=${itemId}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching accepted job detail:', err);
        setLoading(false);
      });
  }, [itemId]);

  const handleRemove = async () => {
    const res = await fetch(`/api/user/remove-listing`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId }),
    });

    if (res.ok) {
      alert('Removed from accepted jobs!');
      router.push('/profile');
    } else {
      alert('Failed to remove job.');
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!item) return <p className="p-6 text-red-500">Item not found.</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-md text-center">
        <Image
          src={item.imageUrl || '/placeholder.jpg'}
          alt={item.title}
          width={600}
          height={300}
          className="w-full h-64 object-cover rounded-lg mx-auto"
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
          onClick={handleRemove}
          className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Remove from Accepted Jobs
        </button>
      </div>
    </div>
  );
}
