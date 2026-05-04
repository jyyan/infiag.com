type Locale = 'zh-TW' | 'zh-CN' | 'en'
type L = Record<Locale, string>
type LArr = Record<Locale, string[]>

export interface Founder {
  id: string
  photo: string
  photoPosition?: string
  english: string
  chinese: L
  role: string
  title: L
  slogan: L
  highlights: LArr
  specialties: LArr
  link: string
}

const FOUNDERS_RAW: Founder[] = [
  {
    id: 'jeff',
    photo: '/img/jeff/jeff.jpg',
    english: 'Jeff',
    chinese: { 'zh-TW': '陳則夫', 'zh-CN': '陈则夫', en: 'Chen Tserfu' },
    role: 'CEO',
    title: {
      'zh-TW': '共同創辦人 · 投資與資源策略',
      'zh-CN': '联合创始人 · 投资与资源策略',
      en: 'Co-founder · Investment & Resources',
    },
    slogan: {
      'zh-TW': '以不動產為根基，以娛樂為視野，以慈善為靈魂。',
      'zh-CN': '以不动产为根基，以娱乐为视野，以慈善为灵魂。',
      en: 'Real estate as foundation, entertainment as vision, philanthropy as soul.',
    },
    highlights: {
      'zh-TW': [
        '跨六大市場的連續投資人；東京、白馬滑雪場不動產組合。',
        '投資好萊塢 A 級製作與台灣 IP 孵化（《咒》、《民雄鬼屋》）。',
        'VFX 公司投資人（《阿凡達 2》、《權力遊戲》視效合作）。',
      ],
      'zh-CN': [
        '跨六大市场的连续投资人；东京、白马滑雪场不动产组合。',
        '投资好莱坞 A 级制作与台湾 IP 孵化（《咒》、《民雄鬼屋》）。',
        'VFX 公司投资人（《阿凡达 2》、《权力的游戏》视效合作）。',
      ],
      en: [
        'Serial investor across six markets — Tokyo & Hakuba real-estate portfolio.',
        'Backs Hollywood A-list productions and Taiwan IP incubation.',
        'VFX investor with credits across Avatar 2 and Game of Thrones.',
      ],
    },
    specialties: {
      'zh-TW': ['不動產投資', '影視娛樂', '視覺特效', '跨國資源整合', '慈善公益'],
      'zh-CN': ['不动产投资', '影视娱乐', '视觉特效', '跨国资源整合', '慈善公益'],
      en: ['Real Estate', 'Film & Entertainment', 'VFX', 'Cross-border Resources', 'Philanthropy'],
    },
    link: 'https://chen-tserfu.netlify.app/',
  },
  {
    id: 'luke',
    photo: '/img/luke/luke.jpg',
    photoPosition: 'left center',
    english: 'Luke',
    chinese: { 'zh-TW': '顏浚原', 'zh-CN': '颜浚原', en: 'Yan Junyuan' },
    role: 'COO',
    title: {
      'zh-TW': '共同創辦人 · 營運與技術',
      'zh-CN': '联合创始人 · 运营与技术',
      en: 'Co-founder · Operations & Technology',
    },
    slogan: {
      'zh-TW': '好的系統，必須兼具速度、耐力與靜定。',
      'zh-CN': '好的系统，必须兼具速度、耐力与静定。',
      en: 'Great systems balance speed, endurance, and stillness.',
    },
    highlights: {
      'zh-TW': [
        '20+ 年系統開發與 IT 顧問經驗，服務 100+ 台日中小企業。',
        'IEEE IS3C 2020 共同作者；2021 Intel DevCup × OpenVINO 決賽入圍。',
        'Procurement OS 為連鎖體系降低 80%+ 採購人力成本。',
      ],
      'zh-CN': [
        '20+ 年系统开发与 IT 顾问经验，服务 100+ 台日中小企业。',
        'IEEE IS3C 2020 共同作者；2021 Intel DevCup × OpenVINO 决赛入围。',
        'Procurement OS 为连锁体系降低 80%+ 采购人力成本。',
      ],
      en: [
        '20+ years in systems engineering and IT consulting; 100+ SME clients in TW & JP.',
        'IEEE IS3C 2020 co-author; finalist of Intel DevCup × OpenVINO 2021.',
        'Procurement OS cut 80%+ of procurement labour costs for a franchise chain.',
      ],
    },
    specialties: {
      'zh-TW': ['全端開發', 'ERP / MRP 客製', 'AI 整合', '雲原生部署', '開源貢獻'],
      'zh-CN': ['全栈开发', 'ERP / MRP 定制', 'AI 集成', '云原生部署', '开源贡献'],
      en: ['Full-stack', 'Custom ERP / MRP', 'AI Integration', 'Cloud-native', 'Open Source'],
    },
    link: 'https://bse91.jyyan.info/luke.html',
  },
  {
    id: 'min',
    photo: '/img/min/min.jpg',
    english: 'Min',
    chinese: { 'zh-TW': '孫敏', 'zh-CN': '孙敏', en: 'Sun Min' },
    role: 'CFO',
    title: {
      'zh-TW': '共同創辦人 · 財務與資本',
      'zh-CN': '联合创始人 · 财务与资本',
      en: 'Co-founder · Finance & Capital',
    },
    slogan: {
      'zh-TW': '用專業經驗、穩健思路，與你穿越每一段週期。',
      'zh-CN': '用专业经验、稳健思路，与你穿越每一段周期。',
      en: 'Steady professional planning across every market cycle.',
    },
    highlights: {
      'zh-TW': [
        '10+ 年資本市場經驗，歷經牛熊週期由業務專員晉升投資經理。',
        '多次獲評年度優秀投資顧問與客戶服務之星。',
        '證券、基金雙執照；五年績效年化 10%+ 跑贏指標。',
      ],
      'zh-CN': [
        '10+ 年资本市场经验，历经牛熊周期由业务专员晋升投资经理。',
        '多次获评年度优秀投资顾问与客户服务之星。',
        '证券、基金双执照；五年业绩年化 10%+ 跑赢指标。',
      ],
      en: [
        '10+ years in capital markets, climbing from analyst to investment manager.',
        'Multi-year top advisor & client-service award recipient.',
        'Dual securities & fund licenses; 5-yr annualised return 10%+ above benchmark.',
      ],
    },
    specialties: {
      'zh-TW': ['資產配置', '基金定投', '股票規劃', '多資產組合', '財富保值'],
      'zh-CN': ['资产配置', '基金定投', '股票规划', '多资产组合', '财富保值'],
      en: ['Asset Allocation', 'Fund SIP', 'Equity Planning', 'Multi-asset', 'Wealth Preservation'],
    },
    link: 'https://bse91.jyyan.info/min.html',
  },
  {
    id: 'yangzhixian',
    photo: '/img/yangzhixian/yangzhixian.jpg',
    english: 'Yang',
    chinese: { 'zh-TW': '楊智先', 'zh-CN': '杨智先', en: 'Yang Zhixian' },
    role: 'MD',
    title: {
      'zh-TW': '共同創辦人 · 品牌與市場',
      'zh-CN': '联合创始人 · 品牌与市场',
      en: 'Co-founder · Brand & Market',
    },
    slogan: {
      'zh-TW': '辭職下海，是為了找到真正屬於自己的賽場。',
      'zh-CN': '辞职下海，是为了找到真正属于自己的赛场。',
      en: 'Leaving the safe lane to find a true arena.',
    },
    highlights: {
      'zh-TW': [
        'FANGSHI · YIJNG 眼鏡品牌主理人，年產值由 800 萬突破 7,000 萬。',
        '15 年眼鏡品牌規劃與營運經驗，曾任職業運動員與體育教師。',
        '與 A 股博士眼鏡、國資吳良才 / 茂昌深度合作。',
      ],
      'zh-CN': [
        'FANGSHI · YIJNG 眼镜品牌主理人，年产值由 800 万突破 7,000 万。',
        '15 年眼镜品牌规划与运营经验，曾任职业运动员与体育教师。',
        '与 A 股博士眼镜、国资吴良才 / 茂昌深度合作。',
      ],
      en: [
        'Founder of FANGSHI · YIJNG eyewear — grew annual revenue from 8M to 70M+ RMB.',
        '15 years in eyewear brand strategy; former pro athlete & PE teacher.',
        'Strategic partnerships with A-share Dr. Glasses and Wu Liangcai · Maochang.',
      ],
    },
    specialties: {
      'zh-TW': ['品牌策略', '產品研發品控', '市場定位', 'CNAS 實驗室管理', '全鏈路建構'],
      'zh-CN': ['品牌策略', '产品研发品控', '市场定位', 'CNAS 实验室管理', '全链路建构'],
      en: ['Brand Strategy', 'R&D / QC', 'Market Positioning', 'CNAS Lab Ops', 'Full-chain Build'],
    },
    link: 'https://bse91.jyyan.info/yangzhixian.html',
  },
  {
    id: 'michele',
    photo: '/img/michele/michele.png',
    english: 'Michele',
    chinese: { 'zh-TW': '江小玲', 'zh-CN': '江小玲', en: 'Jiang Xiaoling' },
    role: 'SD',
    title: {
      'zh-TW': '共同創辦人 · 策略與夥伴關係',
      'zh-CN': '联合创始人 · 战略与伙伴关系',
      en: 'Co-founder · Strategy & Partnerships',
    },
    slogan: {
      'zh-TW': '用真心、釀真酒、交真朋友。',
      'zh-CN': '用真心、酿真酒、交真朋友。',
      en: 'Real heart, real wine, real friendship.',
    },
    highlights: {
      'zh-TW': [
        '法國 Château Payreste 普瑞斯酒莊莊主、上海玖耳酒文化董事長。',
        '22 年葡萄酒產業，品酒 30,000+ 瓶；國際葡萄酒挑戰賽評委。',
        'WSET Level 3、國家級二星侍酒師；服務 43 家 Fortune 500 企業。',
      ],
      'zh-CN': [
        '法国 Château Payreste 普瑞斯酒庄庄主、上海玖耳酒文化董事长。',
        '22 年葡萄酒产业，品酒 30,000+ 瓶；国际葡萄酒挑战赛评委。',
        'WSET Level 3、国家级二星侍酒师；服务 43 家 Fortune 500 企业。',
      ],
      en: [
        'Owner of Château Payreste (France) & Chairwoman of Shanghai JiuEr Wine Culture.',
        '22 years in the wine industry; tasted 30,000+ bottles; international wine judge.',
        'WSET L3 & national 2-star sommelier; serves 43 Fortune 500 corporate clients.',
      ],
    },
    specialties: {
      'zh-TW': ['波爾多右岸', '選酒教育', '餐酒搭配', '風土分析', '葡萄酒文化'],
      'zh-CN': ['波尔多右岸', '选酒教育', '餐酒搭配', '风土分析', '葡萄酒文化'],
      en: ['Bordeaux Right Bank', 'Wine Curation', 'Food Pairing', 'Terroir Analysis', 'Wine Culture'],
    },
    link: 'https://bse91.jyyan.info/michele.html',
  },
  {
    id: 'elvis',
    photo: '/img/elvis/elvis.jpg',
    photoPosition: 'center 50%',
    english: 'Elvis',
    chinese: { 'zh-TW': '李林軒', 'zh-CN': '李林轩', en: 'Lee Linxuan' },
    role: 'HDR',
    title: {
      'zh-TW': '共同創辦人 · 人才與業務發展',
      'zh-CN': '联合创始人 · 人才与业务发展',
      en: 'Co-founder · Talent & Business Development',
    },
    slogan: {
      'zh-TW': '美業不只是感性體驗，更應是理性結果。',
      'zh-CN': '美业不只是感性体验，更应是理性结果。',
      en: 'Beauty is not just feeling — it should be a measured outcome.',
    },
    highlights: {
      'zh-TW': [
        'Caring Skin 執行董事；曾任上市食品集團執行董事，主導跨境拓展。',
        '品牌重構後連續五年 50% 複合增長，奠定新加坡敏感肌領導品牌地位。',
        '獲頒「年度傑出企業家獎」；旗下品牌獲「中小企業品牌獎」。',
      ],
      'zh-CN': [
        'Caring Skin 执行董事；曾任上市食品集团执行董事，主导跨境拓展。',
        '品牌重构后连续五年 50% 复合增长，奠定新加坡敏感肌领导品牌地位。',
        '获颁「年度杰出企业家奖」；旗下品牌获「中小企业品牌奖」。',
      ],
      en: [
        'Managing Director of Caring Skin; former Executive Director of a listed F&B group.',
        'Drove five consecutive years of 50% CAGR; #1 sensitive-skin brand in Singapore.',
        'Recipient of Outstanding Entrepreneur Award; brand won SME Brand Award.',
      ],
    },
    specialties: {
      'zh-TW': ['資本思維', '精實管理', '客戶終身價值', '跨境拓展', '組織治理'],
      'zh-CN': ['资本思维', '精实管理', '客户终身价值', '跨境拓展', '组织治理'],
      en: ['Capital Thinking', 'Lean Management', 'Customer LTV', 'Cross-border Growth', 'Governance'],
    },
    link: 'https://bse91.jyyan.info/elvis.html',
  },
]

export interface FounderView {
  id: string
  photo: string
  photoPosition: string
  english: string
  chinese: string
  role: string
  title: string
  slogan: string
  highlights: string[]
  specialties: string[]
  link: string
}

export function useFounders() {
  const { locale } = useI18n()

  const founders = computed<FounderView[]>(() => {
    const lc = (locale.value as Locale) ?? 'zh-TW'
    return FOUNDERS_RAW.map(f => ({
      id: f.id,
      photo: f.photo,
      photoPosition: f.photoPosition ?? 'center top',
      english: f.english,
      chinese: f.chinese[lc] ?? f.chinese['zh-TW'],
      role: f.role,
      title: f.title[lc] ?? f.title['zh-TW'],
      slogan: f.slogan[lc] ?? f.slogan['zh-TW'],
      highlights: f.highlights[lc] ?? f.highlights['zh-TW'],
      specialties: f.specialties[lc] ?? f.specialties['zh-TW'],
      link: f.link,
    }))
  })

  return { founders }
}
