'use client'

import React, { useState } from 'react';

const CreateUser = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/users/', {
      cache: 'force-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });

    if (!response.ok) {
      console.error('Error creating user');
      return;
    }

    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <h1>Create a new user</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CreateUser;

