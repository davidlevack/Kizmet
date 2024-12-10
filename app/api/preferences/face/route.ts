import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const FacePreferenceUploader = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // Preview image
    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target.result);
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
      setError(err.message);
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h3 className="text-lg font-semibold">Visual Preference</h3>
        <p className="text-sm text-gray-500">
          Upload a photo of someone you find attractive to help us understand your preferences
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          {/* Upload Area */}
          <div className="w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
              id="preference-upload"
            />
            <label htmlFor="preference-upload" className="cursor-pointer">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-44 rounded"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">
                    Click to upload an image
                  </span>
                </div>
              )}
            </label>
          </div>
          
          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {/* Upload Button */}
          <Button 
            className="w-full"
            disabled={!previewUrl || uploading}
          >
            {uploading ? 'Processing...' : 'Save Preference'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FacePreferenceUploader;