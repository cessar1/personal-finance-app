import { Trash, Pencil } from 'lucide-react'
import { DashboardButton } from './dashboard-button'
import { type Expense } from '@/types'

interface ExpensesTableProps {
  expenses: Expense[]
  onEdit: (expenseId: string) => void
  onDelete: (expenseId: string) => void
  loadingId?: string | null
}

export function ExpensesTable({
  expenses,
  onEdit,
  onDelete,
  loadingId,
}: ExpensesTableProps) {
  if (!expenses?.length) {
    return <p className="text-muted-foreground">No registered expenses</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted">
            <th className="text-left p-3 font-semibold">Name</th>
            <th className="text-left p-3 font-semibold">Category</th>
            <th className="text-left p-3 font-semibold">Amount</th>
            <th className="text-left p-3 font-semibold">Notes</th>
            <th className="text-right p-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr
              key={expense.id}
              className="border-b hover:bg-muted/50 transition-colors"
            >
              <td className="p-3 font-medium">{expense.name}</td>
              <td className="p-3">{expense.category}</td>
              <td className="p-3">${expense.amount}</td>
              <td className="p-3">{expense.note}</td>
              <td className="p-3">
                <div className="flex gap-4 justify-end">
                  <DashboardButton
                    label="Edit"
                    variant="yellow"
                    onClick={() => onEdit(expense.id)}
                  >
                    <Pencil className="w-4 h-4" />
                  </DashboardButton>

                  <DashboardButton
                    label="Delete"
                    variant="red"
                    onClick={() => onDelete(expense.id)}
                    disabled={loadingId === expense.id}
                  >
                    <Trash className="w-4 h-4" />
                  </DashboardButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
