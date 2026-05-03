export interface MailtoOptions {
  subject?: string
  body?: string
  cc?: string
  bcc?: string
}

const CONTACT_EMAIL = 'jeff@infiag.com'

export function useMailto() {
  function buildMailto(options: MailtoOptions = {}): string {
    const params = new URLSearchParams()
    if (options.subject) params.set('subject', options.subject)
    if (options.body) params.set('body', options.body)
    if (options.cc) params.set('cc', options.cc)
    if (options.bcc) params.set('bcc', options.bcc)
    const qs = params.toString()
    return `mailto:${CONTACT_EMAIL}${qs ? '?' + qs : ''}`
  }

  return {
    contactEmail: CONTACT_EMAIL,
    buildMailto,
    /** Common preset: alliance enquiry */
    alliance: (locale: string) => buildMailto({
      subject: locale === 'en' ? 'Strategic Alliance Enquiry' : '策略合作意向',
      body: locale === 'en'
        ? 'Hello Infinity Agentic team,\n\nWe are interested in forming a strategic alliance.\n\nCompany:\nName:\nRole:\nProposed scope:\n\nThank you.'
        : '您好，我們希望了解策略合作機會。\n\n公司：\n姓名：\n職位：\n合作方向：\n\n謝謝。',
    }),
    /** Common preset: investor pitch deck request */
    pitchDeck: (locale: string) => buildMailto({
      subject: locale === 'en' ? 'Pitch Deck Request' : 'Pitch Deck 索取',
      body: locale === 'en'
        ? 'Hello,\n\nI would like to request the latest pitch deck.\n\nName:\nFirm:\nFund stage:\n\nThank you.'
        : '您好，希望索取最新的 Pitch Deck。\n\n姓名：\n公司：\n投資階段：\n\n謝謝。',
    }),
    /** Common preset: regional agent application */
    agent: (locale: string) => buildMailto({
      subject: locale === 'en' ? 'Regional Agent Application' : '國省級代理申請',
      body: locale === 'en'
        ? 'Hello,\n\nWe would like to apply for regional agent rights.\n\nRegion:\nCompany:\nName:\nContact:\n\nThank you.'
        : '您好，我們希望申請地區代理權。\n\n申請地區：\n公司：\n姓名：\n聯絡：\n\n謝謝。',
    }),
  }
}
