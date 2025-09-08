import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AddInvestmentForm } from '@/components/forms/add-investment-form'

export default async function NewInvestmentPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return <AddInvestmentForm />
}
