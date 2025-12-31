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

## Key Features

### Clean Architecture
- Component-based design
- Context API for authentication state
- Protected routes for admin area
- Proper loading and error states

### Responsive Design
- Mobile-friendly layouts
- Flexible grid systems
- Optimized for all screen sizes

## Notes

- No payment system implemented
- No backend server required
- Admin role management is simple (authenticated = admin)
- Read-only admin dashboard
- Forms validate on client-side before submission
