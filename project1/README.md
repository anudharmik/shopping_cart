# Job Application Tracker

A full-stack job application tracker built with **React and Supabase**.  
The app allows users to manage job applications with authentication, secure multi-user data, and useful productivity features.

---

## Live Demo
https://your-vercel-link.vercel.app

---

# Features

### Authentication
- Email/password authentication using **Supabase Auth**
- Secure session handling
- Login / Signup / Logout functionality

### Application Tracking
Users can manage job applications with:

- Company name
- Role
- Status (Applied / Interview / Offer / Rejected)
- Notes
- Application deadline

### Productivity Tools
- Search applications by **company or role**
- Automatic sorting by **nearest deadline**
- Empty-state messaging for better UX

### Multi-User Security
Each user can only access their own data using:

- **Supabase Row Level Security (RLS)**
- `user_id` ownership for each record

Policies enforce:
auth.uid = user_id

This ensures users can only:

- view their own applications
- insert their own applications
- update their own applications
- delete their own applications

---

# Tech Stack

Frontend
- React
- Vite
- JavaScript

Backend / Database
- Supabase
- PostgreSQL
- Supabase Auth

Deployment
- Vercel

---

# Architecture

The application follows a simple full-stack architecture:
React Frontend
↓
Supabase Client
↓
Supabase Auth + PostgreSQL
↓
Row Level Security Policies

Data ownership structure:
auth.users
↓
applications.user_id


Each row in the database belongs to a specific user.

---
# Project Structure

src
├── components
│ ├── ApplicationForm.jsx
│ ├── ApplicationItem.jsx
│ └── ApplicationList.jsx
│
├── App.jsx
├── supabaseClient.js
└── main.jsx


---

# Key Learnings

This project demonstrates:

- React state management
- Component-based architecture
- Full CRUD operations
- Authentication systems
- Multi-tenant database design
- Row Level Security (RLS)
- Client-side filtering and sorting
- Integration with a real backend

---

# Future Improvements

Possible future upgrades:

- Application reminders
- Calendar integration
- Email follow-up tracking
- Resume storage
- Interview preparation notes
- Analytics dashboard

---

# Author

Built by **Anurag Dharmik**

## Screenshot
![alt text](image.png)