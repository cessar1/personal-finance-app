// app/dashboard/expenses/new/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AddExpenseForm } from '@/components/forms/add-expense-form'

export default async function NewExpensePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return <AddExpenseForm />
}
