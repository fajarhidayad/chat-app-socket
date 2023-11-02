import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username) return;
    setUser(username);
    navigate('/');
  };

  return (
    <main className="bg-darkgrey h-screen flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="bg-lightgrey p-5 rounded-lg text-white w-[500px]"
      >
        <h1 className="text-3xl mb-8 font-semibold">Sign In</h1>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-transparent rounded-md px-3 py-2 border focus:outline-none w-full mb-4"
          placeholder="Username"
        />
        <div className="text-center">
          <button
            type="submit"
            className="text-center px-8 py-2 rounded bg-blue-500"
          >
            Join
          </button>
        </div>
      </form>
    </main>
  );
}
