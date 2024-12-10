// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary to-secondary">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <Card className="text-center">
          <CardHeader>
            <Image
              src="/logo.svg"
              alt="Kizmet Logo"
              width={150}
              height={150}
              className="mx-auto"
            />
            <CardTitle className="text-4xl font-bold text-primary-foreground">
              Welcome to Kizmet
            </CardTitle>
            <CardDescription>
              Find your perfect match based on personality, values, and attraction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                <Link href="/auth/signup">
                  <Button size="lg">Sign Up</Button>
                </Link>
              </p>
              <p>
                Already have an account?{' '}
                <Link href="/auth/signin" className="text-primary font-medium hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Personality-Based</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>We use the Big Five personality model to understand who you are and who you're looking for</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shared Values</CardTitle>  
                </CardHeader>
                <CardContent>
                  <p>We match you with people who share your core values and beliefs</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Visual Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Our unique AI technology learns your visual type and suggests matches you'll find attractive</p>
                </CardContent>
              </Card>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}