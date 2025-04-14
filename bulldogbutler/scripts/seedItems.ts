import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Item from '../src/models/Item';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function seedItems() {
  await mongoose.connect(process.env.MONGODB_URI!, { dbName: 'items' });

  await Item.deleteMany(); // Clear existing data

  await Item.insertMany([
    {
      userId: 'user1',
      location: 'Myers Hall',
      serviceType: 'Trash',
      title: 'Take Out Trash',
      imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&auto=format&fit=crop&q=60',
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      price: 5,
      description: 'Take out trash bags from second floor to dumpster.',
    },
    {
      userId: 'user2',
      location: 'Creswell Hall',
      serviceType: 'Laundry',
      title: 'Laundry Folding Help',
      imageUrl: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=400&auto=format&fit=crop&q=60',
      deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      price: 8,
      description: 'Pick up and fold laundry from the basement.',
    },
    {
      userId: 'user3',
      location: 'Oglethorpe House',
      serviceType: 'Tech Help',
      title: 'Printer Setup Assistance',
      imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&auto=format&fit=crop&q=60',
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      price: 10,
      description: 'Help me set up my printer and connect to UGA WiFi.',
    },
  ]);

  console.log('✅ Seeded complete dummy items!');
  mongoose.disconnect();
}

seedItems().catch((err) => {
  console.error('❌ Seed failed:', err);
  mongoose.disconnect();
});

export {};
