import React, { useState } from 'react';
import { usePayment } from '../../contexts/PaymentContext';
import { Upload, FileText, Check, AlertCircle, X } from 'lucide-react';

interface BankTransferUploadProps {
  transactionId: string;
  onUploadComplete: () => void;
  onCancel: () => void;
}

const BankTransferUpload: React.FC<BankTransferUploadProps> = ({
  transactionId,
  onUploadComplete,
  onCancel
}) => {
  const { uploadBankTransferProof, getTransactionById } = usePayment();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transaction = getTransactionById(transactionId);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        setError('Please upload a valid image (JPG, PNG) or PDF file');
        return;
      }

      if (file.size > maxSize) {
        setError('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setError(null);

    try {
      const success = await uploadBankTransferProof(transactionId, selectedFile);
      
      if (success) {
        setUploadSuccess(true);
        setTimeout(() => {
          onUploadComplete();
        }, 2000);
      } else {
        setError('Upload failed. Please try again.');
      }
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (uploadSuccess) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="text-green-600" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-green-900 mb-2">Upload Successful!</h3>
          <p className="text-green-700 mb-4">
            Your payment proof has been uploaded successfully. Our team will review it within 24 hours.
          </p>
          <div className="text-sm text-gray-600">
            Transaction ID: {transactionId}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-navy-900">Upload Payment Proof</h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
      </div>

      {transaction && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-navy-900 mb-2">Transaction Details</h4>
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium">{transaction.currency} {transaction.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Reference:</span>
              <span className="font-medium">{transaction.reference}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                {transaction.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h4 className="font-medium text-navy-900 mb-3">Bank Transfer Instructions</h4>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-sm text-blue-800 space-y-2">
            <div><strong>Bank:</strong> Hisnak Marketplace Bank</div>
            <div><strong>Account Number:</strong> 1234567890</div>
            <div><strong>Account Name:</strong> Hisnak Marketplace Ltd</div>
            <div><strong>Reference:</strong> {transaction?.reference}</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Payment Receipt/Screenshot
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="text-sm text-gray-600">
                <span className="font-medium text-navy-600 hover:text-navy-500">
                  Click to upload
                </span> or drag and drop
              </div>
              <div className="text-xs text-gray-500 mt-1">
                PNG, JPG, PDF up to 5MB
              </div>
            </label>
          </div>
        </div>

        {selectedFile && (
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <FileText className="text-gray-500 mr-3" size={20} />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">{selectedFile.name}</div>
              <div className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</div>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {error && (
          <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="text-red-500 mr-2" size={20} />
            <span className="text-red-800 text-sm">{error}</span>
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors
              ${selectedFile && !uploading
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            {uploading ? 'Uploading...' : 'Upload Proof'}
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="mt-6 text-xs text-gray-500">
        <p>
          <strong>Note:</strong> Please ensure your payment proof clearly shows:
        </p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Transaction amount matching your order</li>
          <li>Transaction reference/description</li>
          <li>Date and time of transfer</li>
          <li>Bank/payment platform details</li>
        </ul>
      </div>
    </div>
  );
};

export default BankTransferUpload;