export interface HowWeKnowSource {
  id: string
  label: string
  href: string
}

export interface HowWeKnowSectionImage {
  src: string
  alt: string
  caption?: string
}

export interface HowWeKnowSection {
  id: string
  title: string
  /** One-line orientation under the title. */
  lead: string
  /** Short paragraphs; keep each under ~4 sentences. */
  body: string[]
  /** Plain-language significance (shown in a callout). */
  whyItMatters: string
  sources: HowWeKnowSource[]
  image?: HowWeKnowSectionImage
  /** Optional on-site guide (e.g. pillar page) — rendered after body paragraphs. */
  seeAlso?: {
    href: string
    label: string
    description: string
  }
}

export interface HowWeKnowPullQuote {
  text: string
  /** Optional short line (e.g. role or publication). */
  attribution?: string
}

export interface HowWeKnowFaqItem {
  id: string
  question: string
  /** Short factual answer; link to Evidence / Explore / Missions where helpful. */
  answer: string
}

export interface HowWeKnowPageContent {
  hero: {
    label: string
    title: string
    description: string
    /** Optional compact facts under the hero (value + label). */
    stats?: { value: string; label: string }[]
  }
  intro: {
    paragraphs: string[]
  }
  pullQuote: HowWeKnowPullQuote
  sections: HowWeKnowSection[]
  /** Optional reader FAQs — keep answers concise; pair with FAQPage JSON-LD on the page. */
  faq?: HowWeKnowFaqItem[]
  closing: {
    title: string
    body: string
  }
}
