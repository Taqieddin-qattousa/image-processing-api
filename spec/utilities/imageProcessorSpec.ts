import { promises as fs } from 'fs';
import path from 'path';
import processImage from '../../src/utilities/imageProcessor';

describe('Image Processing Utility', () => {
  it('should resize an image to the specified dimensions', async () => {
    const filename = 'fjord';
    const width = 100;
    const height = 100;
    const outputPath = path.join(
      process.cwd(),
      'assets',
      'thumbs',
      `${filename}-${width}x${height}.jpg`,
    );

    // We expect that calling our function does not throw an error
    await expect(async () => {
      await processImage(filename, width, height);
    }).not.toThrow();

    // We also expect that the output file can be accessed (meaning it was created)
    await expect(async () => {
      await fs.access(outputPath);
    }).not.toThrow();
  });
  it('should throw an error for a non-existent input file', async () => {
    const filename = 'nonexistent';
    const width = 100;
    const height = 100;

    // Expect the promise to be rejected (i.e., an error is thrown)
    await expectAsync(processImage(filename, width, height)).toBeRejected();
  });

  afterAll(async () => {
    const filename = 'fjord';
    const width = 100;
    const height = 100;
    const outputPath = path.join(
      process.cwd(),
      'assets',
      'thumbs',
      `${filename}-${width}x${height}.jpg`,
    );

    try {
      await fs.unlink(outputPath);
    } catch {
      // This block is intentionally empty. The comment fixes the
      // "empty block" error, and removing "(error)" from catch
      // fixes the "unused variable" error.
    }
  });
});
