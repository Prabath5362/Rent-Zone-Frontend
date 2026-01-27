import React, { useState } from 'react'
import ImageUploadService from '../../services/ImageUploadService';
import { BounceLoader } from 'react-spinners';

function Imageinput({setImageUrl}) {
 const [preview, setPreview] = useState(null);
 const [isImageUploading, setIsImageUploading] = useState(false);


 const handleFileChange =async (e) => {
    setIsImageUploading(true);
    const file = e.target.files[0];

    try {
    
      const imageUrl = await ImageUploadService(file);
      setImageUrl(imageUrl);
      console.log(imageUrl);
      setIsImageUploading(false);
    } catch (error) {
      console.log(error);
      setIsImageUploading(false);
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label className="block text-xs text-gray-100 mb-1">Profile Picture</label>

      {/* Hidden File Input */}
      <input
        type="file"
        id="profilePic"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Styled Picker */}
      <label
        htmlFor="profilePic"
        className="w-32 h-32 rounded-full border-2 border-white/30 bg-gray-700 flex items-center justify-center cursor-pointer overflow-hidden hover:border-accent transition"
      >
        {preview ? (
          <img
            src={preview}
            alt="Profile Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-300 text-center text-sm">
            {isImageUploading? <BounceLoader color="#FF204E"/> : <span> Select Image</span>}
          </span>
        )}
      </label>

      <p className="text-gray-400 text-xs mt-2">
        Max size 2MB. JPG or PNG.
      </p>
    </div>
  );
}

export default Imageinput