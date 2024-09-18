'use client';

import React, { useState } from 'react';

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

export default function ChecklistPage() {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: 1, text: 'Dinner', completed: false },
    { id: 2, text: 'Boba', completed: false },
    { id: 3, text: 'Drugs', completed: false },
    { id: 4, text: 'Drugs', completed: false },
  ]);

  const toggleItem = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Julia's Birthday Checklist</h1>
        <ul className="space-y-4">
          {items.map(item => (
            <li key={item.id}>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleItem(item.id)}
                  className="w-5 h-5"
                />
                <span className={item.completed ? 'line-through' : ''}>
                  {item.text}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
