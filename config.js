/**
 * ============================================================================
 * RTA走者タイプ診断 - 設定・診断データファイル (config.js)
 * ============================================================================
 *
 * 【このファイルの使い方】
 * 質問項目（CHECKUP_ITEMS）や、診断結果の名前・文章・スタンプ・出現条件（DIAGNOSIS_RULES）を
 * メモ帳やテキストエディタで直接書き換えて保存するだけで、ページに反映されます。
 *
 * ■ スライダー数値の基準（0 〜 100）：
 *   0 〜 39  : 左寄り（例: やりたい時にやる / 攻めルート / 即リセ / 感覚派 / 独自開拓 / アドリブ対応）
 *   40 〜 60 : 中央（バランス派・ハイブリッド）
 *   61 〜 100: 右寄り（例: 毎日コツコツ / 安定ルート / 通し派 / 理論派 / 他者から学ぶ / 事前対策）
 *
 * ■ 6つの項目ID：
 *   stance   : ITEM 01 RTAの取り組み方
 *   route    : ITEM 02 ルートや技の選択
 *   mistake  : ITEM 03 ミスした時
 *   practice : ITEM 04 難しい技の練習
 *   learning : ITEM 05 コツの掴み方
 *   recovery : ITEM 06 リカバリーの備え
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. 診断結果のリストと出現条件（上から順番に判定され、最初に合致したものが選ばれます）
// ----------------------------------------------------------------------------
const DIAGNOSIS_RULES = [
  {
    id: 'balancer',
    // 【条件①】全6項目が中央(50)からプラスマイナス19以内（31〜69の範囲内）のとき
    condition: (v, stats) => stats.maxDeviation <= 19,
    ja: {
      catch: 'すべての状況に柔軟に適応する',
      title: 'オールラウンド・バランサー走者',
      description: '攻めと安定、感覚と理論、独学と吸収のすべてにおいて偏りがない万能タイプです。一発勝負のイベント並走から長期の自己ベスト狙いまで、状況に合わせてギアを自在に切り替えられます。',
      stamp: '万能型'
    },
    en: {
      catch: 'Adapting seamlessly to any speedrun situation',
      title: 'All-Rounder Hybrid Speedrunner',
      description: 'A versatile speedrunner with a natural balance between risky and safe strats, intuition and theory, solo discovery and community learning. Equally strong in marathon showcases and PB grinds.',
      stamp: 'ALL-ROUND'
    }
  },

  {
    id: 'coolHeadHotHeart',
    // 【条件②（案⑥-A）】
    // ・セクション1「走りの姿勢」（前3問）が3つとも60以下 ＆ 3つの合計が120以下（左寄り）
    // ・セクション2「練習の仕方」（後3問）が3つとも40以上 ＆ 3つの合計が180以上（右寄り）
    condition: (v) =>
      (v.stance <= 60 && v.route <= 60 && v.mistake <= 60 && (v.stance + v.route + v.mistake) <= 120) &&
      (v.practice >= 40 && v.learning >= 40 && v.recovery >= 40 && (v.practice + v.learning + v.recovery) >= 180),
    ja: {
      catch: '裏では緻密な準備、本番は熱く攻め抜く',
      title: 'クールヘッド・ホットハート走者',
      description: '練習では理屈の整理や先人の研究、事前対策を徹底的に固める頭脳派でありながら、いざタイマーが動けば自己ベストを狙ってアグレッシブに攻め込む二面性の持ち主！冷静な準備が熱い走りを支えています。',
      stamp: '冷静情熱'
    },
    en: {
      catch: 'Methodical preparation behind the scenes, fearless execution on the clock',
      title: 'Cool-Headed, Hot-Hearted Speedrunner',
      description: 'In practice, you methodically study theory, community strats, and backups—yet the moment the timer starts, you attack aggressively for the PB! Your cool preparation fuels your fiery runs.',
      stamp: 'COOL & HOT'
    }
  },

  {
    id: 'streetRunner',
    // 【条件③（案⑥-B）】
    // ・セクション1「走りの姿勢」（前3問）が3つとも40以上 ＆ 3つの合計が180以上（右寄り）
    // ・セクション2「練習の仕方」（後3問）が3つとも60以下 ＆ 3つの合計が120以下（左寄り）
    condition: (v) =>
      (v.stance >= 40 && v.route >= 40 && v.mistake >= 40 && (v.stance + v.route + v.mistake) >= 180) &&
      (v.practice <= 60 && v.learning <= 60 && v.recovery <= 60 && (v.practice + v.learning + v.recovery) <= 120),
    ja: {
      catch: '毎日身体で覚え込み、安定した完走力を発揮する',
      title: 'エンジョイ実戦・ストリート走者',
      description: '難しい座学や事前の詰め込みよりも、毎日実際にコントローラーを握って身体に馴染ませる実戦派！独自の感覚で楽しみながら走り込み、本番ではミスをしても動じず確実に完走まで持っていくタフさがあります。',
      stamp: '実戦主義'
    },
    en: {
      catch: 'Learning by feel every day to deliver rock-solid finishes',
      title: 'Street-Smart Practical Speedrunner',
      description: 'Rather than heavy textbook study, you learn best with a controller in hand every day! Guided by your own feel and enjoyment, you build tough, practical consistency that carries runs to the finish.',
      stamp: 'STREETWISE'
    }
  },

  {
    id: 'berserker',
    // 【条件④】ルートが左(39以下) ＆ ミス時が左(39以下) ＆ 練習が左(39以下) ＆ リカバリーが50以下
    condition: (v) => v.route <= 39 && v.mistake <= 39 && v.practice <= 39 && v.recovery <= 50,
    ja: {
      catch: '理論値と神乱数を追い求める一閃の剣',
      title: 'ロマン追求・バーサーカー走者',
      description: '「ミス上等の攻めルート×即リセット×感覚派」の熱血スプリンター気質！多少の失敗は恐れず、すべてが噛み合った時の爆発的な自己ベスト更新に最大の快感を見出す生粋の記録狙いファイターです。',
      stamp: '超火力'
    },
    en: {
      catch: 'Chasing god RNG and peak theoretical pace',
      title: 'All-Out Berserker Speedrunner',
      description: 'Aggressive strats, fearless resets, and pure instinct! You never shy away from frame-perfect gambles, living for that one legendary run where every trick hits and shatters your PB.',
      stamp: 'MAX PACE'
    }
  },

  {
    id: 'timeAttacker',
    // 【条件⑤】ルートが左(39以下) ＆ ミス時が左(39以下) ＆ 練習が右(61以上)
    condition: (v) => v.route <= 39 && v.mistake <= 39 && v.practice >= 61,
    ja: {
      catch: '精密なセットアップで最速理論値を射抜く',
      title: '精密機械・タイムアタッカー走者',
      description: 'フレーム単位の仕組み理解と攻めルートを高次元で融合させたストイックな記録追求型。妥協のないリセット判断と確かな理論武装で、リーダーボード上位へ鋭く切り込みます。',
      stamp: '最速理論'
    },
    en: {
      catch: 'Sniping world-class times with surgical precision',
      title: 'Precision Time-Attacker Speedrunner',
      description: 'Combining deep frame/mechanics knowledge with aggressive routing and strict reset discipline. You approach speedrunning like a science to carve every possible second off the leaderboard.',
      stamp: 'OPTIMAL'
    }
  },

  {
    id: 'marathonMaster',
    // 【条件⑥】取り組みが右(61以上) ＆ ルートが右(61以上) ＆ ミス時が右(61以上) ＆ リカバリーが右(61以上)
    condition: (v) => v.stance >= 61 && v.route >= 61 && v.mistake >= 61 && v.recovery >= 61,
    ja: {
      catch: '抜群の完走率と再現性を誇る鉄壁の職人',
      title: '一発通し・マラソンマスター走者',
      description: '毎日のコツコツ練習と安定ルート選択、そしてミスしても最後まで走り切るリカバリー力を兼ね備えた鉄人タイプ。大型RTAイベントや並走会でも安心して見ていられる抜群の安定感を誇ります。',
      stamp: '鉄壁完走'
    },
    en: {
      catch: 'Unmatched consistency and marathon-ready recovery',
      title: 'No-Reset Marathon Master Speedrunner',
      description: 'Steady daily practice, rock-solid safe strats, and the resilience to finish every run no matter what happens. You are an absolute powerhouse in live marathons and races.',
      stamp: 'IRONCLAD'
    }
  },

  {
    id: 'clutchImproviser',
    // 【条件⑦】ミス時が右・通し派(76以上) ＆ リカバリーが左・アドリブ派(24以下)
    condition: (v) => v.mistake >= 76 && v.recovery <= 24,
    ja: {
      catch: '想定外のトラブルも神アドリブでねじ伏せる',
      title: '神対応・トラブルシューター走者',
      description: 'たとえミスや想定外の乱数を引いてもリセットせず、その場の判断力と天性のアドリブ対応力で最後まで走り切るライブ感抜群の走者！イベントや一発勝負の本番で数々のドラマを生み出します。',
      stamp: '神アドリブ'
    },
    en: {
      catch: 'Turning unexpected chaos into legendary clutch saves',
      title: 'Clutch Improviser Speedrunner',
      description: 'Even when things go off the rails, you refuse to reset and rely on pure adaptability and quick thinking to save the run on the fly. A crowd-pleasing runner built for live showcases.',
      stamp: 'CLUTCH'
    }
  },

  {
    id: 'ironcladPrepper',
    // 【条件⑧】ルートが左・攻め派(24以下) ＆ リカバリーが右・事前対策派(76以上)
    condition: (v) => v.route <= 24 && v.recovery >= 76,
    ja: {
      catch: 'あらゆる分岐と妥協ルートを網羅した危機管理のプロ',
      title: '用意周到・リスクマネージャー走者',
      description: '本命ルートだけでなく「もしここでミスしたらこう復帰する」という第2・第3のリカバリー手順まで徹底的に準備しておく危機管理の達人。攻めつつも大崩れしない計算高い走りが光ります。',
      stamp: '用意周到'
    },
    en: {
      catch: 'Prepared for every possible branch and backup scenario',
      title: 'Master Tactician & Backup Specialist',
      description: 'Beyond the main route, you practice Plan B and Plan C recovery setups in advance. Even when taking risks, your deep safety net prevents catastrophic time loss.',
      stamp: 'PREPARED'
    }
  },

  {
    id: 'madScientist',
    // 【条件⑨】練習が右・理論派(76以上) ＆ コツが左・独自開拓(24以下)
    condition: (v) => v.practice >= 76 && v.learning <= 24,
    ja: {
      catch: '仕様を解き明かし未知のセットアップを創る',
      title: '開拓者・RTAマッドサイエンティスト',
      description: 'ゲームの仕組み・仕様を深く理解した上で、独自の攻略法や新ルートを自ら開拓することに喜びを感じる研究者タイプ。誰も気づかなかった目印やセットアップを生み出す才能があります。',
      stamp: '開拓博士'
    },
    en: {
      catch: 'Decoding game mechanics to invent brand-new tech',
      title: 'Trailblazing Lab-Monster Speedrunner',
      description: 'A true speedrun scientist who dissects game mechanics and crafts original setups from scratch. You thrive on discovering new visual cues, backups, and route optimizations.',
      stamp: 'PIONEER'
    }
  },

  {
    id: 'genius',
    // 【条件⑩】練習が左・感覚派(39以下) ＆ コツが左・独自開拓(39以下) ＆ リカバリーが左・アドリブ派(39以下)
    condition: (v) => v.practice <= 39 && v.learning <= 39 && v.recovery <= 39,
    ja: {
      catch: '直感とひらめきでコントローラーを操る天才肌',
      title: '直感ドライブ・ジーニアス走者',
      description: 'やりたい時に集中して走り、理屈よりもまず手を動かして独自の感覚でコツを掴んでしまうセンス派。固定観念にとらわれない自由なプレイスタイルで、驚くようなスーパープレイを連発します。',
      stamp: '天賦の才'
    },
    en: {
      catch: 'Mastering tough tricks through pure feel and instinct',
      title: 'Intuition-Driven Prodigy Speedrunner',
      description: 'Running when inspiration strikes and mastering execution by pure feel rather than textbooks. Your unconventional, free-flowing style produces jaw-dropping clutch plays.',
      stamp: 'PRODIGY'
    }
  },

  {
    id: 'strategist',
    // 【条件⑪】練習が右・理論派(61以上) ＆ コツが右・他者から学ぶ(61以上) ＆ リカバリーが50以上
    condition: (v) => v.practice >= 61 && v.learning >= 61 && v.recovery >= 50,
    ja: {
      catch: '先人の知見とデータを結晶化させる頭脳派',
      title: 'スマート解析・ストラテジスト走者',
      description: '他プレイヤーの解説や上位走者の動画を丁寧に研究し、ロジックやリカバリー手順まで理解してから効率よく習得する賢い戦略家タイプ。無駄な遠回りをせず、最短距離で実力を引き上げることができます。',
      stamp: '頭脳派'
    },
    en: {
      catch: 'Crystallizing community knowledge and data into skill',
      title: 'Analytical Strategist Speedrunner',
      description: 'Studying top runners\' VODs, guides, and backup strats thoroughly before executing. You level up with remarkable efficiency by combining community wisdom with logical preparation.',
      stamp: 'STRATEGIST'
    }
  },

  {
    id: 'eventStar',
    // 【条件⑫（案②）】取り組みが左・やりたい時(39以下) ＆ ルートが右・安定派(61以上) ＆ ミス時が右・通し派(61以上)
    condition: (v) => v.stance <= 39 && v.route >= 61 && v.mistake >= 61,
    ja: {
      catch: '一発勝負の舞台で輝くエンタメ＆完走力',
      title: '大会特化・イベントスター走者',
      description: '普段は自分のペースで楽しみつつ、いざ通し始めれば堅実なルート選択と完走力で最後までしっかり走り切る本番に強いタイプ！イベントや並走会に呼ばれると抜群の安心感を発揮します。',
      stamp: '本番強者'
    },
    en: {
      catch: 'Shining on the big stage with rock-solid completion',
      title: 'Showcase & Race Star Speedrunner',
      description: 'While you run at your own relaxed pace day-to-day, once a run starts, your safe routing and no-reset mindset guarantee a strong finish. A natural-born performer for marathons and races!',
      stamp: 'SHOWTIME'
    }
  },

  {
    id: 'sniper',
    // 【条件⑬（案⑤）】取り組みが左・やりたい時(39以下) ＆ ミス時が左・即リセ派(39以下) ＆ リカバリーが右・事前対策派(61以上)
    condition: (v) => v.stance <= 39 && v.mistake <= 39 && v.recovery >= 61,
    ja: {
      catch: '入念な事前準備で自己ベストを短期集中スナイプ',
      title: '一点突破・スナイパー走者',
      description: '闇雲に回数をこなすのではなく、事前の対策や手順確認をしっかり済ませた上で、集中できる時に一気に自己ベストを狙い撃つ効率派スナイパー！少ない試行回数で結果を出す賢さがあります。',
      stamp: '一撃必中'
    },
    en: {
      catch: 'Sniping PBs in short bursts with thorough preparation',
      title: 'Precision PB Sniper Speedrunner',
      description: 'Rather than grinding mindlessly, you prepare your backups and strats in advance, then strike with laser-focused reset sessions when motivation peaks. Maximum results in minimum attempts!',
      stamp: 'SNIPER'
    }
  },

  {
    id: 'seeker',
    // 【条件⑭（案①）】取り組みが右・毎日コツコツ(76以上) ＆ コツが左・独自で探る(24以下)
    condition: (v) => v.stance >= 76 && v.learning <= 24,
    ja: {
      catch: '独自の美学を毎日黙々と研ぎ澄ます',
      title: '孤高の求道者・マイスター走者',
      description: '誰かのテンプレートをなぞるのではなく、日々の地道な反復の中で自分だけの感覚やセットアップを磨き上げる孤高の職人タイプ。積み重ねた独自のノウハウは誰にも真似できない武器になります。',
      stamp: '求道者'
    },
    en: {
      catch: 'Quietly honing a unique craft every single day',
      title: 'Solitary Artisan & Seeker Speedrunner',
      description: 'Instead of following standard templates, you refine your own custom setups and feel through dedicated daily practice. Your self-forged mastery is a weapon no one else can replicate.',
      stamp: 'SEEKER'
    }
  },

  {
    id: 'challenger',
    // 【条件⑮】上記に当てはまらず、6項目の平均値が左寄り（44未満）のとき
    condition: (v, stats) => stats.avg < 44,
    ja: {
      catch: '熱量と勝負強さで自己ベストを塗り替える',
      title: 'アグレッシブ・チャレンジャー走者',
      description: '自分の感性やリズムを何より大切にし、ここぞという場面での集中力と爆発力で勝負するチャレンジャータイプ！型にはまらない主体的なプレイスタイルが持ち味で、流れを掴んだ時に一気に自己ベストを塗り替える突破力を持っています。',
      stamp: '攻めの鬼'
    },
    en: {
      catch: 'Crushing PBs with passion and fearless execution',
      title: 'Aggressive Challenger Speedrunner',
      description: 'An energetic challenger who values personal rhythm and explosive focus! Rather than being bound by rigid templates, you rely on your own momentum and initiative to break through walls and shatter PBs.',
      stamp: 'ATTACKER'
    }
  },

  {
    id: 'craftsman',
    // 【条件⑯】上記に当てはまらず、6項目の平均値が右寄り（56超）のとき
    condition: (v, stats) => stats.avg > 56,
    ja: {
      catch: '確かな積み重ねと堅実な走りで記録を伸ばす',
      title: 'ステディ・クラフトマン走者',
      description: '地道な積み重ねと再現性の高さをベースに、着実に走りの精度を磨き上げるクラフトマンタイプ！感覚や運だけに頼らず、自分の中で納得できる形をひとつずつ固めていくため、本番でも大崩れしない高い実力を発揮します。',
      stamp: '堅実職人'
    },
    en: {
      catch: 'Building rock-solid PBs through steady dedication',
      title: 'Steady Craftsman Speedrunner',
      description: 'A dependable craftsman who hones execution through steady dedication and high reproducibility! Instead of relying on luck alone, you solidify your fundamentals step by step to deliver remarkably consistent runs.',
      stamp: 'CRAFTSMAN'
    }
  },

  {
    id: 'technical',
    // 【条件⑰】上記すべてに当てはまらない場合（左右に振っている項目が混在するメリハリ型）
    condition: () => true,
    ja: {
      catch: '攻守と理論・感覚を独自の黄金比でブレンド',
      title: 'カスタムチューン・テクニカル走者',
      description: '6つの項目ごとに「ここは攻める」「ここは事前に固める」といった独自のこだわりとメリハリを持っている実戦派走者です。自分の得意・不得意をよく理解した合理的なスタイルが確立されています。',
      stamp: '黄金比率'
    },
    en: {
      catch: 'Blending risk, safety, feel, and theory in a golden ratio',
      title: 'Custom-Tuned Technical Speedrunner',
      description: 'You know exactly where to push aggressive strats and where to rely on safe consistency or practiced backups. A pragmatic speedrunner with a finely tuned personal formula.',
      stamp: 'CUSTOM'
    }
  }
];

// ----------------------------------------------------------------------------
// 2. カテゴリー見出し設定（前半3問：SECTION 01 / 後半3問：SECTION 02）
// ----------------------------------------------------------------------------
const CHECKUP_CATEGORIES = [
  {
    id: 'posture',
    badge: 'SECTION 01',
    ja: '走りの姿勢',
    en: 'Running Stance'
  },
  {
    id: 'practice',
    badge: 'SECTION 02',
    ja: '練習の仕方',
    en: 'Practice Style'
  }
];

// ----------------------------------------------------------------------------
// 3. 6つの検査項目（スライダーのラベル設定）
// ----------------------------------------------------------------------------
const CHECKUP_ITEMS = [
  {
    id: 'stance',
    category: 'posture',
    code: 'ITEM 01',
    ja: {
      title: 'RTAの取り組み方',
      leftLabel: 'やりたいときにやる',
      leftSub: 'モチベ・ひらめき重視',
      leftShort: '自由奔放型',
      rightLabel: '毎日コツコツやる',
      rightSub: '習慣化・継続ルーティン重視',
      rightShort: '継続ルーティン型',
      axisLabel: '継続性'
    },
    en: {
      title: 'Speedrun Approach',
      leftLabel: 'Run whenever I feel like it',
      leftSub: 'Motivation & inspiration driven',
      leftShort: 'Free-Spirited',
      rightLabel: 'Grind steadily every day',
      rightSub: 'Habit & daily routine driven',
      rightShort: 'Daily Grinder',
      axisLabel: 'Consistency'
    }
  },
  {
    id: 'route',
    category: 'posture',
    code: 'ITEM 02',
    ja: {
      title: 'ルートや技の選択',
      leftLabel: 'ミス上等の攻めルート',
      leftSub: '理論値・ロマン技・上振れ狙い',
      leftShort: '攻めルート派',
      rightLabel: 'ミス回避の安定ルート',
      rightSub: '期待値・再現性・完走率重視',
      rightShort: '安定ルート派',
      axisLabel: '安全性'
    },
    en: {
      title: 'Route & Trick Choice',
      leftLabel: 'Risky / aggressive strats',
      leftSub: 'High-risk high-reward & peak pace',
      leftShort: 'Risky Strats',
      rightLabel: 'Safe / consistent strats',
      rightSub: 'High consistency & marathon safe',
      rightShort: 'Safe Strats',
      axisLabel: 'Safety'
    }
  },
  {
    id: 'mistake',
    category: 'posture',
    code: 'ITEM 03',
    ja: {
      title: 'ミスした時',
      leftLabel: '即やり直すリセゲー派',
      leftSub: '自己ベペース以外は即リセット',
      leftShort: '即リセゲー派',
      rightLabel: '自己ベが無くなっても走り切る通し派',
      rightSub: '後半区間練習・リカバリー重視',
      rightShort: '完走通し派',
      axisLabel: '完走率'
    },
    en: {
      title: 'When Making a Mistake',
      leftLabel: 'Reset immediately (Reset-heavy)',
      leftSub: 'Instant reset if off PB pace',
      leftShort: 'Quick Resetter',
      rightLabel: 'Finish the run anyway (No-reset)',
      rightSub: 'Full-run practice & backup strats',
      rightShort: 'Full-Run Finisher',
      axisLabel: 'Completion'
    }
  },
  {
    id: 'practice',
    category: 'practice',
    code: 'ITEM 04',
    ja: {
      title: '難しい技の練習',
      leftLabel: 'とにかくやってみようの感覚派',
      leftSub: '反復試行・手馴染みで体得',
      leftShort: 'フィジカル感覚派',
      rightLabel: '仕組みを理解してからやる理論派',
      rightSub: 'フレーム・乱数・仕様解析から',
      rightShort: 'ロジック理論派',
      axisLabel: '理論思考'
    },
    en: {
      title: 'Practicing Hard Tricks',
      leftLabel: 'Learn by feel & trial-and-error',
      leftSub: 'Muscle memory & hands-on reps',
      leftShort: 'Intuition Player',
      rightLabel: 'Understand the mechanics first',
      rightSub: 'Frame data, RNG & game logic',
      rightShort: 'Theory Crafter',
      axisLabel: 'Theory'
    }
  },
  {
    id: 'learning',
    category: 'practice',
    code: 'ITEM 05',
    ja: {
      title: 'コツの掴み方',
      leftLabel: '独自で探る',
      leftSub: '自己流の目印・セットアップ開拓',
      leftShort: '独自開拓タイプ',
      rightLabel: '他プレイヤーから学ぶ',
      rightSub: '先駆者の動画・解説・知見を吸収',
      rightShort: '知見吸収タイプ',
      axisLabel: '知見吸収'
    },
    en: {
      title: 'How to Master Strats',
      leftLabel: 'Figure it out on my own',
      leftSub: 'Find custom visual cues & setups',
      leftShort: 'Self-Explorer',
      rightLabel: 'Learn from other speedrunners',
      rightSub: 'Study guides, VODs & community tech',
      rightShort: 'Community Learner',
      axisLabel: 'Absorption'
    }
  },
  {
    id: 'recovery',
    category: 'practice',
    code: 'ITEM 06',
    ja: {
      title: 'リカバリーの備え',
      leftLabel: '本番のアドリブ対応に任せる',
      leftSub: 'その場の判断力・咄嗟の対応重視',
      leftShort: 'アドリブ対応派',
      rightLabel: 'リカバリー手順まで事前に練習する',
      rightSub: '妥協ルート・復帰手順の事前準備',
      rightShort: '事前対策バッチリ派',
      axisLabel: '事前対策'
    },
    en: {
      title: 'Backup & Recovery Prep',
      leftLabel: 'Improvise on the fly in runs',
      leftSub: 'Rely on quick adaptation & clutch',
      leftShort: 'Improviser',
      rightLabel: 'Practice backup strats in advance',
      rightSub: 'Prepare safety nets & recovery routes',
      rightShort: 'Backup Prepared',
      axisLabel: 'Preparation'
    }
  }
];
