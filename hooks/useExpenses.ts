import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function useExpenses() {
  const router = useRouter()
  const supabase = createClient()
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleEdit = (expenseId: string) => {
    router.push(`/dashboard/expenses/${expenseId}`)
  }

  const handleDelete = async (expenseId: string) => {
    const confirmed = window.confirm(
      '¿Estás seguro de que quieres eliminar este gasto?',
    )
    if (!confirmed) return

    setLoadingId(expenseId)

    try {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', expenseId)

      if (error) {
        throw new Error(error.message)
      }

      // Optionally, you could return success status or refresh data here
      return { success: true }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred'
      alert('Error deleting expense: ' + errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoadingId(null)
    }
  }

  const navigateToNew = () => {
    router.push('/dashboard/expenses/new')
  }

  return {
    loadingId,
    handleEdit,
    handleDelete,
    navigateToNew,
  }
}
