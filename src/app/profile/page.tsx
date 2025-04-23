'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import placeholder from '../../assets/ProfilePicPlaceholder.jpg';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    phone: '',
    profileImage: '',
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [postedListings, setPostedListings] = useState([]);
  const [acceptedListings, setAcceptedListings] = useState([]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/profile')
        .then((res) => res.json())
        .then((data) => {
          setForm({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            bio: data.bio || '',
            phone: data.phone || '',
            profileImage: data.profileImage || '',
          });
          setPostedListings(data.postedListings || []);
          setAcceptedListings(data.acceptedListings || []);
        });
    }
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (): Promise<string | null> => {
    if (!photo) return form.profileImage;
    const formData = new FormData();
    formData.append('file', photo);
    formData.append('upload_preset', 'placeholder');

    const res = await fetch('https://api.cloudinary.com/v1_1/drrkkkrat/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const imageUrl = await handleImageUpload();

    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, profileImage: imageUrl }),
    });

    if (res.ok) {
      alert('Profile updated!');
    } else {
      alert('Error updating profile.');
    }
  };

  if (status === 'loading') return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <div className="flex flex-col items-center mt-10">
        <div className="relative">
          <Image
            src={photo ? URL.createObjectURL(photo) : form.profileImage || placeholder}
            width={128}
            height={128}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <label className="absolute bottom-0 right-2 bg-white rounded-full p-1 shadow cursor-pointer">
            ✏️
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
            />
          </label>
        </div>

        <form className="w-full max-w-2xl mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <input
            type="text"
            name="bio"
            placeholder="Add a bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <div className="flex space-x-4">
            <input
              type="email"
              name="email"
              value={form.email}
              disabled
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100"
            />
            <input
              type="tel"
              name="phone"
              placeholder="XXX-XXX-XXXX"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200 text-white w-full border rounded-full text-lg py-2"
          >
            Confirm Change
          </button>
        </form>
      </div>

      <div className="max-w-5xl mx-auto mt-16 px-4">
        <h2 className="text-xl font-semibold mb-4">Jobs You've Posted</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {postedListings.map((item: any) => (
            <Link key={item._id} href={`/personalDetail/${item._id}`}>
              <div className="p-4 border rounded shadow bg-white hover:shadow-md transition cursor-pointer">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-xs text-gray-400">📍 {item.location}</p>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="text-xl font-semibold my-8">Jobs You've Accepted</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {acceptedListings.map((item: any) => (
            <Link key={item._id} href={`/acceptedDetail/${item._id}`}>
              <div className="p-4 border rounded shadow bg-white hover:shadow-md transition cursor-pointer">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-xs text-gray-400">📍 {item.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
