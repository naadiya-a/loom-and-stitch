'use client';

import { ImagePlus } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ImageUploadProps {
  onImageUpload: (imageFile: File) => void;
  existingImageUrl?: string;
}

export default function ImageUpload({
  onImageUpload,
  existingImageUrl,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(existingImageUrl || '');

  useEffect(() => {
    if (existingImageUrl) {
      setPreview(existingImageUrl);
    }
  }, [existingImageUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    onImageUpload(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <input
        type="file"
        id="file-input"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <label
        htmlFor="file-input"
        className="w-32 h-32 sm:w-36 sm:h-36 p-1 cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg"
      >
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            width={144}
            height={144}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <>
            <ImagePlus className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 mb-2" />
            <span className="text-xs sm:text-sm text-gray-500 text-center">
              Add an image
            </span>
          </>
        )}
      </label>
    </div>
  );
}
