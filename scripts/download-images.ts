// scripts/download-images.ts
import { createApi } from 'unsplash-js';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import { UNSPLASH_ACCESS_KEY } from "@/lib/constants";

// Get your free API key from https://unsplash.com/developers
const unsplash = createApi({
  accessKey: UNSPLASH_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE',
});

// Image download helper
const downloadImage = (url: string, filepath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
};

// Search queries for different product categories
const searchQueries = [
  { query: 'mens dress shirt white', count: 8, prefix: 'p1' },
  { query: 'mens dress shirt blue', count: 8, prefix: 'p2' },
  { query: 'hoodie sweatshirt', count: 7, prefix: 'p10' },
  { query: 'mens casual shirt', count: 5, prefix: 'p16' },
  { query: 'blue jeans denim', count: 6, prefix: 'p21' },
  { query: 'mens jacket outdoor', count: 6, prefix: 'p27' },
  { query: 'sneakers shoes', count: 8, prefix: 'p33' },
  { query: 't-shirt basic', count: 6, prefix: 'p41' },
];

// Delay helper to respect rate limits
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function downloadProductImages() {
  // Create directory if it doesn't exist
  const imageDir = path.join(process.cwd(), 'public', 'images', 'sample-products');
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }

  console.log('Starting image download from Unsplash...\n');

  let productNumber = 1;

  for (const searchQuery of searchQueries) {
    console.log(`Searching for: ${searchQuery.query}`);

    try {
      const result = await unsplash.search.getPhotos({
        query: searchQuery.query,
        perPage: searchQuery.count,
        orientation: 'portrait',
      });

      if (result.errors) {
        console.error('Error searching images:', result.errors);
        continue;
      }

      const photos = result.response?.results || [];

      for (let i = 0; i < photos.length && i < searchQuery.count; i++) {
        const photo = photos[i];
        
        // Download 2 images per product (main and alternate view)
        for (let imgNum = 1; imgNum <= 2; imgNum++) {
          const filename = `p${productNumber}-${imgNum}.jpg`;
          const filepath = path.join(imageDir, filename);

          // Use different sizes for variety (regular for main, small for alt)
          const imageUrl = imgNum === 1 ? photo.urls.regular : photo.urls.small;

          try {
            await downloadImage(imageUrl, filepath);
            console.log(`✓ Downloaded: ${filename}`);
          } catch (error) {
            console.error(`✗ Failed to download ${filename}:`, error);
          }

          // Small delay between downloads
          await delay(100);
        }

        productNumber++;
      }

      // Delay between search queries to respect rate limits
      await delay(1000);

    } catch (error) {
      console.error(`Error processing query "${searchQuery.query}":`, error);
    }
  }

  console.log('\n✨ Image download complete!');
  console.log(`Downloaded images to: ${imageDir}`);
}

// Run the script
downloadProductImages().catch(console.error);