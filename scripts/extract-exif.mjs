import fs from 'fs';
import path from 'path';
import exifr from 'exifr';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGE_DIR = path.join(__dirname, '../public/images/hero');
const OUTPUT_FILE = path.join(__dirname, '../src/data/heroExif.json');

async function main() {
  const files = fs.readdirSync(IMAGE_DIR).filter(file => file.endsWith('.jpeg') || file.endsWith('.jpg'));
  const exifData = {};

  for (const file of files) {
    const filePath = path.join(IMAGE_DIR, file);
    try {
      const data = await exifr.parse(filePath, { tiff: true, exif: true });
      if (data) {
        // Format the data
        const model = data.Model || null;
        const lens = data.LensModel || null;
        
        let exposureTime = null;
        if (data.ExposureTime) {
           exposureTime = data.ExposureTime < 1 ? `1/${Math.round(1/data.ExposureTime)}s` : `${data.ExposureTime}s`;
        }
        
        const fNumber = data.FNumber ? `f/${data.FNumber}` : null;
        const iso = data.ISO ? `${data.ISO}` : null;
        const focalLength = data.FocalLength ? `${data.FocalLength}mm` : null;
        
        let capturedAt = null;
        const dateObj = data.DateTimeOriginal || data.CreateDate;
        if (dateObj) {
           const d = new Date(dateObj);
           if (!isNaN(d.getTime())) {
             const y = d.getFullYear();
             const m = String(d.getMonth() + 1).padStart(2, '0');
             const day = String(d.getDate()).padStart(2, '0');
             const h = String(d.getHours()).padStart(2, '0');
             const min = String(d.getMinutes()).padStart(2, '0');
             const s = String(d.getSeconds()).padStart(2, '0');
             capturedAt = `${y}.${m}.${day} ${h}:${min}:${s}`;
           }
        }
        
        exifData[`/images/hero/${file}`] = {
          model,
          lens,
          focalLength,
          fNumber,
          exposureTime,
          iso,
          capturedAt
        };
      } else {
        exifData[`/images/hero/${file}`] = null;
      }
    } catch (e) {
      console.log(`Failed for ${file}:`, e.message);
      exifData[`/images/hero/${file}`] = null;
    }
  }

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(exifData, null, 2));
  console.log('Saved to', OUTPUT_FILE);
}

main();
