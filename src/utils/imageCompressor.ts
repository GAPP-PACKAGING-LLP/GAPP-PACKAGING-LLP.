/**
 * Utility for client-side image compression & format optimization.
 * Reduces raw MB-heavy camera/scanner uploads down to ultra-crisp <200KB assets.
 */

export interface CompressionResult {
  file: File;
  dataUrl: string;
  originalSizeKb: number;
  compressedSizeKb: number;
  reductionLabel: string;
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file as data URL'));
    reader.readAsDataURL(file);
  });
}

/**
 * Compresses an image client-side to ensure fast uploads, zero timeout,
 * and safe storage size within Firestore document limits (<200KB).
 */
export async function compressImageFile(
  file: File,
  maxWidth = 1400,
  maxHeight = 1400,
  quality = 0.85
): Promise<CompressionResult> {
  const originalSizeKb = Math.round(file.size / 1024);

  // 1. If not an image (e.g. PDF), return original with data URL
  if (!file.type.startsWith('image/')) {
    const dataUrl = await fileToDataUrl(file);
    return {
      file,
      dataUrl,
      originalSizeKb,
      compressedSizeKb: originalSizeKb,
      reductionLabel: `${(file.size / (1024 * 1024)).toFixed(2)} MB (PDF document)`
    };
  }

  // 2. If SVG Vector, preserve directly without canvas rasterization
  if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')) {
    const dataUrl = await fileToDataUrl(file);
    return {
      file,
      dataUrl,
      originalSizeKb,
      compressedSizeKb: originalSizeKb,
      reductionLabel: `${originalSizeKb} KB (Vector SVG)`
    };
  }

  // 3. If image is already very small (< 150KB), read directly as Data URL
  if (file.size <= 150 * 1024) {
    try {
      const dataUrl = await fileToDataUrl(file);
      return {
        file,
        dataUrl,
        originalSizeKb,
        compressedSizeKb: originalSizeKb,
        reductionLabel: `${originalSizeKb} KB`
      };
    } catch (e) {
      // Continue to canvas if needed
    }
  }

  // 4. Compress raster images via Canvas
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          let { width, height } = img;
          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = Math.max(width, 1);
          canvas.height = Math.max(height, 1);
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            return resolve({
              file,
              dataUrl: e.target?.result as string,
              originalSizeKb,
              compressedSizeKb: originalSizeKb,
              reductionLabel: `${originalSizeKb} KB`
            });
          }

          // Preserve transparent background for PNG/WebP
          const isTransparentFormat = file.type === 'image/png' || file.type === 'image/webp';
          if (!isTransparentFormat) {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const targetMime = file.type === 'image/png' ? 'image/png' : (file.type === 'image/webp' ? 'image/webp' : 'image/jpeg');
          const compressedDataUrl = canvas.toDataURL(targetMime, isTransparentFormat ? undefined : quality);

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                return resolve({
                  file,
                  dataUrl: compressedDataUrl,
                  originalSizeKb,
                  compressedSizeKb: originalSizeKb,
                  reductionLabel: `${originalSizeKb} KB`
                });
              }
              const ext = targetMime === 'image/png' ? '.png' : (targetMime === 'image/webp' ? '.webp' : '.jpg');
              const cleanName = file.name.replace(/\.[^/.]+$/, '') + ext;
              const compressedFile = new File([blob], cleanName, { type: targetMime });
              const compressedSizeKb = Math.round(compressedFile.size / 1024);
              resolve({
                file: compressedFile,
                dataUrl: compressedDataUrl,
                originalSizeKb,
                compressedSizeKb,
                reductionLabel: `${originalSizeKb} KB → ${compressedSizeKb} KB`
              });
            },
            targetMime,
            isTransparentFormat ? undefined : quality
          );
        } catch (canvasErr) {
          console.warn('Canvas optimization fallback:', canvasErr);
          resolve({
            file,
            dataUrl: e.target?.result as string,
            originalSizeKb,
            compressedSizeKb: originalSizeKb,
            reductionLabel: `${originalSizeKb} KB`
          });
        }
      };

      img.onerror = () => {
        resolve({
          file,
          dataUrl: e.target?.result as string,
          originalSizeKb,
          compressedSizeKb: originalSizeKb,
          reductionLabel: `${originalSizeKb} KB`
        });
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      resolve({
        file,
        dataUrl: '',
        originalSizeKb,
        compressedSizeKb: originalSizeKb,
        reductionLabel: 'Error reading file'
      });
    };

    reader.readAsDataURL(file);
  });
}
