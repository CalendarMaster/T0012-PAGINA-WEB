export function getSessionId() {
  try {
    const key = 'ms_session_id'
    let id = localStorage.getItem(key)
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem(key, id)
    }
    return id
  } catch {
    return 'anon'
  }
}
