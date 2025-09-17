// src/utils/labels.ts
export type LabelObj = { text: string }

export function parseLabels(input?: string): LabelObj[] {
  if (!input) return []
  return input
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((text) => ({ text }))
}

export function labelsToString(labels?: LabelObj[]): string {
  if (!labels || labels.length === 0) return ''
  return labels.map((l) => l.text).join('; ')
}
