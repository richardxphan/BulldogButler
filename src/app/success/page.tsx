'use client';   // Only if you're using useEffect or localStorage

import { useEffect } from 'react';

export default function SuccessPage() {
  useEffect(() => {
    const submitTask = async () => {
      const taskData = localStorage.getItem('pendingTask');
      if (!taskData) return;

      const newItem = JSON.parse(taskData);

      try {
        const res = await fetch('/api/user/create-listing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem),
        });

        if (res.ok) {
          console.log('Task created after payment!');
          localStorage.removeItem('pendingTask');
        } else {
          console.error('Failed to create task after payment');
        }
      } catch (err) {
        console.error('Error creating task:', err);
      }
    };

    submitTask();
  }, []);

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-green-600">
        ✅ Payment Successful!
      </h1>
      <p className="mt-4">
        Your task request has been submitted successfully. A Butler will accept it soon!
      </p>
    </div>
  );
}
