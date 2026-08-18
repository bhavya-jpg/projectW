const VISITOR_STORE_KEY = 'dw:visitor'

export function getVisitorId(): string {
  if (typeof window === 'undefined') return ''
  try {
    const existing = window.localStorage.getItem(VISITOR_STORE_KEY)
    if (existing) return existing
    const id = crypto.randomUUID()
    window.localStorage.setItem(VISITOR_STORE_KEY, id)
    return id
  } catch {
    return crypto.randomUUID()
  }
}
