import { EditInvestmentForm } from '@/components/forms/edit-investment-form'
import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'

interface EditInvestmentPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditInvestmentPage({
  params,
}: EditInvestmentPageProps) {
  const { id } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: investment, error } = await supabase
    .from('investments')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error || !investment) {
    notFound()
  }

  return <EditInvestmentForm investment={investment} />
}
