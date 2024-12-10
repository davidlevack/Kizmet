"use client";

import React, { useState, ChangeEvent } from 'react';
import { Upload } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Image from 'next/image';

const FacePreferenceUploader: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Preview image
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        setPreviewUrl(e.target.result);
      }
    };
    reader.readAsDataURL(file);
    
    try {
      setUploading(true);
      setError(null);
      
      const formData = new FormData();
      formData.append('preference_image', file);
      
      const response = await fetch('/api/preferences/face', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Visual Preference</h3>
        <p className="text-sm text-gray-500">
          Upload a photo of someone you find attractive to help us understand your preferences
        </p>
      
        <div className="flex flex-col items-center gap-4">
          <div className="w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
              id="preference-upload"
            />
            <label 
              htmlFor="preference-upload" 
              className="cursor-pointer w-full h-full flex flex-col items-center justify-center"
            >
              {previewUrl && (
                <div className="relative w-full h-64 mb-4">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="flex flex-col items-center">
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">
                  Click to upload an image
                </span>
              </div>
            </label>
          </div>
          
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Button 
            className="w-full"
            disabled={!previewUrl || uploading}
          >
            {uploading ? 'Processing...' : 'Save Preference'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FacePreferenceUploader;