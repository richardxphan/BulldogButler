'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ItemDetailClient({ item }: { item: any }) {
  const [form, setForm] = useState(item);
  const [photo, setPhoto] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (): Promise<string | null> => {
    if (!photo) return form.imageUrl;
    const formData = new FormData();
    formData.append('file', photo);
    formData.append('upload_preset', 'placeholder'); 

    const res = await fetch('https://api.cloudinary.com/v1_1/drrkkkrat/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.secure_url) return data.secure_url;

    console.error('[Cloudinary upload failed]:', data);
    return null;
  };

  const handleUpdate = async () => {
    const imageUrl = await handleImageUpload();

    const res = await fetch(`/api/personalDetail?id=${item._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, imageUrl }),
    });

    if (res.ok) {
      alert('Listing updated!');
      setIsEditing(false);
      router.refresh();
    } else {
      alert('Update failed.');
    }
  };

  const handleDelete = async () => {
    const res = await fetch(`/api/personalDetail?id=${item._id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      alert('Listing removed!');
      router.push('/dashboard');
    } else {
      alert('Delete failed.');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      {isEditing ? (
        <form className="space-y-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Title"
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Location"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Description"
          />

          <select
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option>Trash</option>
            <option>Laundry</option>
            <option>Room Cleaning</option>
            <option>Bathroom Cleaning</option>
            <option>Grocery Run</option>
            <option>Moving Furniture</option>
            <option>Tech Help</option>
            <option>Other</option>
          </select>

          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full pl-6 border p-2 rounded"
              placeholder="Price"
            />
          </div>

          <input
            name="deadline"
            type="date"
            value={form.deadline?.slice(0, 10)}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Listing Image (Click to Change)</label>

        <div className="relative w-full h-64 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 hover:border-gray-400 transition">
            <input
                type="file"
                accept="image/*"
                id="upload-image"
                onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
    
            <img
                src={photo ? URL.createObjectURL(photo) : form.imageUrl}
                alt="Listing"
                className="w-full h-full object-cover pointer-events-none"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-sm font-semibold opacity-0 hover:opacity-100 transition">
                Click to change image
            </div>
        </div>

        {photo && (
            <p className="text-sm text-gray-600 mt-1">
                Selected: <span className="font-medium">{photo.name}</span>
            </p>
        )}
    </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <img
            src={form.imageUrl}
            alt="Listing"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h1 className="text-2xl font-bold">{form.title}</h1>
          <p className="text-sm text-gray-600">{form.location}</p>
          <p className="mt-2">{form.description}</p>
          <div className="mt-4 space-y-1 text-gray-700">
            <p>🧺 {form.serviceType}</p>
            <p>💰 ${form.price.toFixed(2)}</p>
            <p>⏳ {new Date(form.deadline).toLocaleDateString()}</p>
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Remove
            </button>
          </div>
        </>
      )}
    </div>
  );
}
