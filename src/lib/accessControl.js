import { supabase } from './supabaseClient'

export async function userHasDashboardAccess(email) {
  if (!email) return false

  const normalizedEmail = email.trim().toLowerCase()

  const { data, error } = await supabase
    .from('admin_users')
    .select('email')
    .eq('email', normalizedEmail)
    .eq('is_active', true)
    .maybeSingle()

  if (error) {
    // If the table is not configured yet, deny access by default.
    return false
  }

  return Boolean(data?.email)
}
