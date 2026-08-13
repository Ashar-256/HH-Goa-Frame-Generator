/**
 * File Helpers & Browser Image Decoder Utilities
 */

export const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB limit

export const validateImageFile = (file) => {
  if (!file) {
    return { valid: false, error: 'No file selected. Please choose a photo.' };
  }

  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
  const fileType = file.type?.toLowerCase() || '';
  const fileName = file.name?.toLowerCase() || '';
  const isExtensionValid = fileName.match(/\.(jpg|jpeg|png|webp|heic|heif)$/i);

  if (!validTypes.includes(fileType) && !isExtensionValid) {
    return { 
      valid: false, 
      error: 'Unsupported image format. Please upload a JPG, PNG, WEBP, or HEIC file.' 
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { 
      valid: false, 
      error: 'File size exceeds 50MB limit. Please upload a smaller photo.' 
    };
  }

  return { valid: true };
};

export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Decodes a File or Blob or object URL into a loaded HTMLImageElement preserving natural dimensions.
 * @param {File|Blob|string} source 
 * @returns {Promise<HTMLImageElement>}
 */
export const loadImageElement = (source) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    let objectUrl = null;
    if (typeof source === 'string') {
      img.src = source;
    } else if (source instanceof File || source instanceof Blob) {
      objectUrl = URL.createObjectURL(source);
      img.src = objectUrl;
    } else {
      reject(new Error('Invalid image source type'));
      return;
    }

    img.onload = () => {
      if (objectUrl) {
        // Keep objectUrl reference attached to element for cleanup if needed
        img._objectUrl = objectUrl;
      }
      resolve(img);
    };

    img.onerror = (err) => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to decode image file. File may be corrupted or format unsupported by browser.'));
    };
  });
};

export const revokeImageObjectUrl = (imgOrUrl) => {
  if (typeof imgOrUrl === 'string' && imgOrUrl.startsWith('blob:')) {
    URL.revokeObjectURL(imgOrUrl);
  } else if (imgOrUrl && imgOrUrl._objectUrl) {
    URL.revokeObjectURL(imgOrUrl._objectUrl);
  }
};
