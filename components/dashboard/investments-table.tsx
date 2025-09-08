import { DashboardButton } from '@/components/dashboard/dashboard-button'
import { type Investment } from '@/types'
import { Trash, Pencil } from 'lucide-react'

interface InvestmentsTableProps {
  investments: Investment[]
  onEdit: (investmentId: string) => void
  onDelete: (investmentId: string) => void
  loadingId?: string | null
}

export function InvestmentsTable({
  investments,
  onEdit,
  onDelete,
  loadingId,
}: InvestmentsTableProps) {
  if (!investments?.length) {
    return (
      <p className="text-muted-foreground">No registered investments</p>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted">
            <th className="text-left p-3 font-semibold">Name</th>
            <th className="text-left p-3 font-semibold">Type</th>
            <th className="text-left p-3 font-semibold">Amount</th>
            <th className="text-left p-3 font-semibold">Notes</th>
            <th className="text-right p-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((investment) => (
            <tr
              key={investment.id}
              className="border-b hover:bg-muted/50 transition-colors"
            >
              <td className="p-3 font-medium">{investment.name}</td>
              <td className="p-3 ">{investment.type}</td>
              <td className="p-3">${investment.amount}</td>
              <td className="p-3">{investment.note}</td>
              <td className="p-3">
                <div className="flex gap-4 justify-end">
                  <DashboardButton
                    label="Edit"
                    variant="yellow"
                    onClick={() => onEdit(investment.id)}
                  >
                    <Pencil className="w-4 h-4" />
                  </DashboardButton>

                  <DashboardButton
                    label="Delete"
                    variant="red"
                    onClick={() => onDelete(investment.id)}
                    disabled={loadingId === investment.id}
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
