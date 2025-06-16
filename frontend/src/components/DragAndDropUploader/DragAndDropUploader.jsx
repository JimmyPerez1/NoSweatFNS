import { useRef, useState } from 'react';
import { handleUpload } from '../../services/documentService';

export default function DragAndDropUploader({ docType, workOrderNumber, profileId, onUploadComplete }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef();

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      await handleUpload({ target: { files: [file] } }, docType, workOrderNumber, profileId);
      onUploadComplete?.();
    }
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await handleUpload(e, docType, workOrderNumber, profileId);
      onUploadComplete?.();
    }
  };
  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
      className={`border-2 p-4 rounded-md text-center cursor-pointer ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
    >
      <input
        type="file"
        hidden
        ref={inputRef}
        onChange={handleChange}
        accept="application/pdf,image/*"
      />
      <p>{isDragging ? 'Drop the file here...' : 'Click or drag a file to upload'}</p>
    </div>
  );
}