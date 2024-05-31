"use client"
import React, { useState, useRef } from 'react';
import Image from 'next/image';
const VideoUpload = () => {
  const [selectedVideos, setSelectedVideos] = useState([]);
  const fileInputRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    // Filter and store only video files
    const videoFiles = files.filter((file) => file.type.startsWith('video/'));
    setSelectedVideos([...selectedVideos, ...videoFiles]);
  };

  const handleOpenFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    setSelectedImages([...selectedImages, ...imageFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const files = Array.from(e.dataTransfer.files);

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    setSelectedImages([...selectedImages, ...imageFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e) => {
    setIsDraggingOver(false);
  };
  return (
    <>
    <div>
      <div className={`flex flex-col space-y-3 w-full`}>
        <label className="text-gray-800 font-semibold">
          Drag and Drop Video or Click to Select
        </label>
        <input
          type="file"
          className="hidden"
          multiple
          ref={fileInputRef}
          onChange={handleVideoChange}
          accept="video/*"
        />
        <div
          className="outline-gray-200 rounded-lg bg-gray-100 p-5 cursor-pointer"
          onClick={handleOpenFileInput}
        >
          Click to Select Video
        </div>

        {selectedVideos.length > 0 && (
          <div className="mt-3">
            <h2>Selected Videos:</h2>
            <div className="flex flex-wrap">
              {selectedVideos.map((video, index) => (
                <div key={index} className="p-2">
                  <video
                    controls
                    width="300"
                    src={URL.createObjectURL(video)}
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    <div className="flex flex-col space-y-3 w-full">
            <div
              className={`flex flex-col space-y-3 w-full ${
                isDraggingOver
                  ? "border-dashed border-2 border-gray-300 p-4"
                  : ""
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <label className="text-gray-800 font-semibold">
                Drag and Drop Images or Click to Select
              </label>
              <input
                type="file"
                className="hidden"
                multiple // Allow multiple file selection
                onChange={handleImageChange}
              />
              <div
                className="outline-gray-200 rounded-lg bg-gray-100 p-5 cursor-pointer"
                onClick={() =>
                  document.querySelector('input[type="file"]').click()
                }
              >
                Click to Select Images
              </div>

              {selectedImages.length > 0 && (
                <div className="mt-3">
                  <h2>Selected Images:</h2>
                  <div className="flex flex-wrap">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="p-2">
                        <Image
                          src={URL.createObjectURL(image)}
                          alt={image.name}
                          width={100}
                          height={100}
                          className="max-w-full h-auto rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
    </>
  );
};

export default VideoUpload;
