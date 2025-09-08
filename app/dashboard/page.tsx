import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Dashboard } from '@/components/dashboard'
import { Expense, Investment } from '@/types'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) {
    redirect('/auth/login')
  }

  const { data: expenses } = await supabase
    .from('expenses')
    .select('*')
    .eq('user_id', user?.id)

  const { data: investments } = await supabase
    .from('investments')
    .select('*')
    .eq('user_id', user?.id)

  return <Dashboard expenses={expenses as Expense[]} investments={investments as Investment[]} />
}
