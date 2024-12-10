// pages/legal/terms.js
import { Card } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="container mx-auto py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
        <div className="prose">
          {/* Add your terms content here */}
          <p>Welcome to Kizmet. By using our service, you agree to these terms...</p>
        </div>
      </Card>
    </div>
  );
}