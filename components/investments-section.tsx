'use client'
import { Plus } from 'lucide-react'
import { useInvestments } from '@/hooks/useInvestments'
import { InvestmentsTable } from './dashboard/investments-table'
import { type Investment } from '@/types'

interface InvestmentsSectionProps {
  investments: Investment[]
}

export function InvestmentsSection({ investments }: InvestmentsSectionProps) {
  const { loadingId, handleEdit, handleDelete, navigateToNew } =
    useInvestments()

  return (
    <section className="w-full p-4 rounded-lg shadow bg-card text-card-foreground border border-card-foreground">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-blue-500">Investments</h2>
        <button
          className="flex items-center gap-4 px-3 py-1 outline outline-2 outline-offset-2 outline-green-500 hover:opacity-80 rounded"
          onClick={navigateToNew}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Investment
        </button>
      </div>

      <InvestmentsTable
        investments={investments}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loadingId={loadingId}
      />
    </section>
  )
}
