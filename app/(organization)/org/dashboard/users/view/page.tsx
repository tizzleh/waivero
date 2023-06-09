'use client'
import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  // Add more fields as needed
}

function Users() {
    const [users, setUsers] = useState<User[]>([]); // now users is of type User[]

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/users/get/');
            const data = await res.json();

            setUsers(data);
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>Users</h1>
            {users.map((user) => (
                <div key={user.id}>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    {/* Add more fields as needed, but make sure to check if the field is not null before trying to display it */}
                </div>
            ))}
        </div>
    );
}

export default Users;

