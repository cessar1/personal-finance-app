# Personal Finanace App

A modern web application for tracking expenses and investments built with Next.js and Supabase.

### Quick Setup

### 1. Clone & Install
```bash
git clone https://github.com/cessar1/personal-finance-app.git
cd personal-finance-app
npm install
```

### 2. Setup Supabase

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to SQL Editor and run the provided script:

```sql
-- ===========================================
-- File: supabase_dashboard_tables.sql
-- Description: Create tables for Expenses and Investments
-- ===========================================

-- =========================
-- Table: expenses
-- Description: Stores all user expenses, categorized for monthly tracking
-- =========================
create table if not exists expenses (
    id serial primary key,
    name text not null,              -- Name/description of the expense, e.g., "Lunch at restaurant"
    category text not null,          -- Category of the expense, e.g., Food, Transport
    amount numeric not null,         -- Amount spent
    date date not null,              -- Date when the expense occurred
    note text,                       -- Optional note/memo for additional details
    user_id uuid references auth.users(id) not null, -- Owner of the expense
    created_at timestamp with time zone default now() -- When the expense was created
);

-- Enable Row Level Security
alter table expenses enable row level security;

-- Policies for expenses
-- Select
create policy "user can select own expenses"
on expenses
for select
using (auth.uid() = user_id);

-- Insert
create policy "user can insert own expenses"
on expenses
for insert
with check (auth.uid() = user_id);

-- Update
create policy "user can update own expenses"
on expenses
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Delete
create policy "user can delete own expenses"
on expenses
for delete
using (auth.uid() = user_id);

-- =========================
-- Table: investments
-- Description: Stores all user investments, including type and amount
-- =========================
create table if not exists investments (
    id serial primary key,
    name text not null,              -- Name/description of the investment, e.g., "Apple Stock Purchase"
    type text not null,              -- Type of investment, e.g., Stocks, Bonds, Crypto
    amount numeric not null,         -- Amount invested
    date date not null,              -- Date when the investment was made
    note text,                       -- Optional note/memo for additional details
    user_id uuid references auth.users(id) not null, -- Owner of the investment
    created_at timestamp with time zone default now() -- When the investment was created
);

-- Enable Row Level Security
alter table investments enable row level security;

-- Policies for investments
-- Select
create policy "user can select own investments"
on investments
for select
using (auth.uid() = user_id);

-- Insert
create policy "user can insert own investments"
on investments
for insert
with check (auth.uid() = user_id);

-- Update
create policy "user can update own investments"
on investments
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Delete
create policy "user can delete own investments"
on investments
for delete
using (auth.uid() = user_id);

```



### 3. Environment Variables

Create `.env.local` in your project root:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Development Server

```bash
npm run dev
```
Visit http://localhost:3000 and start tracking your finances! 


## ✅ Current Features
- Add, edit, delete transactions
- Secure user authentication
- Add notes to transactions
- Real-time updates

## 💡 Improvement Opportunities
- Filter expenses by category
- Filter investments by type
- Add pie charts for spending analysis
- New tabs for budgets and financial goals
- Investment performance dashboard