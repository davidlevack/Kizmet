import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AuthSystem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Sign in logic would go here
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Sign up logic would go here
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <Tabs defaultValue="signin" className="space-y-6">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  required
                  placeholder="Enter your password"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <Input
                    required
                    placeholder="First name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <Input
                    required
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  required
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  required
                  placeholder="Confirm your password"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthSystem;