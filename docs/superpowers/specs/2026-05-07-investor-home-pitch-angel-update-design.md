---
title: 投資人專區 + 首頁 — pitch-angel 素材整合
date: 2026-05-07
status: design
related:
  - ref/BM_0504_1715/pitch-angel.html
  - ref/BM_0504_1715/pitch-angel-script.md
---

# 投資人專區 + 首頁更新（pitch-angel 素材整合）

## 1. 目標

把 `ref/BM_0504_1715/pitch-angel.html`（角色：種子輪 angel pitch deck）的關鍵敘事、信任素材與商業模型，落地到對外公開網站的首頁與投資人專區。同步把新確認的「公司使命」、「核心價值觀『長者為重』」、「林偉賢老師真情推薦講稿」整合進三個頁面。

## 2. NDA 線（公開 / 保留）

**公開（上網站）**：
- 林偉賢顧問（含完整推薦詞 + 「真情推薦 Video」按鈕 → https://91bse.org/）
- 三家資本後盾（Blackwell / Eongen / Marvel — 含 logo）
- APAC 銀髮市場數據與 7 國 + 東南亞合計國家表
- 三條收益模型（55% 訂閱 / 25% 數據 / 20% IP）含具體金額（$11M / $5M / $4M）、訂閱單價（$9.99 / $19.99）、戶數（8 萬）
- 2027 ARR USD $20M 與 87% 毛利率
- 三條退場路徑敘事（被併購 / 上市 / 戰略合併）

**保留（NDA / 索取 deck）**：
- 具體募資金額（$6.5M）
- 投前估值（$30M pre-money）
- 出讓股權比例（18%）
- 倍數預測表（4× / 13× / 50×+）— 30× growth visual 維持「示意 · NDA 後分享」

## 3. 公司使命 + 核心價值觀

兩條品牌靈魂句，於三個頁面皆露出：
- **使命**：「讓全天下沒有學不會 AI 的銀髮族」
- **核心價值**：「長者為重」

露出策略：
- **首頁**：Hero 下方新增薄條「MissionBar」，在 CapitalBackers 上方
- **投資人頁**：Hero 後新增 Mission/Values 區塊，在 Vision pillars 之前
- **About 頁**：開場主標 / 副標位置改用使命句（取代或補強既有開場）

## 4. 首頁版位變更

新版位順序：

```
1.  Hero (HeroLumi)                      — 不動
2.  MissionBar                           — 【新】使命 + 長者為重，薄條
3.  CapitalBackers                       — 【新】Hero 下方 trust bar，3 logos
4.  StuckPersonSection                   — 不動
5.  MarketOpportunity (← PainPointStats) — 【改】4 KPI + APAC 國家表
6.  PainPointScenarios                   — 不動
7.  LumiThreeSteps                       — 不動（不加第 4 步）
8.  RoadmapDualTrack                     — 不動
9.  RevenueFlywheel (← BusinessFlywheel) — 【改】三條收益 × 三段飛輪
10. Founders                             — 不動
11. AdvisorCard (林偉賢)                 — 【新】Founders 區段尾
12. For Business                         — 不動
13. Closing CTA                          — 不動
```

### 4.1 MissionBar（新元件）

- 路徑：`app/components/home/MissionBar.vue`
- 版面：薄條（~80-100px 高），漸層底
- 內容：
  - 上行：「使命 · MISSION」eyebrow + 「讓全天下沒有學不會 AI 的銀髮族」主句
  - 下行：「核心價值 · CORE VALUE」eyebrow + 「長者為重」
- i18n key：`home.lumi.mission.{eyebrow_mission, mission, eyebrow_value, value}`

### 4.2 CapitalBackers（新元件）

- 路徑：`app/components/home/CapitalBackers.vue`
- 版面：~140-180px 薄條
- 內容：
  - eyebrow「關鍵合夥人 · STRATEGIC BACKERS」
  - 3 logo 卡片（桌機 3 列、手機堆疊）：
    - Blackwell Global — 白底卡 — 角色「Capital · 種子輪領投」
    - Eongen — 白底卡 — 角色「Capital · 種子輪共投」
    - Marvel Capital 万丰资本 — `#0A1428` 深底卡 — 角色「Holdings · 種子輪共投」
  - 收尾說明：「亞太區三家資深金融機構 · 已承諾 Infinity Agentic 種子輪」
- 圖檔：`/public/img/backers/{blackwell.jpeg, eongen.png, marvel.png}` — Marvel 1.1MB 需壓縮至 < 80KB（webp 或重壓 png）
- i18n key：`home.lumi.backers.{eyebrow, b1_role, b2_role, b3_role, headline}`

### 4.3 MarketOpportunity（取代 PainPointStats）

- 路徑：改寫 `app/components/home/PainPointStats.vue` → 重命名 `MarketOpportunity.vue`
- 結構：兩段
  - 段一：4 KPI（網格 4 列）— 3-5 個 / 14 億 / 5.7 億 (新) / +25 萬 — 拿掉原 USD $240（移到 RevenueFlywheel 帶出）
  - 段二：APAC 國家表（東亞 + 東南亞爆發點）— 完整 7 國 + 東南亞合計
    - 響應式：桌機 4 欄完整表格（國家 / 2020 60+ / 2030 預估 / 2050 60+ 佔比）；手機堆疊為卡片列表
- i18n key：`home.lumi.market.*`
  - `eyebrow_macro`、`title`、`subtitle`
  - `kpi.{i1,i2,i3,i4}.{stat,label,desc}`
  - `apac.{title, subtitle, header_country, header_2020, header_2030, header_2050_share, countries[]}`
  - `apac.countries[]` 為陣列，每筆 `{name, c2020, c2030, c2050_share, note?}`
- 註：`home.lumi.pain.subtitle` + `home.lumi.pain.scenarios.*` + `home.lumi.pain.closing` 保留給下方 PainPointScenarios。`home.lumi.pain.i1~i4_*` 鍵值於遷移後移除。

### 4.4 RevenueFlywheel（改寫 BusinessFlywheel）

- 路徑：改寫 `app/components/home/BusinessFlywheel.vue`（保留檔名減少 git 雜訊）
- 結構：
  - 三張卡片橫排，每張：百分比大字 + 收益標題 + 飛輪敘事 + 具體例子
    - 卡 1（55% 訂閱）：訂閱黏性敘事 + USD $9.99/月 個人 / $19.99/月 家庭（可加 4 位長輩）
    - 卡 2（25% 數據）：行為大模型敘事 + 「授權 AI / 保險 / 長照 / 政府」
    - 卡 3（20% IP）：IP 衍生敘事 + 「公仔 / 聯名 / 表情包 / AR 濾鏡 · Hello Kitty 模式 · 90%+ 毛利」
  - 收尾大字：USD $20M ARR · 2027 · 毛利率 87%
- 取捨：
  - 拿掉原飛輪「健康守護延伸」（與 v3 Roadmap 重複）
  - 改用「IP 衍生」作為第三條（pitch 新素材）
- i18n key：重寫 `home.lumi.flywheel.*`
  - `title`、`subtitle`
  - `i1.{share, title, desc, detail}`、`i2.{share, title, desc, detail}`、`i3.{share, title, desc, detail}`
  - `arr_label`、`arr_value`、`gross_margin_label`、`gross_margin_value`、`closing_note`

### 4.5 AdvisorCard（新元件）

- 路徑：`app/components/home/AdvisorCard.vue`
- 版面：Founders 區段尾，獨立橫卡
- 結構：
  ```
  ─── 商業模式顧問 ───

  ┌─────┐  林偉賢 老師 真情推薦
  │     │  實踐家董事長 · 全球商業模式設計權威
  │ 照  │
  │ 片  │  「（金句 1）」「（金句 2）」「（金句 3）」
  │     │
  └─────┘  [展開完整推薦詞]    [真情推薦 Video →]
  ```
- 照片欄位：保留 `/public/img/advisors/lin-weixian.jpg` 路徑（先空白/placeholder，user 後補）
- 「展開完整推薦詞」→ Dialog 彈出，居中遮罩，內含 22 行完整講稿
- 「真情推薦 Video」→ 外連 https://91bse.org/（target="_blank"）
- 三句摘錄金句（公開卡片版）：
  - 「嚕米嚕米，按一下就通，手機電腦它都聽得懂。」
  - 「我要推薦無限智能的嚕米嚕米服務 — 讓全天下沒有不會用 AI 的銀髮族。」
  - 「長者優先的價值觀，正是我最想分享的路。」
- i18n key：`home.lumi.advisor.*`
  - `eyebrow`、`name`、`title`、`headline`（「真情推薦」）
  - `quotes`（陣列，3 句）
  - `expand_label`（按鈕文字「展開完整推薦詞」）
  - `video_label`（按鈕文字「真情推薦 Video」）
  - `full_speech`（22 行完整講稿，i18n 字串內含 `\n` 換行）
- Dialog 元件：app/components/ui/ 目前有 sheet 但無 dialog。實作策略：透過 shadcn-vue CLI 加裝 dialog 元件（`pnpm dlx shadcn-vue@latest add dialog`），不自寫 modal
- `full_speech` i18n 字串於 vue 模板渲染時加 `whitespace-pre-line` class（或於 ts 端拆 array `.split('\n')` 後逐行 `<p>`，實作階段擇一）

## 5. 投資人頁全面重寫

### 5.1 新版面順序

```
1. Hero (data.title / data.description)
2. MissionValues             — 【新】使命 + 長者為重大字
3. Vision Pillars (現有結構，內文改 LUMI 主軸)
4. AdvisorCard (林偉賢)      — 【新】與首頁同元件，可重用
5. CapitalBackers (詳版)     — 【新】與首頁同元件，可重用，subline 加長
6. MarketOpportunity (詳版)  — 【新】APAC 完整國家表（與首頁同元件複用），加資料來源「UN World Population Prospects」
7. RevenueStreams (詳版)     — 【新】三條收益 + 細項金額
8. Growth30x Visual          — 【保留】維持示意 · NDA 後分享
9. ExitPaths                 — 【新】三條退場路徑卡片
10. CTA Request Deck         — 【保留】
```

### 5.2 拿掉的內容

- `content/{zh-TW,zh-CN,en}/investors.md` 內 frontmatter `features` 三卡（全球市場機會 / 利基市場護城河 / 開放專利護盾）
- `content/{zh-TW,zh-CN,en}/investors.md` Markdown 主體（投資亮點 1-4 段：解決真實痛點 / 雙商業模式 / 利基市場高估值 / 借鏡 Qualcomm-PlayStation-Android）
- `app/pages/investors.vue` 內 SectionContainer 渲染 features 區塊與 ContentRenderer 區塊
- 註：平台論述（Qualcomm / PlayStation / Android）已在 `/platform`、`/partners` 頁，不消失

### 5.3 改寫的內容

- `content/{zh-TW,zh-CN,en}/investors.md`：
  - frontmatter `features` 改為 LUMI 三大支柱（與 Vision pillars 同步）：
    - L1 銀髮陪伴（icon: heart-handshake）
    - L2 行為大模型（icon: database）
    - L3 企業模組（icon: building-2）
  - Markdown 主體拿掉 Qualcomm/PlayStation/Android 段，改寫為簡短「投資邏輯總結」段（或留空，全靠 vue 元件）
- `app/pages/investors.vue` Vision pillars 文案：
  - L1「消費者陪伴」→「銀髮陪伴」（新文案聚焦銀髮 + 子女付費）
  - L2「行為數據引擎」沿用，文案微調強調 LUMI 數據資產
  - L3「企業模組變現」沿用，文案微調強調預裝授權給長照保險政府

### 5.4 新增區塊

#### 5.4.1 MissionValues（投資人頁）

- inline 區塊（不獨立元件，直接寫在 investors.vue）
- 大字呈現使命 + 長者為重，比首頁 MissionBar 更隆重

#### 5.4.2 RevenueStreams（投資人頁詳版）

- 路徑：`app/components/sections/RevenueStreams.vue`（投資人頁專用，不重用 RevenueFlywheel — 投資人頁要列細項金額）
- 內容（按 §6a 全公開）：
  - 卡 1（55% 訂閱）：USD $11M · 8 萬戶付費家庭 · USD $9.99/月 個人方案 + USD $19.99/月 家庭方案（可加 4 位長輩）
  - 卡 2（25% 數據）：USD $5M · B2B 數據 API 授權 · 匿名化銀髮族操作行為數據 · 授權給 AI 公司、保險、長照、政府
  - 卡 3（20% IP）：USD $4M · 毛利 90%+ · 公仔 / 聯名 / 表情包 / AR 濾鏡 / 品牌授權 · Hello Kitty 模式
  - 收尾：2027 ARR USD $20M · 毛利率 87% · 三條收入彼此獨立又互相加成
- i18n key：`investors.revenue.*`

#### 5.4.3 ExitPaths（投資人頁）

- 路徑：`app/components/sections/ExitPaths.vue` 或 inline 寫於 investors.vue
- 內容（3 卡橫排或縱列）：
  - 01 被併購 — Apple / Google / Amazon Alexa+ / 長照集團 / AARP
  - 02 獨立上市 — 美股 (Nasdaq) 或港股 / 銀髮科技類股當紅賽道
  - 03 戰略合併 — 與機器人公司 (Figure / 1X) 合併進入 v4 階段
- i18n key：`investors.exits.{title, subtitle, e1.{code,title,desc}, e2.*, e3.*}`

## 6. About 頁變更

### 6.1 開場（Hero / 首屏文案）

- 主標：使命「讓全天下沒有學不會 AI 的銀髮族」
- 副標：「核心價值 · 長者為重」
- 既有副標保留為第三層輔助說明

### 6.2 創辦團隊區下方新增「商業模式顧問」區段

- 同 AdvisorCard 元件，但展示完整推薦詞 inline（**不**用 dialog）
- 加長林偉賢頭銜 / 履歷介紹（多句敘述）
- 結構：
  ```
  ─── 商業模式顧問 ───

  [大頭照] 林偉賢 老師
           實踐家董事長 · 全球商業模式設計權威
           （延伸介紹一段）

           ─── 真情推薦講稿 ───
           （22 行完整講稿）

           [真情推薦 Video →]
  ```
- 元件設計：AdvisorCard.vue 加 `variant: 'compact' | 'full'` props
  - `compact`（首頁 + 投資人頁）：3 句金句 + Dialog 展開全文
  - `full`（About 頁）：全文 inline + 延伸介紹

## 7. i18n 鍵值變更總覽（zh-TW / zh-CN / en 三語）

### 新增

```
home.lumi.mission.{eyebrow_mission, mission, eyebrow_value, value}
home.lumi.backers.{eyebrow, b1_role, b2_role, b3_role, headline}
home.lumi.market.{
  eyebrow_macro, title, subtitle,
  kpi.{i1,i2,i3,i4}.{stat,label,desc},
  apac.{title, subtitle, header_country, header_2020, header_2030, header_2050_share, countries[]}
}
home.lumi.advisor.{
  eyebrow, name, title, role_extended (About 用),
  headline, quotes[], expand_label, video_label, full_speech
}
investors.mission.{eyebrow, mission, value}
investors.advisor.* (重用 home.lumi.advisor)
investors.market.* (重用 home.lumi.market 加 source_note)
investors.revenue.{title, subtitle, r1.*, r2.*, r3.*, arr_label, arr_value, gross_margin_label, gross_margin_value, closing_note}
investors.exits.{title, subtitle, e1.*, e2.*, e3.*}
about.mission.{tagline, value_tagline}
```

### 重寫（破壞性變更）

```
home.lumi.flywheel.* — i1/i2/i3 各加 share / detail，主敘事全改寫
```

### 移除

```
home.lumi.pain.{i1_stat, i1_label, i1_desc, i2_*, i3_*, i4_*}  — 移到 home.lumi.market.kpi
```

## 8. 圖片資產

```
public/img/backers/blackwell.jpeg   (22KB, 已抽出)
public/img/backers/eongen.png       (5.8KB, 已抽出)
public/img/backers/marvel.png       (1.1MB → 需壓縮 < 80KB, 已抽出)
public/img/advisors/lin-weixian.jpg (待 user 補；先放透明 1×1 placeholder 或不用 img tag)
```

## 9. 元件清單（新增 / 改寫）

| 動作 | 路徑 | 用途 |
|---|---|---|
| 新增 | `app/components/home/MissionBar.vue` | 首頁使命條 |
| 新增 | `app/components/home/CapitalBackers.vue` | 首頁 + 投資人頁資本後盾（同元件） |
| 改寫 | `app/components/home/PainPointStats.vue` → 重命名 `MarketOpportunity.vue`（同步更新 `app/pages/index.vue` 中元件名稱） | 4 KPI + APAC 國家表 |
| 改寫 | `app/components/home/BusinessFlywheel.vue` | 三條收益 × 三段飛輪 |
| 新增 | `app/components/home/AdvisorCard.vue` | 林偉賢顧問卡（compact / full 兩 variant） |
| 新增 | `app/components/sections/RevenueStreams.vue` | 投資人頁三條收益詳版 |
| 新增 | `app/components/sections/ExitPaths.vue` | 投資人頁三條退場路徑 |
| 新增（如缺） | `app/components/ui/dialog/` | shadcn-vue dialog（用於 AdvisorCard compact 展開全文） |

## 10. 範圍外（不做）

- 推薦詞獨立 `/advisor` 或 `/testimonial` 頁面（決定走 Dialog + About 頁全文，不另開頁）
- 林偉賢老師照片（user 後補）
- Marvel logo 壓縮優化的具體工具選型（實作階段決定）
- 平台論述頁面（/platform, /partners）內容更新 — 與本任務無關
- 首頁第 4 步「每週反饋」（明確跳過）
- 公開 $6.5M / $30M pre / 18% / 50× 等具體募資數字（守 NDA）

## 11. 驗收條件

- [ ] 首頁三語切換後，新增 11 個版位皆可正確顯示，無翻譯遺漏
- [ ] 投資人頁三語切換後，9 個版位皆可正確顯示
- [ ] About 頁三語切換後，使命條 + 顧問完整推薦詞皆可正確顯示
- [ ] 三家 backer logo 在桌機 + 手機皆能正確顯示，Marvel 深底卡背景對
- [ ] APAC 國家表在桌機顯示完整 7 國 + 東南亞合計；手機堆疊呈現
- [ ] AdvisorCard 「展開完整推薦詞」Dialog 開關正常，三語切換 OK
- [ ] AdvisorCard 「真情推薦 Video」按鈕外連 91bse.org（target=_blank）
- [ ] 30× growth visual 於投資人頁仍維持「示意 · NDA 後分享」未升級為 50×
- [ ] `pnpm build` 或 `pnpm generate` 通過，無 prerender error
- [ ] 拿掉的舊 i18n 鍵（pain.i1~i4）沒有任何 .vue / .ts 檔還在引用
