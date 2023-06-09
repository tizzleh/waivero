'use client'
import { useEffect, useState } from 'react';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
      setIsLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        users.map((user) => (
          <div key={user.id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            {/* Display other user data as needed */}
          </div>
        ))
      )}
    </div>
  );
};

export default UsersPage;

