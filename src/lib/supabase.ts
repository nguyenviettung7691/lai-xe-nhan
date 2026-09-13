import { createClient, type SupabaseClient, type User, type Session } from '@supabase/supabase-js'
import type { FeedbackSchema } from './schema'
import type { z } from 'zod'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const isSupabaseConfigured = (): boolean => {
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'undefined' && supabaseAnonKey !== 'undefined')
}

export let supabase: SupabaseClient | null = null

if (isSupabaseConfigured()) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  } catch (err) {
    console.warn('[supabase] Không thể khởi tạo client:', err)
    supabase = null
  }
}

export interface AuthState {
  user: User | null
  session: Session | null
  isAuthenticated: boolean
}

/** Lấy thông tin user hiện tại nếu có kết nối Supabase */
export async function getCurrentUser(): Promise<User | null> {
  if (!supabase) return null
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) return null
    return user
  } catch {
    return null
  }
}

/** Đăng nhập bằng Email OTP / Magic Link */
export async function signInWithOtp(email: string, redirectTo?: string): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Chưa cấu hình Supabase URL và Anon Key' }
  }
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo || window.location.origin
      }
    })
    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (err) {
    return { success: false, error: (err as Error).message }
  }
}

/** Đăng nhập bằng OAuth (Google, Apple) */
export async function signInWithOAuth(provider: 'google' | 'apple'): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Chưa cấu hình Supabase URL và Anon Key' }
  }
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin
      }
    })
    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (err) {
    return { success: false, error: (err as Error).message }
  }
}

/** Đăng xuất */
export async function signOut(): Promise<{ success: boolean; error?: string }> {
  if (!supabase) return { success: true }
  try {
    const { error } = await supabase.auth.signOut()
    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (err) {
    return { success: false, error: (err as Error).message }
  }
}

/** Đồng bộ danh sách bài học đã hoàn thành lên Supabase */
export async function syncProgressToCloud(userId: string, completedCardIds: string[]): Promise<boolean> {
  if (!supabase) return false
  try {
    const { error } = await supabase.from('user_progress').upsert(
      {
        user_id: userId,
        completed_card_ids: completedCardIds,
        updated_at: new Date().toISOString()
      },
      { onConflict: 'user_id' }
    )
    return !error
  } catch {
    return false
  }
}

/** Lấy danh sách bài học đã hoàn thành từ Supabase */
export async function fetchProgressFromCloud(userId: string): Promise<string[] | null> {
  if (!supabase) return null
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('completed_card_ids')
      .eq('user_id', userId)
      .maybeSingle()
    if (error || !data) return null
    return (data.completed_card_ids as string[]) || []
  } catch {
    return null
  }
}

/** Đồng bộ trạng thái checklist lên Supabase */
export async function syncChecklistToCloud(
  userId: string,
  scope: string,
  checkedItems: Record<string, boolean>
): Promise<boolean> {
  if (!supabase) return false
  try {
    const { error } = await supabase.from('user_checklists').upsert(
      {
        user_id: userId,
        scope,
        checked_items: checkedItems,
        updated_at: new Date().toISOString()
      },
      { onConflict: 'user_id,scope' }
    )
    return !error
  } catch {
    return false
  }
}

/** Lấy trạng thái tất cả checklist từ Supabase */
export async function fetchChecklistsFromCloud(userId: string): Promise<Record<string, Record<string, boolean>> | null> {
  if (!supabase) return null
  try {
    const { data, error } = await supabase
      .from('user_checklists')
      .select('scope, checked_items')
      .eq('user_id', userId)
    if (error || !data) return null

    const result: Record<string, Record<string, boolean>> = {}
    for (const row of data) {
      result[row.scope] = (row.checked_items as Record<string, boolean>) || {}
    }
    return result
  } catch {
    return null
  }
}

/** Gửi phản hồi người dùng */
export async function submitFeedback(feedback: z.infer<typeof FeedbackSchema>): Promise<boolean> {
  if (!supabase) return false
  try {
    const { error } = await supabase.from('user_feedback').insert({
      user_id: feedback.userId || null,
      card_id: feedback.cardId || null,
      feedback_type: feedback.type,
      rating: feedback.rating || null,
      comment: feedback.comment
    })
    return !error
  } catch {
    return false
  }
}
