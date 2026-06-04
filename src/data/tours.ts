// src/data/tours.ts

export const toursContent = {
    en: {
        hero: {
            headline: "Decoding Tokyo: A Cinematic Journey.",
            subtext: "10 years. 6,000+ guests. Countless stories. Experience Tokyo not as a tourist, but as a narrative.",
            videoUrl: "https://player.vimeo.com/external/517088317.hd.mp4?s=f029311e8605330a103c809e3e7f22384f676b7e&profile_id=174"
        },
        guide: {
            title: "The Guide",
            subtitle: "Narrator of Tokyo",
            description: "Yu Narisawa brings 10 years of guiding experience, merging cinematic storytelling with deep cultural insight. Not just a tour—a narrative journey through Tokyo's hidden contexts.",
            cinematicIntro: "I am not just a guide; I am a translator of the city.\nTokyo has a pulse, a rhythm, and a hidden narrative that most walk past but never see.\nLet me show you the edit.",
            achievements: [
                "A decade of 5-star hospitality",
                "Trusted by over 6,000 global travelers",
                "Consistent Perfect Ratings on Airbnb"
            ],
            quote: "Culture is the moment when someone's 'ordinary' becomes another's 'miracle.'"
        },
        plans: {
            title: "The Tours",
            subtitle: "Choose Your Journey",
            disclaimer: "Prices are in Japanese Yen (¥). USD reference price may vary based on current exchange rate. Payment: Cash only (Credit card coming soon).",
            options: [
                {
                    duration: "6 Hours",
                    basePrice: 500, // USD
                    displayJPY: 75000, // 表示用固定JPY価格
                    description: "Essential Tokyo",
                    features: [
                        "Deep dive into 2-3 districts",
                        "Street culture & modern contexts",
                        "Curated local dining",
                        "Photography guidance",
                        "Maximum 6 participants"
                    ]
                },
                {
                    duration: "7 Hours",
                    basePrice: 550, // USD
                    displayJPY: 83000, // 表示用固定JPY価格
                    description: "Extended Exploration",
                    features: [
                        "3-4 districts covered",
                        "Traditional & contemporary blend",
                        "Extended culinary journey",
                        "Cinema-grade photo spots",
                        "Maximum 6 participants"
                    ],
                    popular: true
                },
                {
                    duration: "8 Hours",
                    basePrice: 660, // USD
                    displayJPY: 100000, // 表示用固定JPY価格
                    description: "Complete Immersion",
                    features: [
                        "Comprehensive Tokyo narrative",
                        "Full cultural spectrum",
                        "Multi-course dining experience",
                        "Exclusive hidden locations",
                        "Maximum 6 participants"
                    ]
                }
            ]
        },
        testimonials: {
            title: "Stories from Travelers",
            subtitle: "What Guests Say",
            reviews: [
                {
                    text: "This wasn't just a tour—it was a masterclass in seeing. Yu showed us a Tokyo we never knew existed.",
                    author: "Sarah M.",
                    location: "New York, USA",
                    rating: 5
                },
                {
                    text: "As a filmmaker, I was blown away by Yu's eye for composition and narrative. Best cultural experience I've ever had.",
                    author: "James L.",
                    location: "London, UK",
                    rating: 5
                },
                {
                    text: "Yu doesn't show you Tokyo—he teaches you how to read it. Transformative experience.",
                    author: "Marie D.",
                    location: "Paris, France",
                    rating: 5
                }
            ]
        },
        booking: {
            title: "Book Your Journey",
            subtitle: "Start Your Tokyo Narrative",
            description: "Select your preferred date and time. Your booking will be pending until confirmed by Yu.",
            process: [
                {
                    step: "1. Selection",
                    description: "Choose your preferred time slot (6h, 7h, or 8h)"
                },
                {
                    step: "2. Request",
                    description: "Provide details: name, group size, hotel, interests"
                },
                {
                    step: "3. Pending",
                    description: "Your request is sent to Yu for review"
                },
                {
                    step: "4. Confirmation",
                    description: "Yu approves and sends meeting details"
                }
            ],
            googleCalendarUrl: "https://calendar.google.com/calendar/appointments/schedules/YOUR_SCHEDULE_ID" // Google Workspace予約ページURL - 実際のURLに置き換え
        },
        videoTestimonials: {
            title: "The Reality",
            subtitle: "Raw Experiences",
            items: [
                {
                    id: 1,
                    thumbnail: "https://images.unsplash.com/photo-1542931287-023b922fa89b?w=800&q=80",
                    videoUrl: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761", // Tokyo street ambient
                    name: "Alex & Sarah",
                    location: "London, UK",
                    duration: "0:45"
                },
                {
                    id: 2,
                    thumbnail: "https://images.unsplash.com/photo-1554797589-7241bb691973?w=800&q=80",
                    videoUrl: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761",
                    name: "Michael Chen",
                    location: "Singapore",
                    duration: "1:20"
                },
                {
                    id: 3,
                    thumbnail: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80",
                    videoUrl: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761",
                    name: "Emma Watson",
                    location: "Sydney, Australia",
                    duration: "0:58"
                }
            ]
        },
        tailorMade: {
            title: "100% Tailor-Made",
            subtitle: "Your Curiosity, Your Route",
            description: "No two tours are the same. I don't follow a fixed manual. Based on your interests—whether it's architecture, street food, fashion, or history—I curate a unique itinerary just for you.\nThis is not a tour; it's a dialogue with the city, edited for you.",
            steps: [
                { icon: "Listening", text: "Understanding your vibe & interests" },
                { icon: "Curation", text: "Selecting the perfect districts" },
                { icon: "Experience", text: "A unique narrative unfolds" }
            ]
        },
        faq: {
            title: "Frequently Asked Questions",
            items: [
                {
                    question: "Can I book for more than 6 people?",
                    answer: "The standard tour accommodates up to 6 participants to maintain quality. For larger groups, please contact us directly to discuss custom arrangements."
                },
                {
                    question: "What happens if it rains?",
                    answer: "Tokyo is beautiful in any weather. We adapt the route to include more covered areas and indoor cultural experiences. Rain often reveals a different side of the city."
                },
                {
                    question: "What's your cancellation policy?",
                    answer: "Free cancellation up to 48 hours before the tour. Cancellations within 48 hours are subject to a 50% fee. No-shows are charged in full."
                },
                {
                    question: "Is transportation included?",
                    answer: "We use public transportation (train/subway) which is not included in the tour price. Budget approximately ¥2,000-3,000 per person for the day."
                },
                {
                    question: "Do you provide photography services?",
                    answer: "Yes, Yu captures moments throughout the tour with professional equipment. You'll receive curated photos after the experience."
                }
            ]
        }
    },
    ja: {
        hero: {
            headline: "東京を読み解く、シネマティックな旅。",
            subtext: "10年。6,000人以上のゲスト。数え切れないストーリー。観光客としてではなく、物語の一部として東京を体験する。",
            videoUrl: "https://player.vimeo.com/external/517088317.hd.mp4?s=f029311e8605330a103c809e3e7f22384f676b7e&profile_id=174"
        },
        guide: {
            title: "ガイド",
            subtitle: "東京の語り部",
            description: "成澤祐一は10年のガイド経験を持ち、シネマティックなストーリーテリングと深い文化的洞察を融合させています。単なるツアーではなく、東京の隠されたコンテクストを巡る物語の旅。",
            cinematicIntro: "私は単なるガイドではなく、都市の翻訳者でありたい。\n東京には、誰もが通り過ぎてしまうリズムと、隠された物語の脈動がある。\nその「編集された東京」をお見せします。",
            achievements: [
                "10年にわたる5つ星のホスピタリティ",
                "6,000人以上の国際的な旅行者から信頼されています",
                "Airbnbで一貫して完璧な評価"
            ],
            quote: "文化とは、誰かにとっての「普通」が、他の誰かにとっては「奇跡」になる瞬間です。"
        },
        plans: {
            title: "ツアー",
            subtitle: "あなたの旅を選ぶ",
            disclaimer: "料金は日本円（¥）表示です。USD参考価格は現在の為替レートにより変動します。支払い方法：現金のみ（カード決済は準備中）",
            options: [
                {
                    duration: "6時間",
                    basePrice: 500, // USD
                    displayJPY: 75000, // 表示用固定JPY価格
                    description: "エッセンシャル東京",
                    features: [
                        "2-3エリアの深掘り",
                        "ストリートカルチャー＆モダンコンテクスト",
                        "厳選されたローカルダイニング",
                        "写真撮影ガイダンス",
                        "最大6名まで"
                    ]
                },
                {
                    duration: "7時間",
                    basePrice: 550, // USD
                    displayJPY: 83000, // 表示用固定JPY価格
                    description: "拡張探索",
                    features: [
                        "3-4エリアをカバー",
                        "伝統と現代の融合",
                        "拡張された食の旅",
                        "シネマグレードの撮影スポット",
                        "最大6名まで"
                    ],
                    popular: true
                },
                {
                    duration: "8時間",
                    basePrice: 660, // USD
                    displayJPY: 100000, // 表示用固定JPY価格
                    description: "完全没入",
                    features: [
                        "包括的な東京の物語",
                        "文化の全スペクトラム",
                        "多コースダイニング体験",
                        "限定の隠れた場所",
                        "最大6名まで"
                    ]
                }
            ]
        },
        testimonials: {
            title: "旅行者の声",
            subtitle: "ゲストの感想",
            reviews: [
                {
                    text: "これは単なるツアーではなかった。見ることのマスタークラスだった。Yuは私たちが知らなかった東京を見せてくれた。",
                    author: "Sarah M.",
                    location: "ニューヨーク、アメリカ",
                    rating: 5
                },
                {
                    text: "映像作家として、Yuの構図と物語への目に圧倒された。今まで経験した中で最高の文化体験。",
                    author: "James L.",
                    location: "ロンドン、イギリス",
                    rating: 5
                },
                {
                    text: "Yuは東京を見せるのではなく、読み方を教えてくれる。人生を変える体験だった。",
                    author: "Marie D.",
                    location: "パリ、フランス",
                    rating: 5
                }
            ]
        },
        booking: {
            title: "予約する",
            subtitle: "あなたの東京物語を始めよう",
            description: "ご希望の日時を選択してください。予約はYuが確認するまで保留されます。",
            process: [
                {
                    step: "1. 選択",
                    description: "希望のタイムスロット（6h、7h、8h）を選択"
                },
                {
                    step: "2. リクエスト",
                    description: "詳細を入力：名前、人数、ホテル、興味のある分野"
                },
                {
                    step: "3. 保留",
                    description: "リクエストがYuに送信されます"
                },
                {
                    step: "4. 確認",
                    description: "Yuが承認し、集合場所の詳細を送信"
                }
            ],
            googleCalendarUrl: "https://calendar.google.com/calendar/appointments/schedules/YOUR_SCHEDULE_ID" // Google Workspace予約ページURL - 実際のURLに置き換え
        },
        videoTestimonials: {
            title: "リアルな体験",
            subtitle: "生の映像記録",
            items: [
                {
                    id: 1,
                    thumbnail: "https://images.unsplash.com/photo-1542931287-023b922fa89b?w=800&q=80",
                    videoUrl: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761",
                    name: "アレックス & サラ",
                    location: "ロンドン、イギリス",
                    duration: "0:45"
                },
                {
                    id: 2,
                    thumbnail: "https://images.unsplash.com/photo-1554797589-7241bb691973?w=800&q=80",
                    videoUrl: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761",
                    name: "マイケル・チェン",
                    location: "シンガポール",
                    duration: "1:20"
                },
                {
                    id: 3,
                    thumbnail: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80",
                    videoUrl: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761",
                    name: "エマ・ワトソン",
                    location: "シドニー、オーストラリア",
                    duration: "0:58"
                }
            ]
        },
        tailorMade: {
            title: "100% オーダーメイド",
            subtitle: "あなたの好奇心が、道順になる",
            description: "二つとして同じツアーはありません。マニュアル通りの案内は一切行いません。\n建築、食文化、ファッション、歴史……。\nあなたの興味に合わせて、その日だけの特別なルートを私がキュレーションします。これはツアーではなく、あなたのために編集された、都市との対話です。",
            steps: [
                { icon: "Listening", text: "興味とバイブスを理解する" },
                { icon: "Curation", text: "最適なエリアを選定" },
                { icon: "Experience", text: "あなただけの物語が展開する" }
            ]
        },
        faq: {
            title: "よくある質問",
            items: [
                {
                    question: "6人以上で予約できますか？",
                    answer: "標準ツアーは品質を保つため最大6名までです。大規模グループについては、カスタムアレンジについて直接お問い合わせください。"
                },
                {
                    question: "雨の場合はどうなりますか？",
                    answer: "東京はどんな天候でも美しいです。屋根のあるエリアや屋内の文化体験を含むようにルートを調整します。雨は都市の別の側面を明らかにすることがよくあります。"
                },
                {
                    question: "キャンセルポリシーは？",
                    answer: "ツアーの48時間前まで無料キャンセル可能。48時間以内のキャンセルは50%の手数料がかかります。無断キャンセルは全額請求となります。"
                },
                {
                    question: "交通費は含まれていますか？",
                    answer: "公共交通機関（電車/地下鉄）を使用しますが、料金はツアー価格に含まれていません。1日あたり約2,000～3,000円を見込んでください。"
                },
                {
                    question: "写真撮影サービスはありますか？",
                    answer: "はい、Yuがプロ機材でツアー中の瞬間を撮影します。体験後に厳選された写真をお渡しします。"
                }
            ]
        }
    }
};
