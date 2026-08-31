const fs = require('fs');

// 既存のマスターデータを読み込み（または各JSONを結合）
const reviews6h = JSON.parse(fs.readFileSync('./src/data/reviews_6hour.json', 'utf8'));
const reviews8h = JSON.parse(fs.readFileSync('./src/data/reviews_8hour.json', 'utf8'));
const reviewsTbl = JSON.parse(fs.readFileSync('./src/data/reviews_tbl.json', 'utf8'));

const allReviews = [...reviews6h, ...reviews8h, ...reviewsTbl];

// 1. ロケーションの正規化辞書（CAなどの曖昧な略称を分かりやすく補正）
const locationMap = {
  "Long Beach, CA": "Long Beach, California",
  "San Francisco, CA": "San Francisco, California",
  "Los Angeles, CA": "Los Angeles, California",
  "Palo Alto, CA": "Palo Alto, California",
  "San Jose, CA": "San Jose, California",
  "Oakland, CA": "Oakland, California",
  "Kirkland, WA": "Kirkland, Washington",
  "Denver, CO": "Denver, Colorado",
  "Houston, TX": "Houston, Texas",
  "New York, NY": "New York, New York",
  "Global Traveler": "Tokyo Explorer"
};

// 2. 殿堂入りキラーコメントの優先度（Weight）設定
const killerAuthors = ["Joseph", "Donna", "Lillie", "Valentin", "Chanel"];

const normalizedReviews = allReviews.map((rev, index) => {
  // ロケーションのクリーンアップ
  let cleanLocation = locationMap[rev.location] || rev.location || "Global Traveler";
  // 「、」「州」などが混ざっている場合の簡易置換
  cleanLocation = cleanLocation.replace(/、/g, ", ").replace(/州/g, "").trim();

  // 殿堂入りコメント判定（Featured フラグと優先順位スコア）
  const isKiller = killerAuthors.includes(rev.author);
  const priorityScore = isKiller ? 100 : (rev.content.length > 300 ? 50 : 10);

  return {
    id: `rev-all-${String(index + 1).padStart(3, '0')}`,
    tourType: rev.tourType,
    author: rev.author,
    location: cleanLocation,
    date: rev.date || "Recent",
    rating: rev.rating || 5,
    language: rev.language || "en",
    // 英語以外のみ翻訳フラグを立てる
    needsTranslation: (rev.language || "en") !== "en",
    avatar: rev.avatar || rev.avatarUrl || null,
    featured: isKiller,
    priority: priorityScore,
    content: rev.content.trim(),
    translatedContent: rev.translatedContent || rev.content.trim()
  };
});

// 優先度が高い順（殿堂入り・長文熱量順）にソート
normalizedReviews.sort((a, b) => b.priority - a.priority);

// マスターファイルとして出力
fs.writeFileSync('./src/data/reviews.json', JSON.stringify(normalizedReviews, null, 2), 'utf8');
console.log(`【統合完了】 全 ${normalizedReviews.length} 件のレビューを正規化・優先順位付けして reviews.json に保存しました。`);
