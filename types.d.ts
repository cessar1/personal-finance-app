export interface Expense {
  id: string
  category: string
  amount: number
  user_id?: string
  created_at?: string
  name: string
  date: string
  note?: string | null
}

export interface Investment {
  id: string
  type: string
  amount: number
  user_id?: string
  created_at?: string
  name: string
  date: StyledString
  note?: string | null
}