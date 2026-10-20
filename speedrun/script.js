/**
 * RTA走者タイプ診断 / Speedrunner Type Checkup
 * メインスクリプト (UI制御・チャート描画・画像保存)
 * ※ 診断結果の文章・名前・出現条件・質問項目を編集したい場合は config.js を開いてください。
 */

const THEMES = {
  standard: {
    ja: 'スタンダード',
    en: 'Standard',
    cardBg: '#ffffff',
    gridLine: '#e2e8f0',
    axisLine: '#cbd5e1',
    midLine: '#94a3b8',
    labelColor: '#475569',
    polyFill: 'rgba(79, 70, 229, 0.18)',
    polyStroke: '#4f46e5'
  },
  mint: {
    ja: '健診ミント',
    en: 'Checkup Mint',
    cardBg: '#ffffff',
    gridLine: '#d1fae5',
    axisLine: '#a7f3d0',
    midLine: '#6ee7b7',
    labelColor: '#065f46',
    polyFill: 'rgba(13, 148, 136, 0.18)',
    polyStroke: '#0d9488'
  },
  sakura: {
    ja: 'パステル桜',
    en: 'Pastel Rose',
    cardBg: '#ffffff',
    gridLine: '#ffe4e6',
    axisLine: '#fecdd3',
    midLine: '#fda4af',
    labelColor: '#881337',
    polyFill: 'rgba(219, 39, 119, 0.16)',
    polyStroke: '#db2777'
  },
  sage: {
    ja: 'くすみセージ',
    en: 'Muted Sage',
    cardBg: '#ffffff',
    gridLine: '#cbd5c8',
    axisLine: '#b0bfac',
    midLine: '#52796f',
    labelColor: '#475b36',
    polyFill: 'rgba(82, 121, 111, 0.22)',
    polyStroke: '#52796f'
  },
  ocean: {
    ja: 'オーシャンブルー',
    en: 'Ocean Blue',
    cardBg: '#ffffff',
    gridLine: '#e0f2fe',
    axisLine: '#bae6fd',
    midLine: '#7dd3fc',
    labelColor: '#0c4a6e',
    polyFill: 'rgba(2, 132, 199, 0.18)',
    polyStroke: '#0284c7'
  },
  amber: {
    ja: 'レトロカルテ',
    en: 'Warm Paper',
    cardBg: '#fffdf9',
    gridLine: '#e6ccb2',
    axisLine: '#d4a373',
    midLine: '#a8a29e',
    labelColor: '#57534e',
    polyFill: 'rgba(180, 83, 9, 0.18)',
    polyStroke: '#b45309'
  },
  dark: {
    ja: 'ゲーミングダーク',
    en: 'Cyber Dark',
    cardBg: '#111827',
    gridLine: '#334155',
    axisLine: '#475569',
    midLine: '#64748b',
    labelColor: '#cbd5e1',
    polyFill: 'rgba(129, 140, 248, 0.25)',
    polyStroke: '#818cf8'
  },
  midnight: {
    ja: 'ミッドナイトネオン',
    en: 'Midnight Neon',
    cardBg: '#1a102a',
    gridLine: '#442868',
    axisLine: '#613991',
    midLine: '#9333ea',
    labelColor: '#e9d5ff',
    polyFill: 'rgba(232, 121, 249, 0.25)',
    polyStroke: '#e879f9'
  },
  stealth: {
    ja: 'ステルスOLED',
    en: 'Stealth OLED',
    cardBg: '#0a0a0a',
    gridLine: '#262626',
    axisLine: '#404040',
    midLine: '#737373',
    labelColor: '#e5e5e5',
    polyFill: 'rgba(255, 255, 255, 0.22)',
    polyStroke: '#ffffff'
  }
};

const UI_TEXT = {
  ja: {
    brandBadge: 'RTA CHECKUP',
    brandSub: '走者タイプ診断シートメーカー',
    themeLabel: 'テーマ',
    btnRandom: 'サンプル入力',
    btnRandomTitle: 'ランダムに入力して試す',
    btnReset: 'リセット',
    btnResetTitle: 'すべて中央(50%)に戻す',
    sheetTitle: 'RTA走者タイプ診断',
    sheetSubtitle: '各検査項目のスライダーを動かして、あなたのRTAプレイスタイル傾向を測定します',
    dateLabel: '測定日',
    labelRunnerName: '走者名',
    placeholderRunnerName: '名無しのRTA走者',
    labelMainGame: '主なRTAタイトル・カテゴリ',
    placeholderMainGame: '例: スーパーマリオ64 16枚 / Any%',
    sectionCaption: 'プレイスタイル 6項目精密検査（左右の当てはまる位置へスライド）',
    resultBadge: '総合所見・走者タイプ判定',
    summaryExpand: '判定結果を表示',
    summaryCollapse: '折りたたむ',
    chartTitle: '堅実度チャート（小：爆発力型 ／ 大：安定型）',
    stampTop: 'RTA健診',
    stampBottom: '認定済',
    footerHashtag: '#RTA走者タイプ診断',
    btnDownload: '診断シートを画像保存 (PNG)',
    btnDownloading: '画像を作成中...',
    btnShareX: '結果をXでポスト',
    sharePcHint: '※クリップボードに画像がコピーされます（投稿時にCtrl+V）',
    btnCopyUrl: '診断URLをコピー',
    poleLeftTitle: 'クリックで10%左へ移動',
    poleRightTitle: 'クリックで10%右へ移動',
    hybridLabel: 'バランス派・ハイブリッド',
    prefixSlightly: 'やや',
    prefixUltra: '超・',
    defaultTags: ['#全項目バランス型', '#柔軟スイッチヒッター'],
    toastReset: 'すべての項目を中央 (50:50) にリセットしました',
    toastRandom: 'ランダムな走者サンプルデータを入力しました',
    toastSaved: '診断シートのPNG画像を保存しました！',
    toastSaveErr: '画像の保存に失敗しました。スクリーンショットをご利用ください。',
    toastCopied: '現在の診断結果URLをクリップボードにコピーしました！',
    toastShareClipboard: '📋 シート画像をコピーしました！これから開くXの画面で「貼り付け (Ctrl+V)」してください',
    toastLang: '表示言語を「日本語」に切り替えました',
    toastTheme: (name) => `デザインテーマを「${name}」に変更しました`,
    sharePreparing: 'ポスト画像を準備中...',
    shareOpeningX: '📋 コピー完了！Xを開いています...',
    shareHeaderWithName: (name) => `${name}さんのRTA走者タイプ診断結果`,
    shareHeaderAnon: '私のRTA走者タイプ診断結果',
    shareGame: (game) => `（主なRTA: ${game}）`,
    shareTypeBody: (title, code, catchCopy) => `診断タイプ：【${title}】\n〜${catchCopy}〜`,
    filePrefix: 'RTA走者タイプ診断'
  },
  en: {
    brandBadge: 'SPEEDRUN CHECKUP',
    brandSub: 'Speedrunner Style Checkup Maker',
    themeLabel: 'Theme',
    btnRandom: 'Random Sample',
    btnRandomTitle: 'Fill sliders with random values',
    btnReset: 'Reset',
    btnResetTitle: 'Reset all sliders to center (50%)',
    sheetTitle: 'Speedrunner Type Checkup',
    sheetSubtitle: 'Adjust the sliders for each checkup item to measure your speedrunning style & tendencies',
    dateLabel: 'DATE',
    labelRunnerName: 'Speedrunner Name',
    placeholderRunnerName: 'Anonymous Speedrunner',
    labelMainGame: 'Main Speedrun Game / Category',
    placeholderMainGame: 'e.g., Super Mario 64 16 Star / Any%',
    sectionCaption: '6-Axis Speedrun Style Checkup (Slide or click left/right poles)',
    resultBadge: 'Overall Speedrunner Type Diagnosis',
    summaryExpand: 'Show Diagnosis Result',
    summaryCollapse: 'Collapse',
    chartTitle: 'Steadiness Chart (Small: Explosive / Large: Consistent)',
    stampTop: 'SPEEDRUN',
    stampBottom: 'CERTIFIED',
    footerHashtag: '#RTA走者タイプ診断 #SpeedrunnerStyleCheckup',
    btnDownload: 'Save Checkup Image (PNG)',
    btnDownloading: 'Generating PNG...',
    btnShareX: 'Post Result on X',
    sharePcHint: '* Checkup image will be copied to clipboard (Ctrl+V to paste)',
    btnCopyUrl: 'Copy Share URL',
    poleLeftTitle: 'Click to move 10% left',
    poleRightTitle: 'Click to move 10% right',
    hybridLabel: 'Balanced / Hybrid',
    prefixSlightly: 'Slightly ',
    prefixUltra: 'Ultra ',
    defaultTags: ['#AllRounder', '#FlexibleSwitchHitter'],
    toastReset: 'Reset all items to center (50:50)',
    toastRandom: 'Applied random speedrunner sample data',
    toastSaved: 'Saved checkup sheet as PNG image!',
    toastSaveErr: 'Failed to export image. Please take a screenshot instead.',
    toastCopied: 'Copied diagnosis URL to clipboard!',
    toastShareClipboard: '📋 Copied sheet image! Press Ctrl+V (Paste) in the X window that opens next',
    toastLang: 'Switched language to English',
    toastTheme: (name) => `Switched theme to "${name}"`,
    sharePreparing: 'Preparing image...',
    shareOpeningX: '📋 Copied! Opening X...',
    shareHeaderWithName: (name) => `${name}'s Speedrunner Style Checkup`,
    shareHeaderAnon: 'My Speedrunner Style Checkup Result',
    shareGame: (game) => ` (Main Speedrun: ${game})`,
    shareTypeBody: (title, code, catchCopy) => `Type: [${title}]\n"${catchCopy}"`,
    filePrefix: 'Speedrunner_Checkup'
  }
};

// State
const state = {
  lang: 'ja', // 'ja' or 'en'
  theme: 'standard', // 'standard' | 'mint' | 'sakura' | 'amber' | 'dark'
  values: {
    stance: 50,
    route: 50,
    mistake: 50,
    practice: 50,
    learning: 50,
    recovery: 50
  }
};

const STEP_SNAP_VALUES = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

// DOM Elements
const slidersContainer = document.getElementById('slidersContainer');
const runnerNameInput = document.getElementById('runnerName');
const mainGameInput = document.getElementById('mainGame');
const currentDateDisplay = document.getElementById('currentDateDisplay');

const diagnosisAccordion = document.getElementById('diagnosisAccordion');
const summaryHintText = document.getElementById('summaryHintText');
const typeCodePill = document.getElementById('typeCodePill');
const typeCatch = document.getElementById('typeCatch');
const typeTitle = document.getElementById('typeTitle');
const typeDescription = document.getElementById('typeDescription');
const typeTags = document.getElementById('typeTags');
const stampTopText = document.getElementById('stampTopText');
const stampMainText = document.getElementById('stampMainText');
const stampBottomText = document.getElementById('stampBottomText');
const balanceCanvas = document.getElementById('balanceCanvas');

// Initialize Date
function initHeaderMeta() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  currentDateDisplay.textContent = `${yyyy}.${mm}.${dd}`;
}

function clampValue(val) {
  return Math.round(Math.max(0, Math.min(100, Number(val))));
}

// Get next 11-stage (10% increment) step value when clicking left (-1) or right (+1) pole button
function getNextStepValue(currentVal, direction) {
  const num = clampValue(currentVal);
  if (direction < 0) {
    for (let i = STEP_SNAP_VALUES.length - 1; i >= 0; i--) {
      if (STEP_SNAP_VALUES[i] < num) {
        return STEP_SNAP_VALUES[i];
      }
    }
    return STEP_SNAP_VALUES[0];
  } else {
    for (let i = 0; i < STEP_SNAP_VALUES.length; i++) {
      if (STEP_SNAP_VALUES[i] > num) {
        return STEP_SNAP_VALUES[i];
      }
    }
    return STEP_SNAP_VALUES[STEP_SNAP_VALUES.length - 1];
  }
}

// Apply Theme
function applyTheme(themeKey, showNotification = false) {
  if (!THEMES[themeKey]) return;
  state.theme = themeKey;
  if (themeKey === 'standard') {
    document.body.removeAttribute('data-theme');
  } else {
    document.body.setAttribute('data-theme', themeKey);
  }

  document.querySelectorAll('.theme-swatch').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.theme === themeKey);
  });

  drawBalanceChart(state.values);
  syncUrlState();

  if (showNotification) {
    const themeName = THEMES[themeKey][state.lang];
    showToast(UI_TEXT[state.lang].toastTheme(themeName));
  }
}

// Apply static UI strings for current language
function applyLanguageTexts() {
  const t = UI_TEXT[state.lang];
  document.documentElement.lang = state.lang;

  document.getElementById('btnLangJa').classList.toggle('active', state.lang === 'ja');
  document.getElementById('btnLangEn').classList.toggle('active', state.lang === 'en');

  document.getElementById('uiThemeLabel').textContent = t.themeLabel;
  document.getElementById('uiBtnRandomText').textContent = t.btnRandom;
  document.getElementById('btnRandom').title = t.btnRandomTitle;
  document.getElementById('uiBtnResetText').textContent = t.btnReset;
  document.getElementById('btnReset').title = t.btnResetTitle;

  document.getElementById('uiSheetTitle').textContent = t.sheetTitle;
  document.getElementById('uiSheetSubtitle').textContent = t.sheetSubtitle;
  document.getElementById('uiDateLabel').textContent = t.dateLabel;

  document.getElementById('uiLabelRunnerName').textContent = t.labelRunnerName;
  runnerNameInput.placeholder = t.placeholderRunnerName;
  document.getElementById('uiLabelMainGame').textContent = t.labelMainGame;
  mainGameInput.placeholder = t.placeholderMainGame;

  document.getElementById('uiResultBadge').textContent = t.resultBadge;
  document.getElementById('uiChartTitle').textContent = t.chartTitle;
  stampTopText.textContent = t.stampTop;
  stampBottomText.textContent = t.stampBottom;
  document.getElementById('uiFooterHashtag').textContent = t.footerHashtag;

  document.getElementById('uiBtnDownloadText').textContent = t.btnDownload;
  document.getElementById('uiBtnShareXText').textContent = t.btnShareX;
  const pcHintEl = document.getElementById('uiSharePcHint');
  if (pcHintEl && t.sharePcHint) {
    pcHintEl.textContent = t.sharePcHint;
  }
  document.getElementById('copyUrlText').textContent = t.btnCopyUrl;
}

// Render the Checkup Sliders with Pattern A Category Section Headers
function renderSliders() {
  slidersContainer.innerHTML = '';
  const t = UI_TEXT[state.lang];
  let currentCategoryId = null;

  CHECKUP_ITEMS.forEach((item) => {
    // Insert Pattern A Section Header whenever category changes
    if (item.category && item.category !== currentCategoryId) {
      currentCategoryId = item.category;
      const catObj = (typeof CHECKUP_CATEGORIES !== 'undefined')
        ? CHECKUP_CATEGORIES.find((c) => c.id === currentCategoryId)
        : null;
      if (catObj) {
        const headerEl = document.createElement('div');
        headerEl.className = 'category-header';
        headerEl.innerHTML = `
          <span class="category-badge">${catObj.badge}</span>
          <h2 class="category-title">${catObj[state.lang]}</h2>
        `;
        slidersContainer.appendChild(headerEl);
      }
    }

    const val = state.values[item.id];
    const loc = item[state.lang];
    const row = document.createElement('div');
    row.className = 'checkup-row';
    row.id = `row-${item.id}`;

    row.innerHTML = `
      <div class="row-header">
        <div class="item-title-group">
          <span class="item-code">${item.code}</span>
          <h3 class="item-name">${loc.title}</h3>
        </div>
        <span class="item-status-pill" id="status-${item.id}"></span>
      </div>

      <div class="poles-grid">
        <div class="pole-box pole-left" id="left-pole-${item.id}" data-item="${item.id}" data-side="left" title="${t.poleLeftTitle}">
          <span class="pole-sub">${loc.leftSub}</span>
          <span>◀ ${loc.leftLabel}</span>
        </div>

        <div class="seekbar-wrapper">
          <div class="track-visual">
            <div class="track-fill" id="fill-${item.id}"></div>
            <div class="track-center-mark"></div>
            <div class="track-ticks">
              <span class="tick-dot"></span>
              <span class="tick-dot"></span>
              <span class="tick-dot"></span>
              <span class="tick-dot"></span>
              <span class="tick-dot"></span>
              <span class="tick-dot tick-center"></span>
              <span class="tick-dot"></span>
              <span class="tick-dot"></span>
              <span class="tick-dot"></span>
              <span class="tick-dot"></span>
              <span class="tick-dot"></span>
            </div>
          </div>
          <input
            type="range"
            class="range-input"
            id="input-${item.id}"
            min="0"
            max="100"
            step="1"
            value="${val}"
            aria-label="${loc.title}"
          >
        </div>

        <div class="pole-box pole-right" id="right-pole-${item.id}" data-item="${item.id}" data-side="right" title="${t.poleRightTitle}">
          <span class="pole-sub">${loc.rightSub}</span>
          <span>${loc.rightLabel} ▶</span>
        </div>
      </div>
    `;

    slidersContainer.appendChild(row);

    const inputEl = row.querySelector(`#input-${item.id}`);
    inputEl.addEventListener('input', (e) => {
      state.values[item.id] = clampValue(e.target.value);
      updateSingleRowUI(item.id);
      updateDiagnosis();
    });

    const leftPoleEl = row.querySelector(`#left-pole-${item.id}`);
    const rightPoleEl = row.querySelector(`#right-pole-${item.id}`);

    leftPoleEl.addEventListener('click', () => {
      const nextVal = getNextStepValue(state.values[item.id], -1);
      state.values[item.id] = nextVal;
      inputEl.value = nextVal;
      updateSingleRowUI(item.id);
      updateDiagnosis();
    });

    rightPoleEl.addEventListener('click', () => {
      const nextVal = getNextStepValue(state.values[item.id], 1);
      state.values[item.id] = nextVal;
      inputEl.value = nextVal;
      updateSingleRowUI(item.id);
      updateDiagnosis();
    });

    updateSingleRowUI(item.id);
  });
}

// Update visual state of a single slider row
function updateSingleRowUI(itemId) {
  const item = CHECKUP_ITEMS.find((i) => i.id === itemId);
  const loc = item[state.lang];
  const t = UI_TEXT[state.lang];
  const val = state.values[itemId];
  const fillEl = document.getElementById(`fill-${itemId}`);
  const statusEl = document.getElementById(`status-${itemId}`);
  const leftPoleEl = document.getElementById(`left-pole-${itemId}`);
  const rightPoleEl = document.getElementById(`right-pole-${itemId}`);
  const inputEl = document.getElementById(`input-${itemId}`);

  const leftPct = 100 - val;
  const rightPct = val;

  leftPoleEl.classList.remove('active-pole');
  rightPoleEl.classList.remove('active-pole');
  statusEl.className = 'item-status-pill';

  if (val < 40) {
    const widthPct = 50 - val;
    fillEl.style.left = `${val}%`;
    fillEl.style.width = `${widthPct}%`;
    fillEl.style.background = 'linear-gradient(90deg, #f97316, #fb923c)';
    inputEl.style.setProperty('--thumb-color', '#f97316');
    leftPoleEl.classList.add('active-pole');
    statusEl.classList.add('status-left');

    const intensity = val <= 10 ? t.prefixUltra : val >= 25 ? t.prefixSlightly : '';
    statusEl.textContent = `${intensity}${loc.leftShort} (${leftPct}:${rightPct})`;
  } else if (val > 60) {
    const widthPct = val - 50;
    fillEl.style.left = '50%';
    fillEl.style.width = `${widthPct}%`;
    fillEl.style.background = 'linear-gradient(90deg, #38bdf8, #0284c7)';
    inputEl.style.setProperty('--thumb-color', '#0284c7');
    rightPoleEl.classList.add('active-pole');
    statusEl.classList.add('status-right');

    const intensity = val >= 90 ? t.prefixUltra : val <= 75 ? t.prefixSlightly : '';
    statusEl.textContent = `${intensity}${loc.rightShort} (${leftPct}:${rightPct})`;
  } else {
    if (val < 50) {
      fillEl.style.left = `${val}%`;
      fillEl.style.width = `${50 - val}%`;
    } else if (val > 50) {
      fillEl.style.left = '50%';
      fillEl.style.width = `${val - 50}%`;
    } else {
      fillEl.style.left = '48%';
      fillEl.style.width = '4%';
    }
    fillEl.style.background = '#6366f1';
    inputEl.style.setProperty('--thumb-color', '#4f46e5');
    statusEl.classList.add('status-center');
    statusEl.textContent = `${t.hybridLabel} (${leftPct}:${rightPct})`;
  }
}

// Comprehensive Diagnosis Evaluation using DIAGNOSIS_RULES from config.js
function evaluateRunnerType(v) {
  const vals = Object.values(v);
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
  const maxDeviation = Math.max(...vals.map((n) => Math.abs(n - 50)));
  const postureSum = v.stance + v.route + v.mistake;
  const practiceSum = v.practice + v.learning + v.recovery;
  const postureAvg = postureSum / 3;
  const practiceAvg = practiceSum / 3;
  const stats = { avg, maxDeviation, postureSum, practiceSum, postureAvg, practiceAvg };

  // Generate dynamic 6-letter code:
  const c1 = v.stance < 40 ? 'F' : v.stance > 60 ? 'D' : 'B';
  const c2 = v.route < 40 ? 'A' : v.route > 60 ? 'S' : 'B';
  const c3 = v.mistake < 40 ? 'R' : v.mistake > 60 ? 'M' : 'B';
  const c4 = v.practice < 40 ? 'I' : v.practice > 60 ? 'L' : 'B';
  const c5 = v.learning < 40 ? 'O' : v.learning > 60 ? 'C' : 'B';
  const c6 = v.recovery < 40 ? 'W' : v.recovery > 60 ? 'P' : 'B';
  const code = `${c1}${c2}${c3}-${c4}${c5}${c6}`;

  // Find first matching rule from DIAGNOSIS_RULES defined in config.js
  const matchedRule = DIAGNOSIS_RULES.find((rule) => rule.condition(v, stats))
    || DIAGNOSIS_RULES[DIAGNOSIS_RULES.length - 1];

  const arch = matchedRule[state.lang];
  return {
    code,
    catch: arch.catch,
    title: arch.title,
    description: arch.description,
    stamp: arch.stamp
  };
}

// Build trait tags from the slider positions
function buildTraitTags(v) {
  const tags = [];
  CHECKUP_ITEMS.forEach((item) => {
    const val = v[item.id];
    const loc = item[state.lang];
    const cleanLeft = loc.leftShort.replace(/\s+/g, '');
    const cleanRight = loc.rightShort.replace(/\s+/g, '');
    if (val < 40) {
      tags.push(`#${cleanLeft}`);
    } else if (val > 60) {
      tags.push(`#${cleanRight}`);
    }
  });
  if (tags.length === 0) {
    return UI_TEXT[state.lang].defaultTags;
  }
  return tags;
}

// Draw the 6-Axis Radar Chart on Canvas (Theme-aware)
function drawBalanceChart(v) {
  if (!balanceCanvas) return;
  const ctx = balanceCanvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const cssW = 304;
  const cssH = 246;

  if (balanceCanvas.width !== cssW * dpr || balanceCanvas.height !== cssH * dpr) {
    balanceCanvas.width = cssW * dpr;
    balanceCanvas.height = cssH * dpr;
    balanceCanvas.style.width = `${cssW}px`;
    balanceCanvas.style.height = `${cssH}px`;
  }

  const palette = THEMES[state.theme] || THEMES.standard;

  ctx.save();
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, cssW, cssH);

  const cx = 138;
  const cy = 118;
  const maxR = 78;
  const count = CHECKUP_ITEMS.length;

  // Background concentric polygons
  ctx.strokeStyle = palette.gridLine;
  ctx.lineWidth = 1;
  [0.33, 0.66, 1].forEach((level) => {
    ctx.beginPath();
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
      const r = maxR * level;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  });

  // 50% Midline polygon (dashed)
  ctx.save();
  ctx.strokeStyle = palette.midLine;
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
    const r = maxR * 0.5;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore();

  // Axes & Labels
  ctx.font = '700 11px "Noto Sans JP", "Inter", sans-serif';
  ctx.fillStyle = palette.labelColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
    const x = cx + Math.cos(angle) * maxR;
    const y = cy + Math.sin(angle) * maxR;

    ctx.strokeStyle = palette.axisLine;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.stroke();

    const lx = cx + Math.cos(angle) * (maxR + 25);
    const ly = cy + Math.sin(angle) * (maxR + 15);
    ctx.fillText(CHECKUP_ITEMS[i][state.lang].axisLabel, lx, ly);
  }

  // Data Polygon
  ctx.beginPath();
  const points = [];
  for (let i = 0; i < count; i++) {
    const item = CHECKUP_ITEMS[i];
    const val = v[item.id];
    const norm = 0.15 + (val / 100) * 0.85;
    const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
    const x = cx + Math.cos(angle) * (maxR * norm);
    const y = cy + Math.sin(angle) * (maxR * norm);
    points.push({ x, y, val });
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = palette.polyFill;
  ctx.fill();
  ctx.strokeStyle = palette.polyStroke;
  ctx.lineWidth = 2.2;
  ctx.stroke();

  // Vertex Dots
  points.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = p.val < 40 ? '#f97316' : p.val > 60 ? '#0284c7' : palette.polyStroke;
    ctx.fill();
    ctx.strokeStyle = palette.cardBg;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  ctx.restore();
}

function updateSummaryHint() {
  if (!diagnosisAccordion || !summaryHintText) return;
  const t = UI_TEXT[state.lang];
  summaryHintText.textContent = t.summaryExpand;
}

// Auto-adjust stamp main text font-size so it always fits on 1 line inside the circular stamp
const stampMeasureCanvas = document.createElement('canvas');
const stampMeasureCtx = stampMeasureCanvas.getContext('2d');

function fitStampText(text) {
  if (!stampMainText) return;
  stampMainText.textContent = text;

  const maxSafeWidth = 80; // Safe inner chord width (px) inside the 102px circular stamp
  let fontSize = 20;
  const minFontSize = 9;

  if (stampMeasureCtx) {
    while (fontSize > minFontSize) {
      stampMeasureCtx.font = `900 ${fontSize}px "Noto Sans JP", sans-serif`;
      const measuredWidth = stampMeasureCtx.measureText(text).width;
      if (measuredWidth <= maxSafeWidth) {
        break;
      }
      fontSize -= 0.5;
    }
  }

  stampMainText.style.fontSize = `${fontSize}px`;
}

// Update overall diagnosis panel and URL hash/params
function updateDiagnosis() {
  const diag = evaluateRunnerType(state.values);

  typeCodePill.textContent = `TYPE: ${diag.code}`;
  typeCatch.textContent = diag.catch;
  typeTitle.textContent = diag.title;
  typeDescription.textContent = diag.description;
  fitStampText(diag.stamp);

  // Trait tags
  const tags = buildTraitTags(state.values);
  typeTags.innerHTML = tags.map((t) => `<span class="trait-tag">${t}</span>`).join('');

  // Draw chart
  drawBalanceChart(state.values);

  // Update accordion summary hint text
  updateSummaryHint();

  // Sync URL query silently
  syncUrlState();
}

// Switch Language ('ja' | 'en')
function setLanguage(lang, showNotification = true) {
  if (lang !== 'ja' && lang !== 'en') return;
  state.lang = lang;
  applyLanguageTexts();
  renderSliders();
  updateDiagnosis();
  if (showNotification) {
    showToast(UI_TEXT[lang].toastLang);
  }
}

// URL Parameter Serialization
function syncUrlState() {
  const params = new URLSearchParams();
  const vArr = CHECKUP_ITEMS.map((item) => state.values[item.id]);
  params.set('v', vArr.join(','));
  if (state.lang === 'en') {
    params.set('lang', 'en');
  }
  if (state.theme !== 'standard') {
    params.set('t', state.theme);
  }

  const name = runnerNameInput.value.trim();
  const game = mainGameInput.value.trim();
  if (name) params.set('n', name);
  if (game) params.set('g', game);

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, '', newUrl);
}

function loadUrlState() {
  const params = new URLSearchParams(window.location.search);
  const langParam = params.get('lang');
  if (langParam === 'en' || langParam === 'ja') {
    state.lang = langParam;
  }
  const themeParam = params.get('t');
  if (themeParam && THEMES[themeParam]) {
    state.theme = themeParam;
  }
  const vStr = params.get('v');
  if (vStr) {
    const parts = vStr.split(',').map((n) => parseInt(n, 10));
    if (parts.length === CHECKUP_ITEMS.length && parts.every((n) => !isNaN(n))) {
      CHECKUP_ITEMS.forEach((item, idx) => {
        state.values[item.id] = Math.max(0, Math.min(100, parts[idx]));
      });
    }
  }
  if (params.get('n')) runnerNameInput.value = params.get('n');
  if (params.get('g')) mainGameInput.value = params.get('g');
}

// Toast helper
let toastTimeout = null;
function showToast(msg, duration = 2600) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

// Helper to render #captureArea into a high-resolution Canvas (PC & Mobile consistent)
async function renderSheetCanvas() {
  const captureArea = document.getElementById('captureArea');
  if (typeof html2canvas === 'undefined' || !captureArea) {
    throw new Error('html2canvas unavailable');
  }

  const wasClosed = diagnosisAccordion && !diagnosisAccordion.open;
  if (wasClosed) {
    diagnosisAccordion.setAttribute('data-html2canvas-ignore', 'true');
  }

  const palette = THEMES[state.theme] || THEMES.standard;

  try {
    return await html2canvas(captureArea, {
      scale: 2,
      windowWidth: 960,
      backgroundColor: palette.cardBg,
      useCORS: true,
      logging: false,
      onclone: (clonedDoc) => {
        const clonedSheet = clonedDoc.getElementById('captureArea');
        if (clonedSheet) {
          clonedSheet.style.width = '868px';
          clonedSheet.style.maxWidth = '868px';

          // html2canvas tends to draw text slightly lower than the browser does
          // (font metrics of Noto Sans JP). Wrap each text node in a span nudged upward.
          // Adjust EXPORT_TEXT_SHIFT_EM if the image text is still too low / too high.
          const EXPORT_TEXT_SHIFT_EM = 0.1;
          const walker = clonedDoc.createTreeWalker(clonedSheet, NodeFilter.SHOW_TEXT);
          const textNodes = [];
          while (walker.nextNode()) {
            const node = walker.currentNode;
            if (node.nodeValue.trim() && node.parentElement && !node.parentElement.closest('script, style')) {
              textNodes.push(node);
            }
          }
          textNodes.forEach((node) => {
            const span = clonedDoc.createElement('span');
            span.style.position = 'relative';
            span.style.top = `-${EXPORT_TEXT_SHIFT_EM}em`;
            node.parentNode.insertBefore(span, node);
            span.appendChild(node);
          });

          // html2canvas renders native <input> elements with text shifted downwards.
          // Replace profile inputs with regular styled div boxes in the clone so text is centered and elevated.
          clonedDoc.querySelectorAll('.profile-field input').forEach((inputEl) => {
            const val = inputEl.value.trim() || inputEl.placeholder || '';
            const isPlaceholder = !inputEl.value.trim();
            const box = clonedDoc.createElement('div');
            
            box.style.display = 'flex';
            box.style.alignItems = 'center';
            box.style.fontFamily = 'inherit';
            box.style.fontSize = '0.92rem';
            box.style.fontWeight = isPlaceholder ? '400' : '700';
            box.style.color = isPlaceholder ? 'var(--text-muted)' : 'var(--text-main)';
            box.style.opacity = isPlaceholder ? '0.65' : '1';
            box.style.background = 'var(--surface-input)';
            box.style.border = '1px solid var(--border-strong)';
            box.style.borderRadius = '7px';
            box.style.padding = '0 10px';
            box.style.height = '34px';
            box.style.width = '100%';
            box.style.minWidth = '0';
            box.style.maxWidth = '100%';
            box.style.boxSizing = 'border-box';
            box.style.whiteSpace = 'nowrap';
            box.style.overflow = 'hidden';
            box.style.textOverflow = 'ellipsis';
            box.style.lineHeight = '1';

            const innerSpan = clonedDoc.createElement('span');
            innerSpan.style.position = 'relative';
            innerSpan.style.top = `-${EXPORT_TEXT_SHIFT_EM}em`;
            innerSpan.textContent = val;
            box.appendChild(innerSpan);

            inputEl.parentNode.replaceChild(box, inputEl);
          });
        }

        // html2canvas draws <input type="range"> values as text (e.g. "50" at the left edge).
        // Replace each slider in the clone with a plain div thumb at the same position.
        clonedDoc.querySelectorAll('.range-input').forEach((inputEl) => {
          const val = Number(inputEl.value);
          const original = document.getElementById(inputEl.id);
          const thumbColor = (original && original.style.getPropertyValue('--thumb-color')) || '#4f46e5';

          const thumb = clonedDoc.createElement('div');
          thumb.style.position = 'absolute';
          thumb.style.top = '50%';
          thumb.style.left = `${val}%`;
          thumb.style.width = '22px';
          thumb.style.height = '22px';
          // Matches native thumb travel: left edge = val% * (trackWidth - 22px)
          thumb.style.marginLeft = `${-22 * (val / 100)}px`;
          thumb.style.marginTop = '-11px';
          thumb.style.borderRadius = '50%';
          thumb.style.background = '#ffffff';
          thumb.style.border = `4px solid ${thumbColor.trim()}`;
          thumb.style.boxSizing = 'border-box';
          thumb.style.boxShadow = '0 2px 6px rgba(15, 23, 42, 0.25)';
          thumb.style.zIndex = '4';

          inputEl.parentNode.replaceChild(thumb, inputEl);
        });
      }
    });
  } finally {
    if (wasClosed && diagnosisAccordion) {
      diagnosisAccordion.removeAttribute('data-html2canvas-ignore');
    }
  }
}

// Event Listeners setup
function initEvents() {
  // Theme Swatches
  document.querySelectorAll('.theme-swatch').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTheme = btn.dataset.theme;
      if (state.theme !== targetTheme) {
        applyTheme(targetTheme, true);
      }
    });
  });

  // Language Switch
  document.getElementById('btnLangJa').addEventListener('click', () => {
    if (state.lang !== 'ja') setLanguage('ja', true);
  });

  document.getElementById('btnLangEn').addEventListener('click', () => {
    if (state.lang !== 'en') setLanguage('en', true);
  });

  if (diagnosisAccordion) {
    diagnosisAccordion.addEventListener('toggle', () => {
      updateSummaryHint();
      if (diagnosisAccordion.open) {
        drawBalanceChart(state.values);
      }
    });
  }

  document.getElementById('btnReset').addEventListener('click', () => {
    CHECKUP_ITEMS.forEach((item) => {
      state.values[item.id] = 50;
      const inputEl = document.getElementById(`input-${item.id}`);
      if (inputEl) inputEl.value = 50;
      updateSingleRowUI(item.id);
    });
    updateDiagnosis();
    showToast(UI_TEXT[state.lang].toastReset);
  });

  document.getElementById('btnRandom').addEventListener('click', () => {
    CHECKUP_ITEMS.forEach((item) => {
      const randVal = Math.floor(Math.random() * 101);
      state.values[item.id] = randVal;
      const inputEl = document.getElementById(`input-${item.id}`);
      if (inputEl) inputEl.value = randVal;
      updateSingleRowUI(item.id);
    });
    updateDiagnosis();
    showToast(UI_TEXT[state.lang].toastRandom);
  });

  [runnerNameInput, mainGameInput].forEach((input) => {
    input.addEventListener('input', () => {
      syncUrlState();
    });
  });

  // Download PNG via html2canvas (Uses active theme's card background color)
  const btnDownloadImg = document.getElementById('btnDownloadImg');
  btnDownloadImg.addEventListener('click', async () => {
    const t = UI_TEXT[state.lang];
    const spanEl = document.getElementById('uiBtnDownloadText');
    spanEl.textContent = t.btnDownloading;
    btnDownloadImg.disabled = true;

    try {
      const canvas = await renderSheetCanvas();
      const link = document.createElement('a');
      const runner = runnerNameInput.value.trim() || 'speedrunner';
      link.download = `${t.filePrefix}_${runner}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToast(t.toastSaved);
    } catch (err) {
      console.error(err);
      showToast(t.toastSaveErr);
    } finally {
      spanEl.textContent = UI_TEXT[state.lang].btnDownload;
      btnDownloadImg.disabled = false;
    }
  });

  // Share to X (Twitter):
  // - Post text contains only the runner type diagnosis (concise, no 6-item list)
  // - Mobile: uses native Web Share API with PNG image file attached
  // - PC: automatically copies PNG image to clipboard (for 1-step Ctrl+V paste) and opens X post window
  const btnShareX = document.getElementById('btnShareX');
  btnShareX.addEventListener('click', async () => {
    const t = UI_TEXT[state.lang];
    const diag = evaluateRunnerType(state.values);
    const name = runnerNameInput.value.trim();
    const game = mainGameInput.value.trim();
    const headerLine = name ? t.shareHeaderWithName(name) : t.shareHeaderAnon;
    const gameLine = game ? t.shareGame(game) : '';
    const typeBody = t.shareTypeBody(diag.title, diag.code, diag.catch);

    const text = `${headerLine}${gameLine}\n${typeBody}\n\n${t.footerHashtag}`;
    const shareUrl = window.location.href.startsWith('http') ? window.location.href : '';

    const intentUrl = new URL('https://twitter.com/intent/tweet');
    intentUrl.searchParams.set('text', text);
    if (shareUrl) intentUrl.searchParams.set('url', shareUrl);

    const spanEl = document.getElementById('uiBtnShareXText');
    spanEl.textContent = t.sharePreparing;
    btnShareX.disabled = true;

    try {
      const canvas = await renderSheetCanvas();
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));

      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
        || (navigator.maxTouchPoints > 0 && window.innerWidth <= 900);

      // 1. Smartphone / Tablet: Native OS share sheet with PNG image + post text
      if (isMobile && blob && navigator.canShare) {
        const runner = name || 'speedrunner';
        const file = new File([blob], `${t.filePrefix}_${runner}.png`, { type: 'image/png' });
        const shareData = {
          text: shareUrl ? `${text}\n${shareUrl}` : text,
          files: [file]
        };
        if (navigator.canShare(shareData)) {
          try {
            await navigator.share(shareData);
            return;
          } catch (shareErr) {
            if (shareErr && shareErr.name === 'AbortError') {
              return;
            }
          }
        }
      }

      // 2. PC (or mobile fallback): Copy PNG image to clipboard & open X compose screen
      let copiedImg = false;
      if (blob && navigator.clipboard && typeof ClipboardItem !== 'undefined') {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          copiedImg = true;
        } catch (clipErr) {
          console.warn('Clipboard image copy not supported:', clipErr);
        }
      }

      if (copiedImg) {
        spanEl.textContent = t.shareOpeningX;
        showToast(t.toastShareClipboard, 6500);
        // Delay opening the X tab so the user can read the "Copied! Press Ctrl+V" toast message
        await new Promise((resolve) => setTimeout(resolve, 2600));
      }

      window.open(intentUrl.toString(), '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error(err);
      window.open(intentUrl.toString(), '_blank', 'noopener,noreferrer');
    } finally {
      spanEl.textContent = UI_TEXT[state.lang].btnShareX;
      btnShareX.disabled = false;
    }
  });

  // Copy URL
  document.getElementById('btnCopyUrl').addEventListener('click', async () => {
    syncUrlState();
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast(UI_TEXT[state.lang].toastCopied);
    } catch {
      showToast(UI_TEXT[state.lang].toastCopied);
    }
  });
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
  initHeaderMeta();
  loadUrlState();
  applyLanguageTexts();
  applyTheme(state.theme, false);
  renderSliders();
  updateDiagnosis();
  initEvents();
});
