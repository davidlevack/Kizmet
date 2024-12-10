"use client";

import { FC } from 'react';

interface TermsProps {}

const Terms: FC<TermsProps> = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Terms of Service</h1>
      <div className="prose">
        {/* Add your terms content here */}
        <p>Welcome to our service. By using this platform, you agree to these terms...</p>
      </div>
    </div>
  );
};

export default Terms;