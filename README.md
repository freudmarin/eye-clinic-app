# Eye Clinic Web App

A portfolio web application for an eye clinic and optical center, built with React, Vite, and Supabase.

## Features

### Public Features
- **Home Page** - Welcome page with clinic overview
- **Services** - List of eye care services with detailed pages
- **Optical Shop** - Product catalog with filtering
- **Our Doctors** - Team profiles and specializations
- **Book Appointment** - Online appointment booking form
- **Contact** - Contact form and clinic information

### Admin Features
- **Secure Authentication** - Email/password login via Supabase Auth
- **Dashboard** - View all appointments and contact messages
- **Read-Only Access** - View submitted forms and data

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Supabase** - Backend as a Service (database + authentication)
- **CSS** - Custom styling (no frameworks)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Supabase Setup

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Project Settings > API
4. Copy your Project URL and anon/public key

### 3. Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 4. Database Tables

Create these tables in your Supabase project:

**appointments table:**
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
```

**contact_messages table:**
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
```

See [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for detailed database setup instructions including Row Level Security policies.

### 5. Create Admin User

1. Go to Supabase Dashboard > Authentication > Users
2. Click "Add user" > "Create new user"
3. Enter email and password for admin access
4. Use these credentials to login at `/admin/login`

### 6. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## Routes

### Public Routes
- `/` - Home
- `/services` - Services list
- `/services/:slug` - Service detail
- `/optical-shop` - Optical shop
- `/doctors` - Our doctors
- `/appointment` - Book appointment
- `/contact` - Contact us

### Admin Routes
- `/admin/login` - Admin login
- `/admin/dashboard` - Admin dashboard

## Key Features

### Data-Driven UI
- Services, products, and doctors loaded from JSON files
- Easy to update content without code changes

### Supabase Integration
- Appointment form inserts to `appointments` table
- Contact form inserts to `contact_messages` table
- Admin dashboard fetches and displays data
- Secure authentication for admin access

### Clean Architecture
- Component-based design
- Context API for authentication state
- Protected routes for admin area
- Proper loading and error states

### Responsive Design
- Mobile-friendly layouts
- Flexible grid systems
- Optimized for all screen sizes

## Building for Production

```bash
npm run build
```

The build output will be in the `dist/` folder.

## Environment Variables

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon/public key

## Notes

- No payment system implemented
- No backend server required
- Admin role management is simple (authenticated = admin)
- Read-only admin dashboard
- Forms validate on client-side before submission

## License

This is a portfolio project for demonstration purposes.
