import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    navigate('/portal/dashboard');
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <span className="text-2xl font-bold">Techno<span className="text-amber-500">Bit</span></span>
          <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-2">Welcome Back</h1>
          <p className="text-slate-600 text-sm">Sign in to access your technical documents</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-5"
        >
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@company.com"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-400 text-slate-900 font-bold py-4 rounded-xl hover:bg-amber-500 transition-colors disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-slate-600 text-sm mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-amber-500 hover:text-amber-600 font-semibold">
            Register free
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
