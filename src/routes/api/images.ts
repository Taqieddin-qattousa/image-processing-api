/**
 * Express route for image processing API.
 * Handles requests to resize images and serves cached thumbnails if available.
 */
import express from 'express';
import path from 'path';
import { promises as fs } from 'fs';
import processImage from '../../utilities/imageProcessor';

const images = express.Router();
/**
 * GET /api/images
 * Query parameters:
 * - filename: string (required)
 * - width: number (required)
 * - height: number (required)
 * Returns:
 * - 200: Resized image
 * - 400: Invalid parameters
 * - 404: Source image not found
 * - 500: Processing error
 */
images.get(
  '/',
  // Endpoint logic flow:
  // 1. Validate query parameters (filename, width, height).
  // 2. Check if the full-size source image exists.
  // 3. Check if a thumbnail has already been created (caching).
  // 4. If not cached, call the image processing utility.
  // 5. Send the final thumbnail file as the response.
  async (req: express.Request, res: express.Response): Promise<void> => {
    // Extract query parameters
    const filename = req.query.filename as string;
    const width = parseInt(req.query.width as string, 10);
    const height = parseInt(req.query.height as string, 10);

    // Validate parameters
    if (!filename || !width || !height || width <= 0 || height <= 0) {
      res
        .status(400)
        .send(
          'Invalid query parameters. Please provide filename, width, and height.',
        );
      return;
    }

    // Build file paths
    const fullImagePath = path.join(
      process.cwd(),
      'assets',
      'full',
      `${filename}.jpg`,
    );
    const thumbPath = path.join(
      process.cwd(),
      'assets',
      'thumbs',
      `${filename}-${width}x${height}.jpg`,
    );

    // Check if the original image exists
    try {
      await fs.access(fullImagePath);
    } catch {
      res.status(404).send('Source image not found.');
      return;
    }

    // Serve cached thumbnail if it exists, otherwise process and create it
    try {
      await fs.access(thumbPath);
      console.log(`Cache hit. Serving ${thumbPath}`);
      res.sendFile(thumbPath);
    } catch {
      // If thumbnail doesn't exist, create it
      try {
        await processImage(filename, width, height);
        console.log(`Cache miss. Created new thumbnail: ${thumbPath}`);
        res.sendFile(thumbPath);
      } catch {
        res.status(500).send('Error processing image.');
      }
    }
  },
);

export default images;
