# LUMI TA Shift (Elderly + Filial Children) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retarget LUMI's website copy from "generic AI companion" to "AI built for elders and the adult children paying for them" across all three locales, plus add a new pain-scenario component on the homepage.

**Architecture:** This is a copy-and-component change, not a logic change. We update the three i18n JSON files (zh-TW master → zh-CN → en), add one new Vue component (`PainPointScenarios.vue`) for the 8 scenario cards, and wire it into `app/pages/index.vue`. No tests; this project explicitly skips unit tests per CLAUDE.md scope. Verification is manual via `npm run dev` (visual check across 3 locales).

**Tech Stack:** Nuxt 3 (`compatibilityVersion: 4`), Vue 3.5 + TypeScript, `@nuxtjs/i18n` v9, Tailwind CSS, shadcn-vue, `@vueuse/motion`, `@nuxtjs/seo`.

**Spec:** `docs/superpowers/specs/2026-05-06-lumi-ta-shift-elderly-design.md`

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `i18n/locales/zh-TW.json` | Modify | Master copy — all new LUMI strings + schema.org keywords |
| `i18n/locales/zh-CN.json` | Modify | Mirror zh-TW key structure with simplified Chinese |
| `i18n/locales/en.json` | Modify | Mirror zh-TW key structure with English |
| `app/components/home/PainPointScenarios.vue` | Create | Render 8 scenario cards + closing line under PainPointStats |
| `app/pages/index.vue` | Modify | Build `painScenarios` array, render `<PainPointScenarios>` after `<PainPointStats>` |

**Out of scope (do NOT touch):** `nav.*`, `cta.*`, `site.tagline`, `solutions.*`, `partners.*`, `investors.*`, `founders.*`, `RoadmapDualTrack.vue`'s hardcoded `name: 'Studio' / 'Effects'` in `index.vue` line 40-41 (pre-existing issue, defer to future spec).

---

## Task 1: Update zh-TW master locale

**Files:**
- Modify: `i18n/locales/zh-TW.json`

This is the master locale. zh-CN and en will mirror this key structure. The shape change: the `home.lumi.pain` object gains a new nested `scenarios` object (s1-s8 each with `quote` and `cause`) and a new `closing` string. All other keys keep their names, only string values change. `schema.org.knowsAbout` is reordered (additions + one removal).

- [ ] **Step 1.1: Replace the entire `home.lumi` block**

In `i18n/locales/zh-TW.json`, find the block that begins with `"lumi": {` (currently at line 37) and ends at the matching closing brace (line 121, just before `}` that closes `home`). Replace that **entire `lumi` block** (from `"lumi": {` through its closing `}`) with:

```json
    "lumi": {
      "seo": {
        "title": "LUMI · 為了爸媽而生的 AI 同伴",
        "description": "LUMI 陪父母完成每一個螢幕操作，子女不必再接那通電話。Lumi 來自拉丁文 lux，意為光。"
      },
      "hero": {
        "tagline": "Meet LUMI",
        "title": "為了我媽，我們造了她。",
        "desc": "LUMI 將陪世界上 8 億個媽媽，把每一步走完。"
      },
      "stuck": {
        "label": "為什麼是 LUMI",
        "title": "她不是不會用——是不敢問了。",
        "quote": "「我那一晚才意識到——我媽，已經很久沒問過我問題了。」",
        "body_p1": "被拒絕、被打斷、被吼過幾次以後，父母選擇閉嘴。「長按是什麼？」「驗證碼在哪？」「群組接龍怎麼弄？」——他們不是學不會，只是不想再讓孩子覺得自己麻煩。",
        "body_p2": "AI 給得了答案。給不了那雙陪你完成的手。",
        "tagline": "LUMI 在他們螢幕上，輕輕指引每一步——直到事情真的做完。"
      },
      "pain": {
        "title": "這不是個案——每天在世界各地上演",
        "subtitle": "你的爸媽，可能也問過你⋯⋯",
        "i1_stat": "3-5 個",
        "i1_label": "每位銀髮族每天",
        "i1_desc": "遇到的科技操作問題。",
        "i2_stat": "14 億",
        "i2_label": "2030 全球 60+ 銀髮族",
        "i2_desc": "老齡化是不可逆的長期趨勢。",
        "i3_stat": "+25 萬",
        "i3_label": "每天新增銀髮族",
        "i3_desc": "市場每天都在成長。",
        "i4_stat": "USD $240",
        "i4_label": "子女年付費意願",
        "i4_desc": "替父母解決科技問題（家庭客戶）。",
        "scenarios": {
          "s1": { "quote": "我手機怎麼<b>沒鈴聲</b>了？", "cause": "勿擾模式被誤開" },
          "s2": { "quote": "<b>密碼又忘了</b>怎麼辦？", "cause": "每月平均 3 次重設" },
          "s3": { "quote": "群組叫我<b>接龍</b>，怎麼弄？", "cause": "複製格式 + 加自己" },
          "s4": { "quote": "<b>簡訊驗證碼</b>在哪裡？", "cause": "登入卡關最常見" },
          "s5": { "quote": "<b>Wi-Fi</b> 為什麼連不上？", "cause": "忘記重連步驟" },
          "s6": { "quote": "網路<b>掛號</b>掛不到", "cause": "介面太複雜" },
          "s7": { "quote": "他<b>視訊</b>打給我怎麼接？", "cause": "FaceTime / LINE 視訊" },
          "s8": { "quote": "APP 怎麼<b>下載</b>？", "cause": "App Store 流程" }
        },
        "closing": "不是「服務所有 AI 用戶」這種模糊定位——銀髮族 + 子女付費，才是這個時代最被低估的市場。"
      },
      "steps": {
        "title": "LUMI 怎麼陪父母做？",
        "subtitle": "三步，把 AI 從「答案機」變成「同伴」",
        "s1_title": "看到爸媽螢幕上發生什麼",
        "s1_desc": "不需要他們解釋，LUMI 自己看得懂——本機運行，不上傳隱私。",
        "s2_title": "紫光圈出「按這裡」",
        "s2_desc": "不再說「長按」「下拉」這種父母聽不懂的詞——直接圈出該按的位置。",
        "s3_title": "陪到事情真的做完",
        "s3_desc": "不是丟答案，而是一步一步等他們完成——下一次同樣的問題，他們會自己學會。"
      },
      "roadmap": {
        "title": "我們要去哪裡",
        "subtitle": "LUMI 是起點，不是終點。",
        "c_label": "個人產品軌道",
        "c_caption": "從手機螢幕，走進客廳，走進健康守護",
        "b_label": "企業合作軌道",
        "b_caption": "現在已可洽談",
        "v1_year": "2026",
        "v1_tagline": "螢幕陪伴",
        "v1_desc": "今年上線。LUMI 進到爸媽手機，每個 App 操作都有人陪。",
        "v2_year": "2027",
        "v2_tagline": "AR 走進家中",
        "v2_desc": "從手機螢幕走進客廳——眼鏡或智慧屏，陪在他們身邊。",
        "v3_year": "2028",
        "v3_tagline": "沉浸關懷",
        "v3_desc": "用藥提醒、跌倒警示、認知健康訓練——LUMI 不只陪伴，更守護。",
        "v4_name": "LUMI for Business",
        "v4_year": "已開放對話",
        "v4_tagline": "長照、保險、政府數位平權",
        "v4_desc": "預裝授權給長照機構、保險公司、AARP 與政府數位平權專案。",
        "b_cta": "了解企業合作方案"
      },
      "flywheel": {
        "title": "為什麼這會持續成長",
        "subtitle": "三段飛輪——子女付費、銀髮陪伴、健康守護，每一輪都讓下一輪更快。",
        "i1_title": "訂閱黏性",
        "i1_desc": "子女付費 × 父母使用——年流失 < 8%，遠高於工具型 AI 的家庭黏性。",
        "i2_title": "銀髮族行為大模型",
        "i2_desc": "每一次「陪做完」，都在累積全球第一個 60+ 銀髮族操作行為資料庫。",
        "i3_title": "健康守護延伸",
        "i3_desc": "跌倒、用藥、失智早期警示——成為長照保險 B2B 的天然入口。"
      },
      "for_business": {
        "title": "LUMI 也開放給長照、保險、政府",
        "subtitle": "預裝授權、健康守護模組、SDK——AARP、保險公司、長照機構、政府數位平權專案，都能找到 LUMI 的位置。"
      },
      "closing": {
        "title": "我為了我媽，已經開始做了。",
        "subtitle": "跟我們一起，把 LUMI 送到每一位長者手上。"
      }
    }
```

- [ ] **Step 1.2: Replace `schema.org.description` and `schema.org.knowsAbout`**

Find the `schema.org` block in `i18n/locales/zh-TW.json` (currently around lines 140-152). Replace these two fields:

**Before:**
```json
    "org": {
      "description": "Infinity Agentic 旗下產品 LUMI — 第一個陪你完成「最後一哩路」的 AI 同伴；同時開放 LUMI 引擎與生態給企業合作。",
      "knowsAbout": [
        "AI 同伴",
        "人工智慧",
        "人類行為大模型",
        "螢幕陪伴 AI",
        "AR / VR 應用",
        "企業 AI 模組",
        "B2B AI 授權",
        "IP 與品牌"
      ]
    },
```

**After:**
```json
    "org": {
      "description": "Infinity Agentic 旗下產品 LUMI — 為銀髮族與付費子女設計的 AI 陪伴同伴；同時開放健康守護模組與 SDK 給長照、保險、政府。",
      "knowsAbout": [
        "AI 同伴",
        "人工智慧",
        "人類行為大模型",
        "螢幕陪伴 AI",
        "銀髮陪伴 AI",
        "長者數位陪伴",
        "家庭付費 AI",
        "長照科技",
        "健康守護",
        "AR / VR 應用",
        "企業 AI 模組",
        "B2B AI 授權"
      ]
    },
```

Note the changes: `description` rewritten; `knowsAbout` adds 5 new entries (`銀髮陪伴 AI` `長者數位陪伴` `家庭付費 AI` `長照科技` `健康守護`) inserted after `螢幕陪伴 AI`; `IP 與品牌` removed.

- [ ] **Step 1.3: Validate JSON syntax**

Run: `node -e "JSON.parse(require('fs').readFileSync('i18n/locales/zh-TW.json','utf8')); console.log('zh-TW OK')"`
Expected: `zh-TW OK`

If it fails with a parse error, the line number in the error tells you where a missing comma / extra comma / quote mismatch lives. Fix and rerun.

- [ ] **Step 1.4: Commit**

```bash
git add i18n/locales/zh-TW.json
git commit -m "feat(i18n,zh-TW): retarget LUMI copy to elderly + filial children TA"
```

---

## Task 2: Mirror to zh-CN locale

**Files:**
- Modify: `i18n/locales/zh-CN.json`

zh-CN must have the **exact same key structure** as zh-TW (so missing-key fallback never triggers). Use simplified Chinese characters and mainland-Chinese phrasing where the spec calls it out (e.g., "网上挂号" vs "網路掛號").

- [ ] **Step 2.1: Replace the entire `home.lumi` block**

In `i18n/locales/zh-CN.json`, find and replace the entire `lumi` block (same boundary as Task 1) with:

```json
    "lumi": {
      "seo": {
        "title": "LUMI · 为了爸妈而生的 AI 同伴",
        "description": "LUMI 陪父母完成每一个屏幕操作，子女不必再接那通电话。Lumi 来自拉丁文 lux，意为光。"
      },
      "hero": {
        "tagline": "Meet LUMI",
        "title": "为了我妈，我们造了她。",
        "desc": "LUMI 将陪世界上 8 亿位妈妈，把每一步走完。"
      },
      "stuck": {
        "label": "为什么是 LUMI",
        "title": "她不是不会用——是不敢问了。",
        "quote": "「我那一晚才意识到——我妈，已经很久没问过我问题了。」",
        "body_p1": "被拒绝、被打断、被吼过几次以后，父母选择闭嘴。「长按是什么？」「验证码在哪？」「群里发接龙怎么弄？」——他们不是学不会，只是不想再让孩子觉得自己麻烦。",
        "body_p2": "AI 给得了答案。给不了那双陪你完成的手。",
        "tagline": "LUMI 在他们屏幕上，轻轻指引每一步——直到事情真的做完。"
      },
      "pain": {
        "title": "这不是个案——每天都在世界各地上演",
        "subtitle": "你的爸妈，可能也问过你⋯⋯",
        "i1_stat": "3-5 个",
        "i1_label": "每位银发族每天",
        "i1_desc": "遇到的科技操作问题。",
        "i2_stat": "14 亿",
        "i2_label": "2030 全球 60+ 银发族",
        "i2_desc": "老龄化是不可逆的长期趋势。",
        "i3_stat": "+25 万",
        "i3_label": "每天新增银发族",
        "i3_desc": "市场每天都在成长。",
        "i4_stat": "USD $240",
        "i4_label": "子女年付费意愿",
        "i4_desc": "替父母解决科技问题（家庭客户）。",
        "scenarios": {
          "s1": { "quote": "我手机怎么<b>没铃声</b>了？", "cause": "勿扰模式被误开" },
          "s2": { "quote": "<b>密码又忘了</b>怎么办？", "cause": "每月平均 3 次重设" },
          "s3": { "quote": "群里发<b>接龙</b>，怎么弄？", "cause": "复制格式 + 加自己" },
          "s4": { "quote": "<b>短信验证码</b>在哪里？", "cause": "登录卡关最常见" },
          "s5": { "quote": "<b>Wi-Fi</b> 为什么连不上？", "cause": "忘记重连步骤" },
          "s6": { "quote": "网上<b>挂号</b>抢不到", "cause": "界面太复杂" },
          "s7": { "quote": "他<b>视频</b>打给我怎么接？", "cause": "微信 / 视频通话" },
          "s8": { "quote": "APP 怎么<b>下载</b>？", "cause": "应用商店流程" }
        },
        "closing": "不是「服务所有 AI 用户」这种模糊定位——银发族 + 子女付费，才是这个时代最被低估的市场。"
      },
      "steps": {
        "title": "LUMI 怎么陪父母做？",
        "subtitle": "三步，把 AI 从「答案机」变成「同伴」",
        "s1_title": "看到爸妈屏幕上发生什么",
        "s1_desc": "不需要他们解释，LUMI 自己看得懂——本机运行，不上传隐私。",
        "s2_title": "紫光圈出「按这里」",
        "s2_desc": "不再说「长按」「下拉」这种父母听不懂的词——直接圈出该按的位置。",
        "s3_title": "陪到事情真的做完",
        "s3_desc": "不是丢答案，而是一步一步等他们完成——下一次同样的问题，他们会自己学会。"
      },
      "roadmap": {
        "title": "我们要去哪里",
        "subtitle": "LUMI 是起点，不是终点。",
        "c_label": "个人产品轨道",
        "c_caption": "从手机屏幕，走进客厅，走进健康守护",
        "b_label": "企业合作轨道",
        "b_caption": "现在已可洽谈",
        "v1_year": "2026",
        "v1_tagline": "屏幕陪伴",
        "v1_desc": "今年上线。LUMI 进到爸妈手机，每个 App 操作都有人陪。",
        "v2_year": "2027",
        "v2_tagline": "AR 走进家中",
        "v2_desc": "从手机屏幕走进客厅——眼镜或智慧屏，陪在他们身边。",
        "v3_year": "2028",
        "v3_tagline": "沉浸关怀",
        "v3_desc": "用药提醒、跌倒警示、认知健康训练——LUMI 不只陪伴，更守护。",
        "v4_name": "LUMI for Business",
        "v4_year": "已开放对话",
        "v4_tagline": "长照、保险、政府数字平权",
        "v4_desc": "预装授权给长照机构、保险公司、AARP 与政府数字平权专案。",
        "b_cta": "了解企业合作方案"
      },
      "flywheel": {
        "title": "为什么这会持续成长",
        "subtitle": "三段飞轮——子女付费、银发陪伴、健康守护，每一轮都让下一轮更快。",
        "i1_title": "订阅黏性",
        "i1_desc": "子女付费 × 父母使用——年流失 < 8%，远高于工具型 AI 的家庭黏性。",
        "i2_title": "银发族行为大模型",
        "i2_desc": "每一次「陪做完」，都在累积全球第一个 60+ 银发族操作行为资料库。",
        "i3_title": "健康守护延伸",
        "i3_desc": "跌倒、用药、失智早期警示——成为长照保险 B2B 的天然入口。"
      },
      "for_business": {
        "title": "LUMI 也开放给长照、保险、政府",
        "subtitle": "预装授权、健康守护模组、SDK——AARP、保险公司、长照机构、政府数字平权专案，都能找到 LUMI 的位置。"
      },
      "closing": {
        "title": "我为了我妈，已经开始做了。",
        "subtitle": "跟我们一起，把 LUMI 送到每一位长者手上。"
      }
    }
```

- [ ] **Step 2.2: Replace `schema.org.description` and `schema.org.knowsAbout`**

In `i18n/locales/zh-CN.json`, find the `schema.org` block. Replace `description` and `knowsAbout`:

```json
    "org": {
      "description": "Infinity Agentic 旗下产品 LUMI — 为银发族与付费子女设计的 AI 陪伴同伴；同时开放健康守护模组与 SDK 给长照、保险、政府。",
      "knowsAbout": [
        "AI 同伴",
        "人工智能",
        "人类行为大模型",
        "屏幕陪伴 AI",
        "银发陪伴 AI",
        "长者数字陪伴",
        "家庭付费 AI",
        "长照科技",
        "健康守护",
        "AR / VR 应用",
        "企业 AI 模组",
        "B2B AI 授权"
      ]
    },
```

- [ ] **Step 2.3: Validate JSON syntax**

Run: `node -e "JSON.parse(require('fs').readFileSync('i18n/locales/zh-CN.json','utf8')); console.log('zh-CN OK')"`
Expected: `zh-CN OK`

- [ ] **Step 2.4: Commit**

```bash
git add i18n/locales/zh-CN.json
git commit -m "feat(i18n,zh-CN): mirror LUMI elderly TA copy in simplified Chinese"
```

---

## Task 3: Mirror to en locale

**Files:**
- Modify: `i18n/locales/en.json`

English version preserves the emotional punch of the angel pitch ("I built her for my mom" / "She isn't unable to use it. She's afraid to ask.").

- [ ] **Step 3.1: Replace the entire `home.lumi` block**

In `i18n/locales/en.json`, find and replace the entire `lumi` block with:

```json
    "lumi": {
      "seo": {
        "title": "LUMI · The AI companion built for parents",
        "description": "LUMI walks parents through every screen step — so adult children don't have to take that call. Lumi (Latin: lux, light), by Infinity Agentic."
      },
      "hero": {
        "tagline": "Meet LUMI",
        "title": "I built her for my mom.",
        "desc": "LUMI is going to walk 800 million mothers through every step."
      },
      "stuck": {
        "label": "Why LUMI",
        "title": "She isn't unable to use it. She's afraid to ask.",
        "quote": "“That night I realized — my mom hasn't asked me a question in a long, long time.”",
        "body_p1": "After being brushed off, cut off, or yelled at a few times, parents stop asking. “What does long-press mean?” “Where's the verification code?” “How do I do a group chain message?” — they aren't slow. They just don't want to feel like a burden anymore.",
        "body_p2": "AI can give them the answer. It can't give them the hand that walks them through.",
        "tagline": "LUMI sits on their screen — gently pointing to every next step, until the thing actually gets done."
      },
      "pain": {
        "title": "This isn't isolated — it's happening every day, all over the world.",
        "subtitle": "Your parents have probably asked you...",
        "i1_stat": "3-5",
        "i1_label": "per-day, per-elder",
        "i1_desc": "tech operation problems they hit.",
        "i2_stat": "1.4B",
        "i2_label": "global 60+ population by 2030",
        "i2_desc": "Aging is the irreversible mega-trend.",
        "i3_stat": "+250K",
        "i3_label": "new elders every day",
        "i3_desc": "The market grows while you sleep.",
        "i4_stat": "USD $240",
        "i4_label": "yearly willingness-to-pay",
        "i4_desc": "Adult children, paying to solve their parents' tech problems.",
        "scenarios": {
          "s1": { "quote": "“Why is my phone <b>silent</b>?”", "cause": "Do-not-disturb left on" },
          "s2": { "quote": "“I <b>forgot the password</b> again.”", "cause": "3× resets / month avg." },
          "s3": { "quote": "“The group wants a <b>chain message</b> — how?”", "cause": "Copy format + add your name" },
          "s4": { "quote": "“Where's the <b>SMS verification code</b>?”", "cause": "#1 sign-in blocker" },
          "s5": { "quote": "“Why won't <b>Wi-Fi</b> connect?”", "cause": "Reconnect steps forgotten" },
          "s6": { "quote": "“I can't <b>book the doctor's slot</b>.”", "cause": "UI is too complex" },
          "s7": { "quote": "“He's calling me on <b>video</b> — how do I answer?”", "cause": "FaceTime / LINE video" },
          "s8": { "quote": "“How do I <b>download an app</b>?”", "cause": "App Store flow" }
        },
        "closing": "Not “AI for everyone” — but elders + adult children paying for them is the most underestimated market of this decade."
      },
      "steps": {
        "title": "How LUMI walks parents through",
        "subtitle": "Three steps that turn AI from an answer-machine into a companion.",
        "s1_title": "It sees what's on Mom's screen",
        "s1_desc": "They don't have to explain. LUMI reads the moment — runs on-device, no privacy leak.",
        "s2_title": "Purple light circles \"tap here\"",
        "s2_desc": "No more \"long-press\" or \"swipe down\" — words parents don't know. LUMI just shows where to tap.",
        "s3_title": "Stays till the thing is actually done",
        "s3_desc": "Not a one-shot answer. A walk-through, step by step — and next time, they'll do it themselves."
      },
      "roadmap": {
        "title": "Where we're going",
        "subtitle": "LUMI is the start, not the end.",
        "c_label": "Consumer track",
        "c_caption": "From the phone screen, into the living room, into health care",
        "b_label": "Business track",
        "b_caption": "Open for conversation now.",
        "v1_year": "2026",
        "v1_tagline": "On-screen companion",
        "v1_desc": "Shipping this year. LUMI on Mom's phone — every app step, with company.",
        "v2_year": "2027",
        "v2_tagline": "AR — into the home",
        "v2_desc": "From the screen into the living room — glasses or a smart display, right there with them.",
        "v3_year": "2028",
        "v3_tagline": "Immersive care",
        "v3_desc": "Medication reminders, fall alerts, cognitive-health training — not just companion, but guardian.",
        "v4_name": "LUMI for Business",
        "v4_year": "Open for conversation",
        "v4_tagline": "Eldercare, insurance, government",
        "v4_desc": "License the LUMI engine to eldercare, insurers, AARP, and digital-equity programs.",
        "b_cta": "Talk to us about business"
      },
      "flywheel": {
        "title": "Why this keeps compounding",
        "subtitle": "A three-part flywheel — children pay, parents use, health care extends. Each loop accelerates the next.",
        "i1_title": "Subscription stickiness",
        "i1_desc": "Children pay × parents use — < 8% annual churn, far above tool-type AI.",
        "i2_title": "60+ behavior model",
        "i2_desc": "Every walked-through task builds the world's first dataset of how seniors actually use technology.",
        "i3_title": "Health-care extension",
        "i3_desc": "Falls, medication, early dementia signals — natural entry point for eldercare and insurance B2B."
      },
      "for_business": {
        "title": "We're open to eldercare, insurance, and government too",
        "subtitle": "Preinstall licenses, health-guardian modules, SDK — AARP, insurers, eldercare facilities, digital-equity programs. There's a place for LUMI in your stack."
      },
      "closing": {
        "title": "I started this — for my mom.",
        "subtitle": "Walk with us — to every elder's hand, across Asia-Pacific."
      }
    }
```

- [ ] **Step 3.2: Replace `schema.org.description` and `schema.org.knowsAbout`**

```json
    "org": {
      "description": "LUMI by Infinity Agentic — an AI companion built for elders and the adult children who pay for them; health-guardian module and SDK open to eldercare, insurance, and government partners.",
      "knowsAbout": [
        "AI companion",
        "Artificial intelligence",
        "Human behavior model",
        "On-screen AI companion",
        "Elder companion AI",
        "Senior digital companionship",
        "Family-paid AI",
        "Eldercare technology",
        "Health guardian",
        "AR / VR applications",
        "Enterprise AI modules",
        "B2B AI licensing"
      ]
    },
```

- [ ] **Step 3.3: Validate JSON syntax**

Run: `node -e "JSON.parse(require('fs').readFileSync('i18n/locales/en.json','utf8')); console.log('en OK')"`
Expected: `en OK`

- [ ] **Step 3.4: Commit**

```bash
git add i18n/locales/en.json
git commit -m "feat(i18n,en): mirror LUMI elderly TA copy in English"
```

---

## Task 4: Create `PainPointScenarios.vue` component

**Files:**
- Create: `app/components/home/PainPointScenarios.vue`

This component renders 8 scenario cards in a responsive grid (4 col desktop / 2 col tablet / 1 col mobile), each with a `quote` (allowing inline `<b>` HTML) + a `cause` small note, followed by a centered `closing` line.

The styling reuses existing tokens: `glass-card` class (already used by `PainPointStats.vue`), `text-fg-primary` / `text-fg-secondary` for text, accent color for the bold parts. Animations use `FadeInUp` (already used by `PainPointStats.vue`, line 34).

- [ ] **Step 4.1: Create the component file**

Create `app/components/home/PainPointScenarios.vue` with this content:

```vue
<script setup lang="ts">
type Scenario = { quote: string; cause: string }

defineProps<{
  scenarios: Scenario[]
  closing: string
}>()
</script>

<template>
  <section class="pb-20 lg:pb-28 -mt-8 lg:-mt-12">
    <div class="container-tight">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        <FadeInUp
          v-for="(s, i) in scenarios"
          :key="i"
          :delay="i * 80"
        >
          <div class="glass-card p-5 lg:p-6 h-full flex flex-col gap-3 hover:border-lumi-purple/50 transition-colors">
            <p
              class="text-fg-primary text-sm md:text-base leading-relaxed"
              v-html="s.quote"
            />
            <p class="text-xs text-fg-muted tracking-wide mt-auto">
              {{ s.cause }}
            </p>
          </div>
        </FadeInUp>
      </div>

      <p
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
        class="text-center text-fg-secondary text-base md:text-lg max-w-3xl mx-auto mt-12 lg:mt-14 leading-relaxed"
      >
        {{ closing }}
      </p>
    </div>
  </section>
</template>

<style scoped>
:deep(b) {
  color: hsl(var(--accent-bright, 199 89% 48%));
  font-weight: 600;
}
</style>
```

**Notes on the markup:**
- `v-html="s.quote"` is **safe here** because the quote strings are static i18n values controlled by us — they contain only `<b>` tags. Do not extend this pattern to user-provided strings.
- `text-fg-muted` is the existing token for de-emphasized small text; if your project doesn't have it, use `text-fg-secondary opacity-60` instead. Check `tailwind.config.ts` for the actual token name if `text-fg-muted` isn't defined.
- `<style scoped>` overrides `<b>` color so the bold accent is visible inside the v-html.
- Section uses `pb-20 lg:pb-28` only (no `pt-*`) because it sits directly under `PainPointStats` which already provides top padding — keeps the two sections visually unified.

- [ ] **Step 4.2: Verify dev server picks up the new component**

Start the dev server: `npm run dev`
Wait for the URL to appear (usually `http://localhost:3000/`).
Check the terminal — there should be no Vue compile errors mentioning `PainPointScenarios.vue`.
Stop the dev server (Ctrl+C) for now; we'll wire it in Task 5 and verify visually then.

If the terminal shows `text-fg-muted` is unknown to Tailwind, swap to `text-fg-secondary opacity-60` in the template and rerun.

- [ ] **Step 4.3: Commit**

```bash
git add app/components/home/PainPointScenarios.vue
git commit -m "feat(home): add PainPointScenarios card grid component"
```

---

## Task 5: Wire `PainPointScenarios` into `app/pages/index.vue`

**Files:**
- Modify: `app/pages/index.vue`

Two changes: build a `painScenarios` array from i18n keys, and render `<PainPointScenarios>` immediately after `<PainPointStats>`.

- [ ] **Step 5.1: Add `painScenarios` computed array**

In `app/pages/index.vue`, locate the `painPoints` computed (currently lines 25-30). **Immediately after** that closing `])`, insert:

```ts
const painScenarios = computed(() =>
  (['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8'] as const).map((k) => ({
    quote: t(`home.lumi.pain.scenarios.${k}.quote`),
    cause: t(`home.lumi.pain.scenarios.${k}.cause`),
  })),
)
```

- [ ] **Step 5.2: Render `<PainPointScenarios>` after `<PainPointStats>`**

In the `<template>` of `app/pages/index.vue`, locate the existing `<PainPointStats>` block (currently lines 83-87):

```vue
    <!-- 3. Pain point stats -->
    <PainPointStats
      :title="t('home.lumi.pain.title')"
      :subtitle="t('home.lumi.pain.subtitle')"
      :items="painPoints"
    />
```

**Immediately after** the closing `/>` of `<PainPointStats />`, add:

```vue

    <!-- 3.5. Pain scenarios — 8 daily-tech moments parents have asked -->
    <PainPointScenarios
      :scenarios="painScenarios"
      :closing="t('home.lumi.pain.closing')"
    />
```

**Note:** `PainPointStats` already renders `pain.subtitle` ("你的爸媽，可能也問過你⋯⋯") at the top of the pain section, which functions as intro for both the 4 stats AND the 8 scenario cards below — so `PainPointScenarios` doesn't need its own subtitle. The negative top margin (`-mt-8 lg:-mt-12`) tightens vertical rhythm so the 8 cards visually flow from the 4 stats above.

- [ ] **Step 5.3: Visual verification across all three locales**

Start the dev server: `npm run dev`
Open in browser:
1. `http://localhost:3000/` (defaults to zh-TW)
2. `http://localhost:3000/zh-CN/`
3. `http://localhost:3000/en/`

For each URL, confirm:
- Hero shows the new title (zh-TW: 「為了我媽，我們造了她。」 / zh-CN: 「为了我妈，我们造了她。」 / en: "I built her for my mom.")
- Pain section shows 4 stats (3-5 / 14 億 / +25 萬 / USD $240) **and** the new 8 scenario cards underneath
- Bold (`<b>`) parts in the scenario cards render in accent color (cyan/purple), not as literal `<b>` text
- Closing CTA shows the new title ("我為了我媽，已經開始做了。" / "I started this — for my mom.")
- Browser DevTools console shows no errors and no `[intlify]` missing-key warnings

If a missing-key warning appears (e.g., `[intlify] Not found 'home.lumi.pain.scenarios.s1.quote' key`), it means that locale's JSON is missing that key — go fix the JSON.

If `<b>` renders literally as `&lt;b&gt;` text instead of bold styled text, the `v-html` directive isn't applying — verify Step 4.1 used `v-html="s.quote"` (not `:innerHTML` or `{{ s.quote }}`).

Stop the dev server (Ctrl+C).

- [ ] **Step 5.4: Static build verification**

Run the production build:

```bash
npm run generate
```

Expected: Build completes with no errors. Generates `.output/public/` with 24 pages (8 routes × 3 locales). The output should mention `Generated public .output/public` near the end.

If the build fails, the error will reference a file and line — fix and rerun.

- [ ] **Step 5.5: Commit**

```bash
git add app/pages/index.vue
git commit -m "feat(home): wire PainPointScenarios into index, render 8 elder scenarios"
```

---

## Task 6: Final review + spec sync

**Files:** None modified.

This task validates the work matches the spec acceptance criteria (§9 of the spec) and updates the spec status from Draft to Implemented.

- [ ] **Step 6.1: Run the spec acceptance checklist**

Walk through `docs/superpowers/specs/2026-05-06-lumi-ta-shift-elderly-design.md` §9 and confirm each item:

1. Three-language i18n updated — open all three JSON files, search for `為了我媽` / `为了我妈` / `built her for my mom` to confirm new copy is in each.
2. `PainPointScenarios.vue` exists at `app/components/home/PainPointScenarios.vue`.
3. Visit `/`, `/zh-CN/`, `/en/` in browser; confirm Hero → Stuck → Pain stats → Pain scenarios → Steps → Roadmap → Flywheel → ForBusiness → Closing all carry the new TA narrative consistently.
4. View page source on `/` and confirm `<title>` is the new SEO title; confirm `<script type="application/ld+json">` block contains the new Schema.org description and `knowsAbout` array.
5. `npm run generate` succeeded in Task 5 Step 5.4.
6. Cloudflare Pages deploy is **out of scope for this plan** — it's a separate user action (`npx wrangler deploy`). Note: do not run wrangler deploy automatically; let the user trigger it.

- [ ] **Step 6.2: Update spec status**

Edit `docs/superpowers/specs/2026-05-06-lumi-ta-shift-elderly-design.md` line 4:

**Before:**
```
**狀態**：Draft（待 user review）
```

**After:**
```
**狀態**：Implemented（2026-05-06）
```

- [ ] **Step 6.3: Final commit**

```bash
git add docs/superpowers/specs/2026-05-06-lumi-ta-shift-elderly-design.md
git commit -m "docs(spec): mark LUMI TA shift spec as implemented"
```

- [ ] **Step 6.4: Report to user**

Tell the user:
- All three locales updated; new component wired; build verified
- Last branch state: 6 commits added (`feat(i18n,zh-TW)` / `feat(i18n,zh-CN)` / `feat(i18n,en)` / `feat(home): add PainPointScenarios` / `feat(home): wire PainPointScenarios` / `docs(spec): mark implemented`)
- Deploy step (`npx wrangler deploy`) is **not** auto-run; user decides when to ship

---

## Verification checklist (run before declaring done)

- [ ] All three JSON files parse with `node -e "JSON.parse(...)"`
- [ ] `npm run dev` shows new copy on zh-TW, zh-CN, en home pages
- [ ] Browser DevTools console: zero `[intlify]` missing-key warnings on home page
- [ ] `<b>` inside scenario quotes renders styled (not literal text)
- [ ] `npm run generate` succeeds end-to-end
- [ ] Spec §9 acceptance criteria all check out
- [ ] Spec status updated to Implemented + committed
