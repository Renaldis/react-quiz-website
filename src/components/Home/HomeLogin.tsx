import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Input } from '../ui/input';
import { Eye, EyeOff, Lock, TriangleAlert, User } from 'lucide-react';
import { Button } from '../ui/button';
import { ACCOUNT } from '@/lib/account';

const JWT_TOKEN = import.meta.env.VITE_JWT_TOKEN;

export default function HomeLogin() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [showPassword, setShowPasword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [errorUsername, setErrorUsername] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');

  const handleSubmit = () => {
    setError('');
    setErrorUsername('');
    setErrorPassword('');

    if (!username || !password) {
      return setError('Invalid Credentials');
    }

    if (ACCOUNT.username.toLowerCase() !== username.toLowerCase()) {
      return setErrorUsername('Username is not valid');
    }

    if (ACCOUNT.password !== password) {
      return setErrorPassword('Password is not valid');
    }

    login(
      {
        id: '1',
        name: ACCOUNT.username,
      },
      JWT_TOKEN,
    );

    navigate('/dashboard');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="w-full sm:flex-1">
          <div className="relative">
            <Input
              className="pl-10"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
          </div>
          {errorUsername && (
            <p className="text-red-500 text-[10px] mt-1 ml-1">
              {errorUsername}
            </p>
          )}
        </div>

        <div className="w-full sm:flex-1">
          <div className="relative">
            <Input
              className="pl-10 pr-10"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <button
              type="button"
              onClick={() => setShowPasword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          {errorPassword && (
            <p className="text-red-500 text-[10px] mt-1 ml-1">
              {errorPassword}
            </p>
          )}
        </div>

        <Button
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition-all"
          onClick={handleSubmit}
        >
          Login Now
        </Button>
      </div>
      {error && (
        <div className="flex bg-red-50 border border-red-200 rounded-lg p-3 items-center gap-3 text-red-600">
          <TriangleAlert size={20} />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}
