'use client'
import { Plus } from 'lucide-react'
import { useExpenses } from '@/hooks/useExpenses'
import { ExpensesTable } from './dashboard/expenses-table'
import { type Expense } from '@/types'

interface ExpensesSectionProps {
  expenses: Expense[]
}

export function ExpensesSection({ expenses }: ExpensesSectionProps) {
  const { loadingId, handleEdit, handleDelete, navigateToNew } = useExpenses()

  return (
    <section className="p-4 rounded-lg shadow bg-card text-card-foreground border border-card-foreground">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-blue-500">Expenses</h2>
        <button
          className="flex items-center gap-4 px-3 py-1 outline outline-2 outline-offset-2 outline-green-500 hover:opacity-80 rounded"
          onClick={navigateToNew}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Expense
        </button>
      </div>

      <ExpensesTable
        expenses={expenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loadingId={loadingId}
      />
    </section>
  )
}
