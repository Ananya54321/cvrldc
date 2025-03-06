"use client"
import React, { useState } from 'react';
import { toast } from 'sonner';
import { User, Lock } from 'lucide-react';
import { loginUser } from '../../../actions/userActions';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await loginUser(username, password);
      if (data.success) {
        toast.success('Welcome back!');
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        // router.push('/');
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5e6d3] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2c1810]">Welcome Back</h1>
          <p className="text-[#3d2517] mt-2">Sign in to continue to LDC Community</p>
        </div>

        <div className="bg-[#2c1810] rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[#e6bc84] text-sm font-medium">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#e6bc84]" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-[#3d2517] border border-[#e6bc84] rounded-xl 
                           text-[#f5e6d3] placeholder-[#f5e6d3]/50 
                           focus:outline-none focus:ring-2 focus:ring-[#e6bc84]"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[#e6bc84] text-sm font-medium">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#e6bc84]" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-[#3d2517] border border-[#e6bc84] rounded-xl 
                           text-[#f5e6d3] placeholder-[#f5e6d3]/50
                           focus:outline-none focus:ring-2 focus:ring-[#e6bc84]"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-xl text-[#2c1810] font-medium
                       ${isLoading 
                         ? 'bg-[#e6bc84]/70 cursor-not-allowed' 
                         : 'bg-[#e6bc84] hover:bg-[#e6bc84]/90 transform hover:scale-[1.02] transition-all duration-200'
                       }`}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#f5e6d3]/70 text-sm">
              Don't have an account?{' '}
              <a href="/register" className="text-[#e6bc84] hover:text-[#e6bc84]/80">
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;