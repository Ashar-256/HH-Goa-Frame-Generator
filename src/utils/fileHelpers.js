/**
 * File Helper Utilities
 */

export const validateImageFile = (file) => {
  if (!file) return { valid: false, error: 'No file selected' };
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
  if (!validTypes.includes(file.type.toLowerCase()) && !file.name.match(/\.(heic|heif)$/i)) {
    return { valid: false, error: 'Unsupported file format. Please upload JPEG, PNG, WEBP, or HEIC.' };
  }
  return { valid: true };
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
