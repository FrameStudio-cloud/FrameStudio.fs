import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Lock, Mail, LogIn } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // If Supabase is not configured, show setup message
    if (!supabase) {
      setError("Please configure Supabase first. See /src/lib/supabase.ts");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        navigate("/admin/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6" style={{ fontFamily: 'Inter, sans-serif' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-3 h-3 bg-black" />
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              FrameStudio
            </h1>
          </div>
          <h2 className="text-4xl font-bold mb-2">Admin Login</h2>
          <p className="text-gray-600">Manage your portfolio projects</p>
        </div>

        <form onSubmit={handleLogin} className="border-4 border-black p-8">
          {error && (
            <div className="bg-red-50 border-2 border-red-500 p-4 mb-6">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm mb-2 uppercase tracking-wider font-semibold">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-2 border-black p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="admin@framestudio.com"
              />
            </div>
          </div>

          <div className="mb-8">
            <label htmlFor="password" className="block text-sm mb-2 uppercase tracking-wider font-semibold">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border-2 border-black p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-4 font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
            <LogIn size={20} />
          </button>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-gray-600 hover:text-black transition-colors">
              ← Back to Portfolio
            </a>
          </div>
        </form>

        {!supabase && (
          <div className="mt-8 border-2 border-black p-6 bg-yellow-50">
            <h3 className="font-bold mb-2">⚠️ Supabase Not Configured</h3>
            <p className="text-sm text-gray-700 mb-4">
              To use the admin dashboard, you need to set up Supabase authentication.
            </p>
            <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
              <li>Configure Supabase in <code className="bg-white px-2 py-1">/src/lib/supabase.ts</code></li>
              <li>Create a user account in your Supabase dashboard (Authentication → Users)</li>
              <li>Return here and login with your credentials</li>
            </ol>
          </div>
        )}
      </motion.div>
    </div>
  );
}
