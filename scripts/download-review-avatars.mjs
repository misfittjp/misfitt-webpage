import fs from 'fs';
import path from 'path';
import https from 'https';

const reviewsFilePath = path.join(process.cwd(), 'src/data/reviews_6hour.json');
const targetDir = path.join(process.cwd(), 'public/images/reviews');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const rawData = fs.readFileSync(reviewsFilePath, 'utf-8');
const reviews = JSON.parse(rawData);

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(filepath);
        res.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        reject(new Error(`Failed to download: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

// Download with concurrency limit to avoid overwhelming the server
async function run() {
  console.log(`アバター画像のローカルダウンロードを開始 (${reviews.length} 件)...`);

  const BATCH_SIZE = 10;
  for (let i = 0; i < reviews.length; i += BATCH_SIZE) {
    const batch = reviews.slice(i, i + BATCH_SIZE);
    
    await Promise.all(batch.map(async (r) => {
      if (r.avatar && r.avatar.startsWith('http')) {
        const ext = r.avatar.includes('.png') ? '.png' : '.jpg';
        const filename = `${r.id}_${r.author.toLowerCase().replace(/[^a-z0-9]/g, '_')}${ext}`;
        const localFilePath = path.join(targetDir, filename);

        try {
          if (!fs.existsSync(localFilePath)) {
            await downloadImage(r.avatar, localFilePath);
            console.log(`[OK] Saved: ${filename}`);
          } else {
            // Already downloaded, just skip downloading
          }
          r.avatar = `/images/reviews/${filename}`;
        } catch (err) {
          console.warn(`[SKIP] Could not download ${r.author}'s avatar:`, err.message);
        }
      }
    }));
  }

  fs.writeFileSync(reviewsFilePath, JSON.stringify(reviews, null, 2), 'utf-8');
  console.log("すべての画像ダウンロードおよびJSONパスの更新が完了しました。");
}

run();
