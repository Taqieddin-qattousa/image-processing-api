/**
 * Image processing utility using Sharp.
 * Exports a function to resize JPG images and save them to the thumbs directory.
 */
import sharp from 'sharp';
import path from 'path';
/**
 * Resizes an image using Sharp and saves it to the thumbs folder.
 * @param {string} filename - The name of the source image file (without extension).
 * @param {number} width - The target width in pixels.
 * @param {number} height - The target height in pixels.
 * @returns {Promise<void>} A promise that resolves when the image has been processed and saved.
 * @throws {Error} Throws an error if the input file is not found or if the processing fails.
 */
const processImage = async (
  filename: string,
  width: number,
  height: number,
): Promise<void> => {
  // Build input and output paths from project root
  const inputPath = path.join(
    process.cwd(),
    'assets',
    'full',
    `${filename}.jpg`,
  );
  const outputPath = path.join(
    process.cwd(),
    'assets',
    'thumbs',
    `${filename}-${width}x${height}.jpg`,
  );
  // Resize and save the image
  await sharp(inputPath).resize(width, height).toFile(outputPath);
};

export default processImage;
