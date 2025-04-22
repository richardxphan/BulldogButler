export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import ItemDetailClient from './ItemDetailClient'; 

async function fetchItem(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/details?id=${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function ItemDetailPage({ params }: { params: { id: string } }) {
  const item = await fetchItem(params.id);

  if (!item) return notFound();

  return <ItemDetailClient item={item} />;
}