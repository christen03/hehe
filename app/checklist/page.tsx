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
  ]);

  const toggleItem = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem' }}>
  <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem' }}>Julia's Birthday Checklist</h1>
  <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
    {items.map(item => (
      <li key={item.id} style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleItem(item.id)}
            style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.75rem' }}
          />
          <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
            {item.text}
          </span>
        </label>
      </li>
    ))}
  </ul>
</div>

  );
}
