# LUMI 文案 TA 收斂：銀髮族 + 孝順子女

**日期**：2026-05-06
**狀態**：Draft（待 user review）
**作者**：Luke + Claude（brainstorming session）
**參考素材**：`ref/BM_0504_1715/pitch-angel.html`（Angel Pitch 10 min 情感版）

---

## 1. 背景與動機

LUMI 原本定位為「廣義 AI 同伴」——服務範圍涵蓋 AI 用戶、家庭 DIY、客服、員工訓練等。Angel Pitch 在試講過程中，把 TA 收斂為「**銀髮族 + 為父母付費的子女**」之後，情感穿透力與商業故事都顯著變強。

本 spec 把同樣的收斂套用到 infiag.com 官方網站的 LUMI 區塊（home 頁），讓網站訊息與最新一版 angel pitch 一致。

### 為什麼要做

- 訪客（投資人 / 企業夥伴 / 媒體）目前在網站上看到的 LUMI 是廣義 AI 同伴，與後續 angel pitch 的銀髮族敘事不一致——會在面對面對話時造成期待落差
- 「銀髮族 + 子女付費」是 angel pitch 反覆驗證、最有共鳴的市場切角，網站需要把這個切角變成第一印象
- LUMI for Business 的潛在客戶（長照機構、保險公司、AARP、政府）在網站搜尋時會用銀髮 / 長照 / 健康守護等關鍵字，目前的 SEO 沒押到這些字

---

## 2. 設計決策（10 題確認結果）

| # | 題目 | 選擇 | 影響 |
|---|------|------|------|
| Q1 | 收斂幅度 | **A 全面收斂** | hero / stuck / pain / steps / roadmap / flywheel / B2B 全部改 |
| Q2 | Hero 主標 | **A 創辦人情感鉤** | 「為了我媽，我們造了她」 |
| Q3 | Stuck 訴求 | **A 強情感洞察** | 「她不是不會用——是不敢問了」 |
| Q4 | Pain 結構 | **C+B 混合** | 上半 4 個新 stats + 下半 8 張爸媽問題場景卡 |
| Q5 | Steps 視角 | **B 子女/父母視角** | 不再用「長按」這種詞 |
| Q6 | Roadmap | **B 技術階段保留 + 銀髮注解** | v1-v3 加銀髮場景，v4 改長照保險政府 |
| Q7 | Flywheel | **B 三段飛輪邏輯** | 訂閱黏性 / 銀髮行為大模型 / 健康守護延伸 |
| Q8 | Closing | **A 與 Hero 首尾呼應** | 「我為了我媽，已經開始做了」 |
| Q9 | SEO/Schema | **B 雙押** | 保留 AI 同伴、新增銀髮關鍵字、移除 IP 品牌 |
| Q10 | 範圍 | **A 三語同步 + CTA 中性** | zh-TW / zh-CN / en 同步、CTA 不動 |

---

## 3. 影響範圍

### 3.1 i18n 文案（三語同步）

- `i18n/locales/zh-TW.json`（**主版**，先寫，後譯）
- `i18n/locales/zh-CN.json`（簡體 + 大陸用詞）
- `i18n/locales/en.json`（英譯保留情感張力）

涉及 keys：
- `home.lumi.seo.{title, description}`
- `home.lumi.hero.{title, desc}`（tagline 保留 "Meet LUMI"）
- `home.lumi.stuck.{label, title, quote, body_p1, body_p2, tagline}`
- `home.lumi.pain.{title, subtitle, i1-i4_*}` + **新增 8 張場景卡**（新 keys，見 §4.3）
- `home.lumi.steps.{title, subtitle, s1-s3_*}`
- `home.lumi.roadmap.{c_caption, v1_desc, v2_tagline, v2_desc, v3_tagline, v3_desc, v4_tagline, v4_desc}`
- `home.lumi.flywheel.{subtitle, i1_*, i2_*, i3_*}`
- `home.lumi.for_business.{title, subtitle}`
- `home.lumi.closing.{title, subtitle}`
- `schema.org.{description, knowsAbout}`

### 3.2 Vue 元件（home）

| 元件 | 改動 |
|------|------|
| `HeroLumi.vue` | 純 i18n key 替換 |
| `StuckPersonSection.vue` | 純 i18n key 替換 |
| **`PainPointStats.vue`** | i18n key 替換 4 個 stats；下方新增 8 張場景卡（建議拆出新元件 `PainPointScenarios.vue` 接在 PainPointStats 之後） |
| `LumiThreeSteps.vue` | 純 i18n key 替換（標題加「父母」字） |
| `RoadmapDualTrack.vue` | 純 i18n key 替換 |
| `BusinessFlywheel.vue` | 純 i18n key 替換 |
| `pages/index.vue` | 在 `<PainPointStats>` 之後插入 `<PainPointScenarios>`，傳入 8 張場景 props |

### 3.3 SEO / Schema

- `home.lumi.seo.title` / `description` 改寫
- `schema.org.description` / `knowsAbout` 改寫（移除 IP，新增銀髮關鍵字）

### 3.4 不動

- `nav.lumi`：保留「LUMI」品牌名
- `cta.*`：所有 CTA 保留中性（「體驗 LUMI」「成為早期用戶」⋯⋯），讓不同 section 可重用
- `site.tagline`：「打造 AI/XR 開放生態合作平台」是公司層級，不動
- `solutions.*` / `partners.*` / `investors.*`：本次不動，後續若有需要再單獨開 spec
- `founders.*`：不動

---

## 4. 新文案（zh-TW 主版）

### 4.1 Hero

| Key | 新文案 |
|---|---|
| `hero.tagline` | Meet LUMI（不動）|
| `hero.title` | 為了我媽，我們造了她。 |
| `hero.desc` | LUMI 將陪世界上 8 億個媽媽，把每一步走完。 |

### 4.2 Stuck

| Key | 新文案 |
|---|---|
| `stuck.label` | 為什麼是 LUMI |
| `stuck.title` | 她不是不會用——是不敢問了。 |
| `stuck.quote` | 「我那一晚才意識到——我媽，已經很久沒問過我問題了。」 |
| `stuck.body_p1` | 被拒絕、被打斷、被吼過幾次以後，父母選擇閉嘴。「長按是什麼？」「驗證碼在哪？」「群組接龍怎麼弄？」——他們不是學不會，只是不想再讓孩子覺得自己麻煩。 |
| `stuck.body_p2` | AI 給得了答案。給不了那雙陪你完成的手。 |
| `stuck.tagline` | LUMI 在他們螢幕上，輕輕指引每一步——直到事情真的做完。 |

### 4.3 Pain

**標題列**

| Key | 新文案 |
|---|---|
| `pain.title` | 這不是個案——每天在世界各地上演 |
| `pain.subtitle` | 你的爸媽，可能也問過你⋯⋯ |

**4 個 Stats（替換原 i1-i4）**

| Key | stat | label | desc |
|---|---|---|---|
| `pain.i1_*` | 3-5 | 每位銀髮族每天 | 遇到的科技操作問題 |
| `pain.i2_*` | 14 億 | 2030 全球 60+ 銀髮族 | 老齡化是不可逆趨勢 |
| `pain.i3_*` | +25 萬 | 每天新增銀髮族 | 市場每天都在成長 |
| `pain.i4_*` | USD $240 | 子女年付費意願 | 替父母解決科技問題 |

**8 張場景卡（新 keys：`pain.scenarios.s1-s8.{quote, cause}`）**

| # | quote | cause |
|---|---|---|
| s1 | 我手機怎麼**沒鈴聲**了？ | 勿擾模式被誤開 |
| s2 | **密碼又忘了**怎麼辦？ | 每月平均 3 次重設 |
| s3 | 群組叫我**接龍**，怎麼弄？ | 複製格式 + 加自己 |
| s4 | **簡訊驗證碼**在哪裡？ | 登入卡關最常見 |
| s5 | **Wi-Fi** 為什麼連不上？ | 忘記重連步驟 |
| s6 | 網路**掛號**掛不到 | 介面太複雜 |
| s7 | 他**視訊**打給我怎麼接？ | FaceTime / LINE 視訊 |
| s8 | APP 怎麼**下載**？ | App Store 流程 |

**結尾收句（新 key：`pain.closing`）**

> 不是「服務所有 AI 用戶」這種模糊定位——**銀髮族 + 子女付費**，才是這個時代最被低估的市場。

### 4.4 Steps

| Key | 新文案 |
|---|---|
| `steps.title` | LUMI 怎麼陪父母做？ |
| `steps.subtitle` | 三步，把 AI 從「答案機」變成「同伴」 |
| `steps.s1_title` | 看到爸媽螢幕上發生什麼 |
| `steps.s1_desc` | 不需要他們解釋，LUMI 自己看得懂——本機運行，不上傳隱私。 |
| `steps.s2_title` | 紫光圈出「按這裡」 |
| `steps.s2_desc` | 不再說「長按」「下拉」這種父母聽不懂的詞——直接圈出該按的位置。 |
| `steps.s3_title` | 陪到事情真的做完 |
| `steps.s3_desc` | 不是丟答案，而是一步一步等他們完成——下一次同樣的問題，他們會自己學會。 |

### 4.5 Roadmap

| Key | 新文案 |
|---|---|
| `roadmap.c_caption` | 從手機螢幕，走進客廳，走進健康守護 |
| `roadmap.v1_desc` | 今年上線。LUMI 進到爸媽手機，每個 App 操作都有人陪。 |
| `roadmap.v2_tagline` | AR 走進家中 |
| `roadmap.v2_desc` | 從手機螢幕走進客廳——眼鏡或智慧屏，陪在他們身邊。 |
| `roadmap.v3_tagline` | 沉浸關懷 |
| `roadmap.v3_desc` | 用藥提醒、跌倒警示、認知健康訓練——LUMI 不只陪伴，更守護。 |
| `roadmap.v4_tagline` | 長照、保險、政府數位平權 |
| `roadmap.v4_desc` | 預裝授權給長照機構、保險公司、AARP 與政府數位平權專案。 |

（其他 key：`title` `subtitle` `c_label` `b_label` `b_caption` `v1_year` `v1_tagline` `v2_year` `v3_year` `v4_name` `v4_year` `b_cta` 維持原樣不動）

### 4.6 Flywheel

| Key | 新文案 |
|---|---|
| `flywheel.title` | 為什麼這會持續成長（不動） |
| `flywheel.subtitle` | 三段飛輪——子女付費、銀髮陪伴、健康守護，每一輪都讓下一輪更快。 |
| `flywheel.i1_title` | 訂閱黏性 |
| `flywheel.i1_desc` | 子女付費 × 父母使用——年流失 < 8%，遠高於工具型 AI 的家庭黏性。 |
| `flywheel.i2_title` | 銀髮族行為大模型 |
| `flywheel.i2_desc` | 每一次「陪做完」，都在累積全球第一個 60+ 銀髮族操作行為資料庫。 |
| `flywheel.i3_title` | 健康守護延伸 |
| `flywheel.i3_desc` | 跌倒、用藥、失智早期警示——成為長照保險 B2B 的天然入口。 |

### 4.7 For Business

| Key | 新文案 |
|---|---|
| `for_business.title` | LUMI 也開放給長照、保險、政府 |
| `for_business.subtitle` | 預裝授權、健康守護模組、SDK——AARP、保險公司、長照機構、政府數位平權專案，都能找到 LUMI 的位置。 |

### 4.8 Closing

| Key | 新文案 |
|---|---|
| `closing.title` | 我為了我媽，已經開始做了。 |
| `closing.subtitle` | 跟我們一起，把 LUMI 送到每一位長者手上。 |

### 4.9 SEO

| Key | 新文案 |
|---|---|
| `home.lumi.seo.title` | LUMI · 為了爸媽而生的 AI 同伴 |
| `home.lumi.seo.description` | LUMI 陪父母完成每一個螢幕操作，子女不必再接那通電話。Lumi 來自拉丁文 lux，意為光。 |

### 4.10 Schema.org

| Key | 新文案 |
|---|---|
| `schema.org.description` | Infinity Agentic 旗下產品 LUMI — 為銀髮族與付費子女設計的 AI 陪伴同伴；同時開放健康守護模組與 SDK 給長照、保險、政府。 |

`schema.org.knowsAbout`（陣列重組）：

- **保留**：AI 同伴、人工智慧、人類行為大模型、螢幕陪伴 AI、AR / VR 應用、企業 AI 模組、B2B AI 授權
- **+ 新增**：銀髮陪伴 AI、長者數位陪伴、家庭付費 AI、長照科技、健康守護
- **− 移除**：IP 與品牌

---

## 5. zh-CN 對應草稿（簡體 + 大陸用詞）

只列與 zh-TW 用字差異較大的 key，其他僅做繁→簡轉換即可。

| Key | zh-CN |
|---|---|
| `hero.title` | 为了我妈，我们造了她。 |
| `hero.desc` | LUMI 将陪世界上 8 亿位妈妈，把每一步走完。 |
| `stuck.title` | 她不是不会用——是不敢问了。 |
| `stuck.body_p1` | 被拒绝、被打断、被吼过几次以后，父母选择闭嘴。「长按是什么？」「验证码在哪？」「群里发龙怎么弄？」——他们不是学不会，只是不想再让孩子觉得自己麻烦。 |
| `stuck.body_p2` | AI 给得了答案。给不了那双陪你完成的手。 |
| `pain.title` | 这不是个案——每天都在世界各地上演 |
| `pain.subtitle` | 你的爸妈，可能也问过你⋯⋯ |
| `pain.i4_label` | 子女年付费意愿 |
| `pain.scenarios.s3.quote` | 群里发**接龙**，怎么弄？ |
| `pain.scenarios.s6.quote` | 网上**挂号**抢不到 |
| `steps.title` | LUMI 怎么陪父母做？ |
| `steps.s2_title` | 紫光圈出「按这里」 |
| `steps.s2_desc` | 不再说「长按」「下拉」这种父母听不懂的词——直接圈出该按的位置。 |
| `flywheel.subtitle` | 三段飞轮——子女付费、银发陪伴、健康守护，每一轮都让下一轮更快。 |
| `for_business.title` | LUMI 也开放给长照、保险、政府 |
| `closing.title` | 我为了我妈，已经开始做了。 |
| `closing.subtitle` | 跟我们一起，把 LUMI 送到每一位长者手上。 |
| `seo.title` | LUMI · 为了爸妈而生的 AI 同伴 |
| `seo.description` | LUMI 陪父母完成每一个屏幕操作，子女不必再接那通电话。Lumi 来自拉丁文 lux，意为光。 |

---

## 6. en 對應草稿（保留情感張力）

| Key | en |
|---|---|
| `hero.title` | I built her for my mom. |
| `hero.desc` | LUMI is going to walk 800 million mothers through every step. |
| `stuck.label` | Why LUMI |
| `stuck.title` | She isn't unable to use it. She's afraid to ask. |
| `stuck.quote` | "That night I realized — my mom hasn't asked me a question in a long, long time." |
| `stuck.body_p1` | After being brushed off, cut off, or yelled at a few times, parents stop asking. "What does long-press mean?" "Where's the verification code?" "How do I do a group chain message?" — they aren't slow. They just don't want to feel like a burden anymore. |
| `stuck.body_p2` | AI can give them the answer. It can't give them the hand that walks them through. |
| `stuck.tagline` | LUMI sits on their screen — gently pointing to every next step, until the thing actually gets done. |
| `pain.title` | This isn't isolated — it's happening every day, all over the world. |
| `pain.subtitle` | Your parents have probably asked you... |
| `pain.i1_stat` | 3-5 |
| `pain.i1_label` | per-day, per-elder |
| `pain.i1_desc` | tech operation problems they hit. |
| `pain.i2_stat` | 1.4B |
| `pain.i2_label` | global 60+ population by 2030 |
| `pain.i2_desc` | Aging is the irreversible mega-trend. |
| `pain.i3_stat` | +250K |
| `pain.i3_label` | new elders every day |
| `pain.i3_desc` | The market grows while you sleep. |
| `pain.i4_stat` | USD $240 |
| `pain.i4_label` | yearly willingness-to-pay |
| `pain.i4_desc` | Adult children, paying to solve their parents' tech problems. |
| `pain.scenarios.s1.quote` | "Why is my phone **silent**?" |
| `pain.scenarios.s1.cause` | Do-not-disturb left on |
| `pain.scenarios.s2.quote` | "I **forgot the password** again." |
| `pain.scenarios.s2.cause` | 3× resets / month avg. |
| `pain.scenarios.s3.quote` | "The group wants a **chain message** — how?" |
| `pain.scenarios.s3.cause` | Copy format + add your name |
| `pain.scenarios.s4.quote` | "Where's the **SMS verification code**?" |
| `pain.scenarios.s4.cause` | #1 sign-in blocker |
| `pain.scenarios.s5.quote` | "Why won't **Wi-Fi** connect?" |
| `pain.scenarios.s5.cause` | Reconnect steps forgotten |
| `pain.scenarios.s6.quote` | "I can't **book the doctor's slot**." |
| `pain.scenarios.s6.cause` | UI is too complex |
| `pain.scenarios.s7.quote` | "He's calling me on **video** — how do I answer?" |
| `pain.scenarios.s7.cause` | FaceTime / LINE video |
| `pain.scenarios.s8.quote` | "How do I **download an app**?" |
| `pain.scenarios.s8.cause` | App Store flow |
| `pain.closing` | Not "AI for everyone" — but **elders + adult children paying for them** is the most underestimated market of this decade. |
| `steps.title` | How LUMI walks parents through |
| `steps.subtitle` | Three steps that turn AI from an answer-machine into a companion. |
| `steps.s1_title` | It sees what's on Mom's screen |
| `steps.s1_desc` | They don't have to explain. LUMI reads the moment — runs on-device, no privacy leak. |
| `steps.s2_title` | Purple light circles "tap here" |
| `steps.s2_desc` | No more "long-press" or "swipe down" — words parents don't know. LUMI just shows where to tap. |
| `steps.s3_title` | Stays till the thing is actually done |
| `steps.s3_desc` | Not a one-shot answer. A walk-through, step by step — and next time, they'll do it themselves. |
| `roadmap.c_caption` | From the phone screen, into the living room, into health care |
| `roadmap.v1_desc` | Shipping this year. LUMI on Mom's phone — every app step, with company. |
| `roadmap.v2_tagline` | AR — into the home |
| `roadmap.v2_desc` | From the screen into the living room — glasses or a smart display, right there with them. |
| `roadmap.v3_tagline` | Immersive care |
| `roadmap.v3_desc` | Medication reminders, fall alerts, cognitive-health training — not just companion, but guardian. |
| `roadmap.v4_tagline` | Eldercare, insurance, government |
| `roadmap.v4_desc` | License the LUMI engine to eldercare, insurers, AARP, and digital-equity programs. |
| `flywheel.subtitle` | A three-part flywheel — children pay, parents use, health care extends. Each loop accelerates the next. |
| `flywheel.i1_title` | Subscription stickiness |
| `flywheel.i1_desc` | Children pay × parents use — < 8% annual churn, far above tool-type AI. |
| `flywheel.i2_title` | 60+ behavior model |
| `flywheel.i2_desc` | Every walked-through task builds the world's first dataset of how seniors actually use technology. |
| `flywheel.i3_title` | Health-care extension |
| `flywheel.i3_desc` | Falls, medication, early dementia signals — natural entry point for eldercare and insurance B2B. |
| `for_business.title` | We're open to eldercare, insurance, and government too |
| `for_business.subtitle` | Preinstall licenses, health-guardian modules, SDK — AARP, insurers, eldercare facilities, digital-equity programs. There's a place for LUMI in your stack. |
| `closing.title` | I started this — for my mom. |
| `closing.subtitle` | Walk with us — to every elder's hand, across Asia-Pacific. |
| `seo.title` | LUMI · The AI companion built for parents |
| `seo.description` | LUMI walks parents through every screen step — so adult children don't have to take that call. Lumi (Latin: lux, light), by Infinity Agentic. |
| `schema.org.description` | LUMI by Infinity Agentic — an AI companion built for elders and the adult children who pay for them; health-guardian module and SDK open to eldercare, insurance, and government partners. |

---

## 7. 元件結構改動

### 7.1 新增元件 `app/components/home/PainPointScenarios.vue`

接受 props：
```ts
type Scenario = { quote: string; cause: string }
defineProps<{
  subtitle: string  // 「你的爸媽，可能也問過你⋯⋯」
  scenarios: Scenario[]  // 8 張
  closing: string  // 結尾收句
}>()
```

設計：
- 8 張卡（4×2 grid on desktop、2×4 on tablet、1×8 on mobile）
- 每張卡：`quote` 主文（含 `<b>` 強調字）+ `cause` 灰色小字注解
- 卡片視覺維持與 PainPointStats 一致（`glass-card` + 紫色強調）
- 結尾 `closing` 居中段落

### 7.2 `pages/index.vue` 結構調整

```
<HeroLumi />
<StuckPersonSection />
<PainPointStats />          ← 4 stats（口徑替換）
<PainPointScenarios />      ← 新增 8 張場景卡
<LumiThreeSteps />
<RoadmapDualTrack />
<BusinessFlywheel />
... (existing tail)
```

### 7.3 其他元件

維持現有 props 介面，僅替換 i18n key 對應的字串內容——不改元件 API、不改 layout。

---

## 8. 不在範圍內（YAGNI）

- 不改 site.tagline / nav / cta / footer
- 不改 solutions / partners / investors 子頁
- 不改 founders 區塊
- 不改視覺素材（圖片、icon、配色）——本 spec 純文案 + 結構新增
- 不做 A/B test 框架
- 不做新增表單
- LUMI demo / try_lumi 連結維持原本指向

---

## 9. 驗收標準

1. 三語 i18n 全部更新且鍵值結構一致（無漏 key）
2. 新增 `PainPointScenarios.vue` 元件並嵌入首頁
3. 在 zh-TW、zh-CN、en 三個語系下，整段 LUMI 區塊**從 Hero 到 Closing 訊息一致**——每段都圍繞「銀髮族 + 子女付費」TA
4. SEO meta（title / description）與 Schema.org（description / knowsAbout）三語都更新
5. `npm run generate` 成功，三語各頁均無 i18n 缺鍵警告
6. Cloudflare Pages 部署後可 live verify（mobile + desktop）

---

## 10. 風險與後續

- **風險 1**：現有 LUMI 文案中的「最後一哩路」是強記憶點，全面收斂後這個 phrase 將消失。如果 Luke 仍想保留這個敘事鉤，可在 `/lumi` 子頁（若存在）保留。**處理**：本 spec 直接捨棄此 phrase，與 Q1「全面收斂」決策一致。
- **風險 2**：v3 (2028) 從原本「VR 沉浸場域 / 沉浸學習與訓練」改為「沉浸關懷 / 用藥 + 跌倒 + 認知健康」——技術載體（VR）字眼從 roadmap 拿掉，但 schema.knowsAbout 仍保留 "AR / VR 應用"。投資人若追問 "v3 還是 VR 嗎？"，回答：「載體可能包含 VR、AR、智慧屏、IoT 攝像頭——以哪一個對長輩最低門檻為準。」**處理**：roadmap 文案聚焦在用戶價值（守護），技術選擇延後決定。
- **後續 spec 候選**：
  - LUMI 子頁（`/lumi`）獨立深度頁——可放更技術細節（讀螢幕 / 圈位置 / 陪到底）給開發者與企業評估
  - 視覺素材替換（銀髮族母女合照、家庭場景圖）
  - 投資人頁（`/investors`）的 LUMI 段落同步收斂
