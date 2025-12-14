# Supabase Database Setup

## SQL Scripts for Table Creation

Run these SQL scripts in your Supabase SQL Editor to create the required tables.

### 1. Appointments Table

```sql
create table appointments (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text not null,
  appointment_date date not null,
  appointment_time text not null,
  service text not null,
  preferred_doctor text,
  notes text,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table appointments enable row level security;

-- Create policy to allow public insert
create policy "Allow public insert"
  on appointments for insert
  to anon
  with check (true);

-- Create policy to allow authenticated users to read
create policy "Allow authenticated users to read"
  on appointments for select
  to authenticated
  using (true);
```

### 2. Contact Messages Table

```sql
create table contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  status text default 'unread',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table contact_messages enable row level security;

-- Create policy to allow public insert
create policy "Allow public insert"
  on contact_messages for insert
  to anon
  with check (true);

-- Create policy to allow authenticated users to read
create policy "Allow authenticated users to read"
  on contact_messages for select
  to authenticated
  using (true);
```

## Setup Steps

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New query"
4. Copy and paste the appointments table SQL
5. Click "Run" to execute
6. Repeat for contact_messages table

## Row Level Security (RLS)

The policies above ensure:
- Anyone can submit appointments and contact messages (public insert)
- Only authenticated admin users can view the data (authenticated read)
- This keeps your data secure while allowing public form submissions

## Creating Admin User

1. Go to Authentication > Users
2. Click "Add user"
3. Select "Create new user"
4. Enter email and password
5. Click "Create user"

Use these credentials to login at `/admin/login`

## Testing

After creating the tables, you can test:
1. Submit an appointment through the website
2. Submit a contact message
3. Login to admin dashboard
4. Verify data appears in the dashboard
