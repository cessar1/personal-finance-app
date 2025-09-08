import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function useInvestments() {
  const router = useRouter()
  const supabase = createClient()
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleEdit = (investmentId: string) => {
    router.push(`/dashboard/investments/${investmentId}`)
  }

  const handleDelete = async (investmentId: string) => {
    const confirmed = window.confirm(
      '¿Estás seguro de que quieres eliminar esta inversión?',
    )
    if (!confirmed) return

    setLoadingId(investmentId)

    try {
      const { error } = await supabase
        .from('investments')
        .delete()
        .eq('id', investmentId)

      if (error) {
        throw new Error(error.message)
      }

      return { success: true }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred'
      alert('Error deleting investment: ' + errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoadingId(null)
    }
  }

  const navigateToNew = () => {
    router.push('/dashboard/investments/new')
  }

  return {
    loadingId,
    handleEdit,
    handleDelete,
    navigateToNew,
  }
}
