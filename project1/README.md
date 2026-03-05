# Job Application Tracker (React + Supabase)

A full-stack job application tracking app built with React and Supabase.  
The project focuses on clean state management, real database integration, and practical CRUD workflows.

---

## 🚀 Features

- Add job applications (company & role)
- View all applications from a real database
- Update application status  
  (Applied / Interview / Offer / Rejected)
- Filter applications by status
- Delete applications
- Real-time UI updates after database changes

---

## 🧠 Concepts & Learnings

- React Hooks (`useState`, `useEffect`)
- Component-based architecture
- Controlled forms
- Client-side filtering
- CRUD operations with Supabase (PostgreSQL)
- Optimistic UI updates
- Error and loading state handling
- Separation of concerns between UI and data logic

---

## 🛠 Tech Stack

- React (Vite)
- JavaScript (ES6+)
- Supabase (PostgreSQL + REST API)
- CSS

---

## 📂 Project Structure
src/
├── components/
│ ├── ApplicationForm.jsx
│ ├── ApplicationList.jsx
│ └── ApplicationItem.jsx
├── App.jsx
├── supabaseClient.js
└── main.jsx


---

## ▶️ Run Locally

```bash
npm install
npm run dev

## Architecture

This project implements a multi-user architecture using Supabase.

Authentication is handled by Supabase Auth.  
Each application record is linked to a user through the `user_id` field.

Database security is enforced using **Row Level Security (RLS)** policies.

Policies ensure that users can only:

- view their own applications
- insert their own applications
- update their own applications
- delete their own applications

Example policy rule:

auth.uid() = user_id

This ensures complete data isolation between users.