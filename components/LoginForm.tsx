// components/LoginForm.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const LoginForm = () => {
  return (
    <div className="w-full max-w-md mx-auto p-6">
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Email
          </label>
          <Input
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Password
          </label>
          <Input
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <Button className="w-full">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
