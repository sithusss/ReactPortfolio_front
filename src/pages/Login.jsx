import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      localStorage.setItem('token', data.token);

      setError('');
      alert('Login successful!');
      navigate('/admin');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-paper px-6 py-20">
      <div className="w-full max-w-sm border border-stone bg-white/40 p-10">
        <span className="eyebrow">Admin Access</span>
        <h1 className="mt-3 font-display text-3xl text-ink">Login</h1>
        <div className="mt-4 h-px w-10 bg-brass" />

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <p className="border border-brass/40 bg-brass/10 px-3 py-2 text-sm text-brass-dark">
              {error}
            </p>
          )}
          <div>
            <label htmlFor="email" className="eyebrow">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-2 w-full border-b border-stone bg-transparent py-2 text-sm text-ink placeholder:text-ink/40 focus:border-brass focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="eyebrow">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-2 w-full border-b border-stone bg-transparent py-2 text-sm text-ink placeholder:text-ink/40 focus:border-brass focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full border border-ink py-3 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
