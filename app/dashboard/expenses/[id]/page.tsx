import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { EditExpenseForm } from '@/components/forms/edit-expense-form'

interface EditExpensePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditExpensePage({
  params,
}: EditExpensePageProps) {
  const { id } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: expense, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error || !expense) {
    notFound()
  }

  return <EditExpenseForm expense={expense} />
}
