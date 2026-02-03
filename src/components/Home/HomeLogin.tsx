import { useState } from 'react';
import { Input } from '../ui/input';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { Button } from '../ui/button';

export default function HomeLogin() {
  const [showPassword, setShowPasword] = useState<boolean>(false);
  return (
    <div className="flex space-x-5">
      <div className="relative flex-1">
        <Input
          className="pl-10"
          type="text"
          placeholder="Enter your username"
        />
        <User
          className="absolute text-xs top-0 translate-y-1/2 translate-x-1/2 text-slate-400"
          size={18}
        />
      </div>
      <div className="relative flex-1">
        <Input
          className="pl-10"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
        />
        <Lock
          className="absolute text-xs top-0 translate-y-1/2 translate-x-1/2 text-slate-400"
          size={18}
        />
        {showPassword ? (
          <Eye
            className="absolute text-xs top-0 right-0 translate-y-1/2 -translate-x-1/2 text-slate-400"
            size={18}
            onClick={() => setShowPasword(false)}
          />
        ) : (
          <EyeOff
            className="absolute text-xs top-0 right-0 translate-y-1/2 -translate-x-1/2 text-slate-400"
            size={18}
            onClick={() => setShowPasword(true)}
          />
        )}
      </div>
      <Button className="bg-blue-500 hover:bg-blue-700 transition-colors ease-in duration-300">
        Login Now
      </Button>
    </div>
  );
}
