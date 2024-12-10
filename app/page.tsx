// app/page.tsx
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome to Kizmet
        </h1>
        <p className="text-center text-gray-600">
          A personality-based dating application
        </p>
      </Card>
    </main>
  );
}