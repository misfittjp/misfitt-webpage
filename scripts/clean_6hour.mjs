import fs from 'fs';
import path from 'path';

const rawPath = path.join(process.cwd(), 'src/data/reviews_6hour_raw_288items.json');
const outputPath = path.join(process.cwd(), 'src/data/reviews_6hour.json');

if (!fs.existsSync(rawPath)) {
  console.error("reviews_6hour_raw_288items.json が見つかりません。");
  process.exit(1);
}

const rawData = JSON.parse(fs.readFileSync(rawPath, 'utf-8'));

// 1. 他社体験やUIゴミを除外
const invalidKeywords = [
  '体験', 'クッキング', '文化体験', 'アートワークショップ', 'アウトドア',
  'ゲスト1人あたり', '5つ星中', '宿泊先のハイライト', '予約可能な日付がありません'
];

const filtered = rawData.filter(item => {
  if (!item.content || item.content.length < 15) return false;
  if (invalidKeywords.some(kw => item.content.includes(kw) || item.author.includes(kw))) return false;
  if (item.author === '宿泊' || item.author === 'Yu' || item.author === '体験できること') return false;
  return true;
});

// 2. 本文のクリーニングと重複排除
const cleanedList = [];
const seenContent = new Set();

filtered.forEach((r, idx) => {
  let text = r.content;

  // ホスト返信の分離
  let hostReply = null;
  if (text.includes('ホストからの返信')) {
    const parts = text.split('ホストからの返信');
    text = parts[0];
    hostReply = parts[1]?.replace(/^[\s\n·、]+/, '').replace(/\nYu[\s\S]*$/, '').trim();
  }

  // 複数人のテキストが連結している場合のクリーンアップ（最初の1人分のみを抽出）
  if (text.includes('さらに表示')) {
    text = text.split('さらに表示')[0];
  }

  // 不要なUI定型句の削除
  text = text
    .replace(/^.*?,\s*.*?[州国県日本]\s*[、·\s]+/g, '') // 先頭の地域表記を除去
    .replace(/日本語に翻訳/g, '')
    .trim();

  // 20文字以上の有効な本文のみを採用（重複排除）
  if (text.length >= 20 && !seenContent.has(text.slice(0, 30))) {
    seenContent.add(text.slice(0, 30));

    // 地域・場所の取得
    const locMatch = r.content.match(/^([^\n]+,[^\n]+|[^\n]+(?:州|県|国|日本|France|USA|Canada))/);
    const location = locMatch ? locMatch[0].replace(/[、·]/g, '').trim() : '';

    cleanedList.push({
      id: `rev-6h-${String(cleanedList.length + 1).padStart(3, '0')}`,
      author: r.author || 'Airbnb Guest',
      location: location.length < 30 ? location : '',
      avatar: r.avatar,
      date: r.date || '',
      rating: 5,
      tourType: '6-Hour Bespoke Tokyo Experience',
      content: text,
      hostReply: hostReply || r.hostReply || null
    });
  }
});

fs.writeFileSync(outputPath, JSON.stringify(cleanedList, null, 2), 'utf-8');
console.log(`完全クリーンアップ完了: ${cleanedList.length} 件のレビューを保存しました。`);
